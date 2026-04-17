export interface Theme {
  id: string;
  title: string;
  description?: string;
  totalQuestions: number;
}

export const THEMES: Theme[] = [
  { id: "genesis", title: "Genesis", totalQuestions: 25 },
  { id: "exodus", title: "Exodus", totalQuestions: 18 },
  { id: "kings", title: "Kings", totalQuestions: 12 },
];