export type RootStackParamList = {
  Home: undefined;
  ThemeSelection: undefined;
  SoloQuiz: { theme: string };
  Multiplayer: undefined;
  Profile: undefined;
  Settings: undefined;
  Ranking: undefined;
  Bible:
    | { initialBook?: string; initialChapter?: number; initialVerse?: number }
    | undefined;
  VerseOfDay: undefined;
  Auth: undefined;
  DuoQuiz: { p1: any; p2: any };
  DuoImageQuiz: { p1: any; p2: any };
  DuoSetup: { quizType?: "standard" | "image" } | undefined;
  FriendSelection: { gameType: "duo" | "team"; quizType?: "standard" | "image" } | undefined;
  Matchmaking: { mode: "random" | "invite"; friendName?: string; gameType?: "duo" | "team" };
  FriendSearch: { gameType?: "duo" | "team" } | undefined;
  OnlineQuiz: { opponent: any; mySessionId: string; opponentSessionId: string };
  OnlineImageQuiz: { opponent: any; mySessionId: string; opponentSessionId: string };
  TeamQuiz: undefined;
  ImageQuiz: undefined;
  ImageQuizMode: undefined;
};
