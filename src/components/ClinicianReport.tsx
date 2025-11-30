import { ArrowLeft, AlertTriangle, Download, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  PHQ9_QUESTIONS, 
  PHQ9_OPTIONS, 
  DIFFICULTY_OPTIONS,
  getScoreCategory, 
  getQuartile,
  SAFETY_QUESTION_ID,
  type ScoreCategory 
} from "@/data/phq9";

interface ClinicianReportProps {
  sessionId: string;
  completedAt: Date;
  answers: Record<number, number>;
  difficultyAnswer: string;
  totalScore: number;
  onBack: () => void;
}

export function ClinicianReport({
  sessionId,
  completedAt,
  answers,
  difficultyAnswer,
  totalScore,
  onBack,
}: ClinicianReportProps) {
  const category = getScoreCategory(totalScore);
  const quartile = getQuartile(totalScore);
  const safetyScore = answers[SAFETY_QUESTION_ID] || 0;
  const hasSafetyFlag = safetyScore > 0;

  const severityBadgeColors: Record<ScoreCategory["severity"], string> = {
    "minimal": "bg-success/10 text-success",
    "mild": "bg-primary/10 text-primary",
    "moderate": "bg-warning/10 text-warning",
    "moderately-severe": "bg-warning/20 text-warning",
    "severe": "bg-destructive/10 text-destructive",
  };

  const difficultyLabel = DIFFICULTY_OPTIONS.find(o => o.value === difficultyAnswer)?.label || "Not answered";

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={onBack} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Results
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => window.print()} className="gap-2">
              <Printer className="w-4 h-4" />
              Print
            </Button>
          </div>
        </div>

        {/* Report Title */}
        <Card className="shadow-card">
          <CardHeader className="border-b bg-muted/30">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl">PHQ-9 Depression Screening Report</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">Clinical Summary</p>
              </div>
              <div className="text-right text-sm text-muted-foreground">
                <p>Session ID: <span className="font-mono">{sessionId}</span></p>
                <p>Completed: {completedAt.toLocaleString()}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            {/* Safety Alert */}
            {hasSafetyFlag && (
              <div className="mb-6 p-4 rounded-lg bg-destructive/10 border border-destructive/20 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-destructive">Safety Alert Triggered</p>
                  <p className="text-sm text-muted-foreground">
                    Patient indicated thoughts of self-harm (Question 9 score: {safetyScore}/3). 
                    Safety messaging was displayed during screening.
                  </p>
                </div>
              </div>
            )}

            {/* Score Summary */}
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <div className="p-4 rounded-lg bg-muted/50">
                <p className="text-sm text-muted-foreground mb-1">Total Score</p>
                <p className="text-3xl font-heading font-bold text-foreground">
                  {totalScore}<span className="text-lg text-muted-foreground">/27</span>
                </p>
              </div>
              <div className="p-4 rounded-lg bg-muted/50">
                <p className="text-sm text-muted-foreground mb-1">Severity Category</p>
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${severityBadgeColors[category.severity]}`}>
                  {category.label}
                </span>
              </div>
              <div className="p-4 rounded-lg bg-muted/50">
                <p className="text-sm text-muted-foreground mb-1">Population Quartile</p>
                <p className="text-lg font-semibold text-foreground">
                  {quartile === 1 && "≤25th percentile"}
                  {quartile === 2 && "26th-50th percentile"}
                  {quartile === 3 && "51st-75th percentile"}
                  {quartile === 4 && ">75th percentile"}
                </p>
              </div>
            </div>

            {/* Item-Level Responses */}
            <div className="mb-8">
              <h3 className="font-heading font-semibold text-foreground mb-4">Item-Level Responses</h3>
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-left p-3 font-medium">Item</th>
                      <th className="text-left p-3 font-medium">Question</th>
                      <th className="text-center p-3 font-medium">Score</th>
                      <th className="text-left p-3 font-medium">Response</th>
                    </tr>
                  </thead>
                  <tbody>
                    {PHQ9_QUESTIONS.map((q, idx) => {
                      const score = answers[q.id] ?? 0;
                      const option = PHQ9_OPTIONS.find(o => o.value === score);
                      const isHighlight = q.id === SAFETY_QUESTION_ID && score > 0;
                      return (
                        <tr key={q.id} className={`border-t ${isHighlight ? "bg-destructive/5" : idx % 2 === 0 ? "bg-background" : "bg-muted/20"}`}>
                          <td className="p-3 font-mono text-muted-foreground">{q.id}</td>
                          <td className="p-3 text-foreground">{q.text}</td>
                          <td className="p-3 text-center font-semibold">{score}</td>
                          <td className="p-3 text-muted-foreground">{option?.label || "—"}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Functional Impairment */}
            <div className="mb-8">
              <h3 className="font-heading font-semibold text-foreground mb-3">Functional Impairment</h3>
              <p className="text-muted-foreground">
                <strong className="text-foreground">Difficulty level:</strong> {difficultyLabel}
              </p>
            </div>

            {/* Scoring Reference */}
            <div className="p-4 rounded-lg bg-muted/30 text-sm">
              <h4 className="font-semibold text-foreground mb-2">PHQ-9 Scoring Reference</h4>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-muted-foreground">
                <div>0-4: Minimal</div>
                <div>5-9: Mild</div>
                <div>10-14: Moderate</div>
                <div>15-19: Mod. Severe</div>
                <div>20-27: Severe</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer Disclaimer */}
        <p className="text-xs text-muted-foreground text-center">
          This report is generated for clinical review purposes. The PHQ-9 is a screening tool 
          and should not be used as the sole basis for diagnosis. Clinical judgment is required.
        </p>
      </div>
    </div>
  );
}
