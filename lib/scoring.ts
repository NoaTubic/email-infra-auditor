import { BUNDLES, type Bundle, type Tag } from "./questions";
import { HEALTH_TIERS, type HealthTier } from "./constants";

export interface BundleResult {
  bundleId: string;
  bundleTitle: string;
  score: number;
  maxScore: number;
  normalized: number;
  questionResults: QuestionResult[];
}

export interface QuestionResult {
  questionId: string;
  questionText: string;
  selectedLabel: string;
  tag: Tag;
  note?: string;
}

export interface ActionItem {
  questionId: string;
  questionText: string;
  bundleTitle: string;
  tag: Tag;
  note: string;
  priority: number;
}

export interface AuditResults {
  overallScore: number;
  tier: HealthTier;
  bundles: BundleResult[];
  actionItems: ActionItem[];
}

export type Answers = Record<string, string>;

function computeBundleResult(
  bundle: Bundle,
  answers: Answers
): BundleResult {
  const questionResults: QuestionResult[] = [];
  let totalScore = 0;

  for (const question of bundle.questions) {
    const selectedValue = answers[question.id];
    const selectedOption = question.options.find(
      (o) => o.value === selectedValue
    );

    if (selectedOption) {
      totalScore += selectedOption.score;
      questionResults.push({
        questionId: question.id,
        questionText: question.text,
        selectedLabel: selectedOption.label,
        tag: selectedOption.tag,
        note: selectedOption.note,
      });
    }
  }

  const questionCount = bundle.questions.length;
  const normalized = Math.max(
    0,
    Math.min(5, (totalScore / questionCount) * 5)
  );

  return {
    bundleId: bundle.id,
    bundleTitle: bundle.title,
    score: totalScore,
    maxScore: questionCount,
    normalized,
    questionResults,
  };
}

export function getTier(score: number): HealthTier {
  for (const tier of HEALTH_TIERS) {
    if (score >= tier.min && score <= tier.max) {
      return tier;
    }
  }
  return HEALTH_TIERS[HEALTH_TIERS.length - 1];
}

export function computeResults(answers: Answers): AuditResults {
  const bundles = BUNDLES.map((bundle) =>
    computeBundleResult(bundle, answers)
  );

  const overallScore =
    bundles.reduce((sum, b) => sum + b.normalized, 0) / bundles.length;

  const tier = getTier(overallScore);

  const actionItems: ActionItem[] = [];

  for (const bundleResult of bundles) {
    for (const qr of bundleResult.questionResults) {
      if (qr.tag !== "pass" && qr.note) {
        actionItems.push({
          questionId: qr.questionId,
          questionText: qr.questionText,
          bundleTitle: bundleResult.bundleTitle,
          tag: qr.tag,
          note: qr.note,
          priority: qr.tag === "critical" ? 0 : 1,
        });
      }
    }
  }

  actionItems.sort((a, b) => a.priority - b.priority);

  return {
    overallScore: Math.round(overallScore * 10) / 10,
    tier,
    bundles,
    actionItems: actionItems.slice(0, 3),
  };
}
