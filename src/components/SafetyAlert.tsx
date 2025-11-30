import { AlertTriangle, Phone, Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface SafetyAlertProps {
  onAcknowledge: () => void;
}

export function SafetyAlert({ onAcknowledge }: SafetyAlertProps) {
  return (
    <div className="fixed inset-0 bg-foreground/20 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
      <Card className="max-w-lg w-full border-destructive/30 shadow-glow">
        <CardContent className="p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-full bg-destructive/10">
              <AlertTriangle className="w-6 h-6 text-destructive" />
            </div>
            <h2 className="text-xl font-heading font-semibold text-foreground">
              We're Here For You
            </h2>
          </div>

          <div className="space-y-4 text-muted-foreground">
            <p className="leading-relaxed">
              Your wellbeing matters deeply. If you're having thoughts of hurting yourself, 
              please know that support is available right now.
            </p>
            
            <div className="bg-secondary/50 rounded-lg p-4 space-y-3">
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium text-foreground">National Suicide Prevention Lifeline</p>
                  <p className="text-sm">Call or text <strong>988</strong> (US)</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium text-foreground">Crisis Text Line</p>
                  <p className="text-sm">Text <strong>HOME</strong> to <strong>741741</strong></p>
                </div>
              </div>
            </div>

            <p className="text-sm leading-relaxed">
              If you're in immediate danger, please call emergency services (911 in the US) 
              or go to your nearest emergency room.
            </p>
          </div>

          <div className="mt-6 flex flex-col gap-3">
            <Button 
              variant="primary" 
              size="lg" 
              className="w-full"
              onClick={() => window.open("tel:988", "_self")}
            >
              <Phone className="w-4 h-4" />
              Call 988 Now
            </Button>
            <Button 
              variant="soft" 
              size="lg"
              className="w-full"
              onClick={onAcknowledge}
            >
              <Heart className="w-4 h-4" />
              I Understand, Continue Screening
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
