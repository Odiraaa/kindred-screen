import { DIFFICULTY_OPTIONS } from "@/data/phq9";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Check } from "lucide-react";

interface DifficultyQuestionProps {
  selectedValue: string | undefined;
  onAnswer: (value: string) => void;
  onComplete: () => void;
  onPrevious: () => void;
}

export function DifficultyQuestion({
  selectedValue,
  onAnswer,
  onComplete,
  onPrevious,
}: DifficultyQuestionProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-xl w-full space-y-6 animate-scale-in">
        {/* Question Card */}
        <Card className="shadow-card">
          <CardContent className="p-8">
            <p className="text-sm text-muted-foreground mb-3">
              Final question
            </p>
            <h2 className="text-xl md:text-2xl font-heading font-semibold text-foreground leading-relaxed mb-8">
              If you checked off any problems, how difficult have these problems made it 
              for you to do your work, take care of things at home, or get along with other people?
            </h2>

            {/* Options */}
            <div className="space-y-3">
              {DIFFICULTY_OPTIONS.map((option) => (
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
                    <p className="font-medium">{option.label}</p>
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
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <Button
            variant="primary"
            onClick={onComplete}
            disabled={selectedValue === undefined}
            className="gap-2"
          >
            Complete Screening
            <Check className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
