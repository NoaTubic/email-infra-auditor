import type { Question } from "@/lib/questions";
import { OptionButton } from "./option-button";

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  selectedValue: string | undefined;
  onSelect: (questionId: string, value: string) => void;
}

export function QuestionCard({
  question,
  questionNumber,
  selectedValue,
  onSelect,
}: QuestionCardProps) {
  return (
    <div
      className="animate-fade-in rounded-xl border border-grey-200 bg-[var(--surface-card)] p-5 transition-shadow hover:shadow-sm"
      role="group"
      aria-labelledby={`q-${question.id}`}
      style={{ animationDelay: `${questionNumber * 60}ms`, opacity: 0 }}
    >
      <div className="mb-3 flex items-center gap-2">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-grey-100 text-xs font-semibold text-grey-500">
          {questionNumber}
        </span>
      </div>
      <h3
        id={`q-${question.id}`}
        className="mb-3 text-sm font-semibold text-grey-900 leading-snug"
      >
        {question.text}
      </h3>
      <div className="flex flex-col gap-2" role="radiogroup" aria-labelledby={`q-${question.id}`}>
        {question.options.map((option) => (
          <OptionButton
            key={option.value}
            label={option.label}
            selected={selectedValue === option.value}
            onSelect={() => onSelect(question.id, option.value)}
          />
        ))}
      </div>
    </div>
  );
}
