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

  lastHeartRefill: number;
  nextRefillIn: number;

  username: string | null;
  churchName: string | null;
  city: string | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  friends: any[];
}

export interface UserActions {
  addGems: (amount: number) => void;
  removeGems: (amount: number) => boolean;

  addHeart: () => void;
  removeHeart: () => void;
  buyHeartWithGems: () => boolean;

  setLanguage: (lang: LanguageCode) => void;
  setAvatar: (avatar: string) => void;
  addMedal: (medal: string) => void;

  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;

  login: (name: string, church: string, city: string) => void;
  logout: () => void;

  addFriend: (friend: any) => Promise<void>;
  removeFriend: (id: string) => Promise<void>;
}

export type UserContextType = UserState & UserActions;
