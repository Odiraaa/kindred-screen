import { PHQ9_OPTIONS, type PHQ9Question } from "@/data/phq9";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface QuestionCardProps {
  question: PHQ9Question;
  currentIndex: number;
  totalQuestions: number;
  selectedValue: number | undefined;
  onAnswer: (value: number) => void;
  onNext: () => void;
  onPrevious: () => void;
  canGoBack: boolean;
}

export function QuestionCard({
  question,
  currentIndex,
  totalQuestions,
  selectedValue,
  onAnswer,
  onNext,
  onPrevious,
  canGoBack,
}: QuestionCardProps) {
  const progress = ((currentIndex + 1) / totalQuestions) * 100;

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-xl w-full space-y-6 animate-scale-in">
        {/* Progress Header */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>Question {currentIndex + 1} of {totalQuestions}</span>
            <span>{Math.round(progress)}% complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question Card */}
        <Card className="shadow-card">
          <CardContent className="p-8">
            <p className="text-sm text-muted-foreground mb-3">
              Over the <strong>last 2 weeks</strong>, how often have you been bothered by:
            </p>
            <h2 className="text-xl md:text-2xl font-heading font-semibold text-foreground leading-relaxed mb-8">
              {question.text}
            </h2>

            {/* Options */}
            <div className="space-y-3">
              {PHQ9_OPTIONS.map((option) => (
                <Button
                  key={option.value}
                  variant={selectedValue === option.value ? "optionSelected" : "option"}
                  className="w-full h-auto py-4 px-5 justify-start text-left"
                  onClick={() => onAnswer(option.value)}
                >
                  <div className="flex items-center gap-4 w-full">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                      selectedValue === option.value 
                        ? "border-primary bg-primary" 
                        : "border-muted-foreground/30"
                    }`}>
                      {selectedValue === option.value && (
                        <div className="w-2 h-2 rounded-full bg-primary-foreground" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{option.label}</p>
                      <p className="text-sm text-muted-foreground">{option.description}</p>
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={onPrevious}
            disabled={!canGoBack}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <Button
            variant="primary"
            onClick={onNext}
            disabled={selectedValue === undefined}
            className="gap-2"
          >
            {currentIndex === totalQuestions - 1 ? "Complete" : "Next"}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
