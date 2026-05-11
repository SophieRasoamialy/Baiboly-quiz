export type LanguageCode = "mg" | "fr";
export type ThemeMode = "light" | "dark";

export interface UserState {
  gems: number;
  hearts: number;
  medals: string[];
  avatar: string;
  language: LanguageCode;
  theme: ThemeMode;
  colors: any;
  points: number;
  soundEnabled: boolean;


  lastHeartRefill: number;
  nextRefillIn: number;

  email: string | null;
  username: string | null;
  churchName: string | null;
  city: string | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  friends: any[];
  profileId: string | null;
}

export interface UserActions {
  addGems: (amount: number) => void;
  removeGems: (amount: number) => boolean;
  addPoints: (amount: number) => void;

  addHeart: () => void;
  removeHeart: () => void;
  buyHeartWithGems: () => boolean;

  setLanguage: (lang: LanguageCode) => void;
  setAvatar: (avatar: string) => void;
  addMedal: (medal: string) => void;

  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
  setSoundEnabled: (enabled: boolean) => void;

  signUp: (
    email: string,
    password: string,
    profile: { name: string; avatar: string; church: string; city: string },
  ) => Promise<{ needsEmailConfirmation: boolean }>;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithGoogle: (callbackUrl: string) => Promise<{ profileComplete: boolean }>;
  updateProfile: (profile: { name: string; church: string; city: string }) => Promise<void>;
  logout: () => Promise<void>;

  addFriend: (friend: any) => Promise<void>;
  removeFriend: (id: string) => Promise<void>;
  syncProfile: () => Promise<void>;
}

export type UserContextType = UserState & UserActions;
