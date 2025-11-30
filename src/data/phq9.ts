export interface PHQ9Question {
  id: number;
  text: string;
}

export interface PHQ9Option {
  value: number;
  label: string;
  description: string;
}

export const PHQ9_QUESTIONS: PHQ9Question[] = [
  { id: 1, text: "Little interest or pleasure in doing things" },
  { id: 2, text: "Feeling down, depressed, or hopeless" },
  { id: 3, text: "Trouble falling or staying asleep, or sleeping too much" },
  { id: 4, text: "Feeling tired or having little energy" },
  { id: 5, text: "Poor appetite or overeating" },
  { id: 6, text: "Feeling bad about yourself — or that you are a failure or have let yourself or your family down" },
  { id: 7, text: "Trouble concentrating on things, such as reading the newspaper or watching television" },
  { id: 8, text: "Moving or speaking so slowly that other people could have noticed? Or the opposite — being so fidgety or restless that you have been moving around a lot more than usual" },
  { id: 9, text: "Thoughts that you would be better off dead or of hurting yourself in some way" },
];

export const PHQ9_OPTIONS: PHQ9Option[] = [
  { value: 0, label: "Not at all", description: "0 days" },
  { value: 1, label: "Several days", description: "1-6 days" },
  { value: 2, label: "More than half the days", description: "7-11 days" },
  { value: 3, label: "Nearly every day", description: "12-14 days" },
];

export const DIFFICULTY_OPTIONS = [
  { value: "not_difficult", label: "Not difficult at all" },
  { value: "somewhat_difficult", label: "Somewhat difficult" },
  { value: "very_difficult", label: "Very difficult" },
  { value: "extremely_difficult", label: "Extremely difficult" },
];

export interface ScoreCategory {
  range: [number, number];
  label: string;
  severity: "minimal" | "mild" | "moderate" | "moderately-severe" | "severe";
  description: string;
}

export const SCORE_CATEGORIES: ScoreCategory[] = [
  { range: [0, 4], label: "Minimal depression", severity: "minimal", description: "Symptoms suggest minimal depression" },
  { range: [5, 9], label: "Mild depression", severity: "mild", description: "Symptoms suggest mild depression" },
  { range: [10, 14], label: "Moderate depression", severity: "moderate", description: "Symptoms suggest moderate depression" },
  { range: [15, 19], label: "Moderately severe depression", severity: "moderately-severe", description: "Symptoms suggest moderately severe depression" },
  { range: [20, 27], label: "Severe depression", severity: "severe", description: "Symptoms suggest severe depression" },
];

export function getScoreCategory(score: number): ScoreCategory {
  return SCORE_CATEGORIES.find(cat => score >= cat.range[0] && score <= cat.range[1]) || SCORE_CATEGORIES[0];
}

export function calculateTotalScore(answers: Record<number, number>): number {
  return Object.values(answers).reduce((sum, val) => sum + val, 0);
}

export function getQuartile(score: number): number {
  // Based on general population norms
  if (score <= 2) return 1; // 25th percentile
  if (score <= 5) return 2; // 50th percentile
  if (score <= 10) return 3; // 75th percentile
  return 4; // Above 75th percentile
}

export const SAFETY_QUESTION_ID = 9; // Question about self-harm
