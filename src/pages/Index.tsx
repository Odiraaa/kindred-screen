import { useState, useCallback } from "react";
import { WelcomeScreen } from "@/components/WelcomeScreen";
import { QuestionCard } from "@/components/QuestionCard";
import { DifficultyQuestion } from "@/components/DifficultyQuestion";
import { PatientResults } from "@/components/PatientResults";
import { ClinicianReport } from "@/components/ClinicianReport";
import { SafetyAlert } from "@/components/SafetyAlert";
import { 
  PHQ9_QUESTIONS, 
  calculateTotalScore, 
  SAFETY_QUESTION_ID 
} from "@/data/phq9";

type Screen = "welcome" | "questions" | "difficulty" | "results" | "clinician";

const Index = () => {
  const [screen, setScreen] = useState<Screen>("welcome");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [difficultyAnswer, setDifficultyAnswer] = useState<string>();
  const [showSafetyAlert, setShowSafetyAlert] = useState(false);
  const [safetyAlertShown, setSafetyAlertShown] = useState(false);
  const [sessionId] = useState(() => `PHQ9-${Date.now().toString(36).toUpperCase()}`);
  const [completedAt, setCompletedAt] = useState<Date>(new Date());

  const currentQuestion = PHQ9_QUESTIONS[currentQuestionIndex];
  const totalScore = calculateTotalScore(answers);

  const handleAnswer = useCallback((value: number) => {
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: value }));
    
    // Check for safety concern
    if (currentQuestion.id === SAFETY_QUESTION_ID && value > 0 && !safetyAlertShown) {
      setShowSafetyAlert(true);
      setSafetyAlertShown(true);
    }
  }, [currentQuestion?.id, safetyAlertShown]);

  const handleNext = useCallback(() => {
    if (currentQuestionIndex < PHQ9_QUESTIONS.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setScreen("difficulty");
    }
  }, [currentQuestionIndex]);

  const handlePrevious = useCallback(() => {
    if (screen === "difficulty") {
      setScreen("questions");
      setCurrentQuestionIndex(PHQ9_QUESTIONS.length - 1);
    } else if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  }, [screen, currentQuestionIndex]);

  const handleComplete = useCallback(() => {
    setCompletedAt(new Date());
    setScreen("results");
  }, []);

  const handleStartOver = useCallback(() => {
    setScreen("welcome");
    setCurrentQuestionIndex(0);
    setAnswers({});
    setDifficultyAnswer(undefined);
    setSafetyAlertShown(false);
  }, []);

  return (
    <>
      {showSafetyAlert && (
        <SafetyAlert onAcknowledge={() => setShowSafetyAlert(false)} />
      )}
      
      {screen === "welcome" && (
        <WelcomeScreen onStart={() => setScreen("questions")} />
      )}
      
      {screen === "questions" && currentQuestion && (
        <QuestionCard
          question={currentQuestion}
          currentIndex={currentQuestionIndex}
          totalQuestions={PHQ9_QUESTIONS.length}
          selectedValue={answers[currentQuestion.id]}
          onAnswer={handleAnswer}
          onNext={handleNext}
          onPrevious={handlePrevious}
          canGoBack={currentQuestionIndex > 0}
        />
      )}
      
      {screen === "difficulty" && (
        <DifficultyQuestion
          selectedValue={difficultyAnswer}
          onAnswer={setDifficultyAnswer}
          onComplete={handleComplete}
          onPrevious={handlePrevious}
        />
      )}
      
      {screen === "results" && (
        <PatientResults
          totalScore={totalScore}
          onViewClinicianReport={() => setScreen("clinician")}
          onStartOver={handleStartOver}
        />
      )}
      
      {screen === "clinician" && (
        <ClinicianReport
          sessionId={sessionId}
          completedAt={completedAt}
          answers={answers}
          difficultyAnswer={difficultyAnswer || ""}
          totalScore={totalScore}
          onBack={() => setScreen("results")}
        />
      )}
    </>
  );
};

export default Index;
