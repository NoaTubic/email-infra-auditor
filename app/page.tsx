"use client";

import { useState, useCallback, useRef, useMemo } from "react";
import posthog from "posthog-js";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { BundleNav } from "@/components/bundle-nav";
import { QuestionCard } from "@/components/question-card";
import { ResultsPanel } from "@/components/results-panel";
import { Button } from "@/components/ui/button";
import { BUNDLES, TOTAL_QUESTIONS } from "@/lib/questions";
import { computeResults, type Answers, type AuditResults } from "@/lib/scoring";
import { BUNDLE_ICONS } from "@/components/bundle-nav";
import { ArrowRight, RotateCcw, Sparkles } from "lucide-react";

type Phase = "intro" | "audit" | "results";

export default function Home() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [activeBundle, setActiveBundle] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [results, setResults] = useState<AuditResults | null>(null);
  const hasTrackedStart = useRef(false);
  const trackedBundles = useRef<Set<string>>(new Set());

  const currentBundle = BUNDLES[activeBundle];

  const answeredCount = useMemo(
    () => BUNDLES.flatMap((b) => b.questions).filter((q) => answers[q.id] !== undefined).length,
    [answers]
  );

  const allAnswered = answeredCount === TOTAL_QUESTIONS;

  const handleSelect = useCallback(
    (questionId: string, value: string) => {
      if (!hasTrackedStart.current) {
        posthog.capture("audit_started");
        hasTrackedStart.current = true;
      }
      setAnswers((prev) => ({ ...prev, [questionId]: value }));
    },
    []
  );

  const handleBundleClick = useCallback(
    (index: number) => {
      // Track completion of previous bundle if all its questions are answered
      const prevBundle = BUNDLES[activeBundle];
      const prevComplete = prevBundle.questions.every((q) => answers[q.id] !== undefined);
      if (prevComplete && !trackedBundles.current.has(prevBundle.id)) {
        posthog.capture("bundle_completed", { bundle: prevBundle.id });
        trackedBundles.current.add(prevBundle.id);
      }
      setActiveBundle(index);
    },
    [activeBundle, answers]
  );

  const handleSeeResults = useCallback(() => {
    const auditResults = computeResults(answers);
    setResults(auditResults);
    setPhase("results");
    posthog.capture("audit_completed", {
      score: auditResults.overallScore,
      tier: auditResults.tier.label,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [answers]);

  const handleStart = useCallback(() => {
    setPhase("audit");
  }, []);

  const handleRestart = useCallback(() => {
    setPhase("intro");
    setActiveBundle(0);
    setAnswers({});
    setResults(null);
    hasTrackedStart.current = false;
    trackedBundles.current.clear();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Calculate question numbering within current bundle
  let questionOffset = 0;
  for (let i = 0; i < activeBundle; i++) {
    questionOffset += BUNDLES[i].questions.length;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-12">
          {/* Intro */}
          {phase === "intro" && (
            <div className="animate-fade-up flex flex-col items-center gap-8 pt-8 sm:pt-16 text-center">
              <div className="flex flex-col items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                  <Sparkles className="h-6 w-6" />
                </div>
                <h1 className="text-3xl font-bold tracking-tight text-grey-950 sm:text-4xl">
                  Email Infrastructure{" "}
                  <span className="text-blue-600">Auditor</span>
                </h1>
                <p className="max-w-md text-base text-grey-500 sm:text-lg leading-relaxed">
                  Audit your cold email infrastructure in 2 minutes. Get a
                  deliverability health score with actionable fixes.
                </p>
              </div>

              <div className="flex flex-col items-center gap-3">
                <Button size="lg" onClick={handleStart}>
                  Start Free Audit
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <span className="text-xs text-grey-400">
                  16 questions across 5 categories
                </span>
              </div>

              {/* Trust line */}
              <p className="text-xs text-grey-400 pt-4">
                Based on best practices from 10,000+ cold email campaigns
              </p>
            </div>
          )}

          {/* Audit */}
          {phase === "audit" && currentBundle && (
            <div className="flex flex-col gap-6">
              <BundleNav
                activeBundle={activeBundle}
                answers={answers}
                onBundleClick={handleBundleClick}
              />

              {/* Category panel */}
              <div
                key={currentBundle.id}
                id={`panel-${currentBundle.id}`}
                role="tabpanel"
                aria-labelledby={`tab-${currentBundle.id}`}
                className="flex flex-col gap-4"
              >
                {/* Category header */}
                <div className="animate-fade-in flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {(() => {
                      const Icon = BUNDLE_ICONS[currentBundle.id];
                      return Icon ? <Icon className="h-4 w-4 text-blue-600" /> : null;
                    })()}
                    <h2 className="text-base font-semibold text-grey-900">
                      {currentBundle.title}
                    </h2>
                  </div>
                  <span className="text-xs text-grey-400">
                    {currentBundle.questions.filter((q) => answers[q.id] !== undefined).length}/{currentBundle.questions.length} answered
                  </span>
                </div>

                {/* All questions stacked */}
                {currentBundle.questions.map((question, qIndex) => (
                  <QuestionCard
                    key={question.id}
                    question={question}
                    questionNumber={qIndex + 1}
                    selectedValue={answers[question.id]}
                    onSelect={handleSelect}
                  />
                ))}
              </div>

              {/* Progress + See Results */}
              <div className="animate-fade-in rounded-xl border border-grey-200 bg-[var(--surface-card)] p-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="h-2 w-24 sm:w-32 rounded-full bg-grey-100 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-blue-600 transition-all duration-500 ease-out"
                      style={{ width: `${(answeredCount / TOTAL_QUESTIONS) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs font-medium text-grey-500">
                    {answeredCount}/{TOTAL_QUESTIONS}
                  </span>
                </div>
                <Button
                  size="sm"
                  disabled={!allAnswered}
                  onClick={handleSeeResults}
                >
                  See Results
                  <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          )}

          {/* Results */}
          {phase === "results" && results && (
            <div className="flex flex-col gap-8">
              <div className="animate-fade-up text-center pt-4">
                <h2 className="text-2xl font-bold tracking-tight text-grey-950 sm:text-3xl">
                  Your <span className="text-blue-600">Results</span>
                </h2>
              </div>
              <ResultsPanel results={results} />
              <div className="flex justify-center pb-4">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleRestart}
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  Retake Audit
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
