import { Heart, Shield, Clock, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface WelcomeScreenProps {
  onStart: () => void;
}

export function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-2xl w-full space-y-8 animate-slide-up">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-primary shadow-glow mb-2">
            <Heart className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground tracking-tight">
            Depression Screening
          </h1>
          <p className="text-lg text-muted-foreground max-w-md mx-auto leading-relaxed">
            A confidential assessment to help understand your mental wellbeing using 
            the clinically-validated PHQ-9 questionnaire.
          </p>
        </div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-3 gap-4">
          <Card className="border-primary/10 hover:border-primary/20 transition-colors">
            <CardContent className="p-5 text-center">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <Clock className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-heading font-medium text-foreground mb-1">Quick</h3>
              <p className="text-sm text-muted-foreground">Takes about 2-3 minutes</p>
            </CardContent>
          </Card>
          
          <Card className="border-primary/10 hover:border-primary/20 transition-colors">
            <CardContent className="p-5 text-center">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <Shield className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-heading font-medium text-foreground mb-1">Private</h3>
              <p className="text-sm text-muted-foreground">Your responses are confidential</p>
            </CardContent>
          </Card>
          
          <Card className="border-primary/10 hover:border-primary/20 transition-colors">
            <CardContent className="p-5 text-center">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <FileText className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-heading font-medium text-foreground mb-1">Validated</h3>
              <p className="text-sm text-muted-foreground">Based on PHQ-9 standard</p>
            </CardContent>
          </Card>
        </div>

        {/* Disclaimer */}
        <Card className="bg-secondary/30 border-secondary">
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Important:</strong> This screening is not a diagnosis. 
              It's designed to help identify symptoms that may benefit from professional evaluation. 
              Results will be shared with your healthcare provider for review.
            </p>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="text-center">
          <Button 
            variant="primary" 
            size="xl" 
            onClick={onStart}
            className="min-w-[200px]"
          >
            Begin Screening
          </Button>
        </div>
      </div>
    </div>
  );
}
