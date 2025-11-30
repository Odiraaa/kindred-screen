import { Heart, FileText, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getScoreCategory, type ScoreCategory } from "@/data/phq9";

interface PatientResultsProps {
  totalScore: number;
  onViewClinicianReport: () => void;
  onStartOver: () => void;
}

export function PatientResults({ totalScore, onViewClinicianReport, onStartOver }: PatientResultsProps) {
  const category = getScoreCategory(totalScore);

  const severityColors: Record<ScoreCategory["severity"], string> = {
    "minimal": "bg-success/10 text-success border-success/20",
    "mild": "bg-primary/10 text-primary border-primary/20",
    "moderate": "bg-warning/10 text-warning border-warning/20",
    "moderately-severe": "bg-warning/15 text-warning border-warning/30",
    "severe": "bg-destructive/10 text-destructive border-destructive/20",
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-xl w-full space-y-6 animate-slide-up">
        {/* Thank You Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-primary shadow-glow mb-2">
            <Heart className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
            Thank You
          </h1>
          <p className="text-muted-foreground max-w-md mx-auto">
            Your screening has been completed. Your healthcare provider will review the results.
          </p>
        </div>

        {/* Score Card */}
        <Card className="shadow-card">
          <CardContent className="p-8 text-center">
            <p className="text-sm text-muted-foreground mb-2">Your screening score</p>
            <div className="text-5xl font-heading font-bold text-foreground mb-4">
              {totalScore}
              <span className="text-2xl text-muted-foreground font-normal">/27</span>
            </div>
            <div className={`inline-block px-4 py-2 rounded-full border ${severityColors[category.severity]}`}>
              <span className="font-medium">{category.label}</span>
            </div>
          </CardContent>
        </Card>

        {/* What's Next */}
        <Card className="bg-secondary/30 border-secondary">
          <CardContent className="p-6">
            <h3 className="font-heading font-semibold text-foreground mb-3">What happens next?</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                Your healthcare provider will receive a detailed summary of your responses
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                They will discuss the results with you at your next appointment
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                Remember, this screening is not a diagnosis—it's a helpful tool for your care team
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Disclaimer */}
        <p className="text-xs text-muted-foreground text-center">
          This screening does not provide a clinical diagnosis. Only a qualified healthcare provider 
          can diagnose depression or other mental health conditions.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button variant="soft" onClick={onStartOver}>
            Start New Screening
          </Button>
          <Button variant="primary" onClick={onViewClinicianReport} className="gap-2">
            <FileText className="w-4 h-4" />
            View Clinician Report
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
