import React, { createContext, useContext, useState, useEffect } from "react";
import i18n from "../i18n";
import { LightColors, DarkColors } from "../theme";
import { databaseService } from "../services/DatabaseService";

interface UserState {
  gems: number;
  hearts: number;
  medals: string[];
  avatar: string;
  language: "mg" | "fr";
  theme: "light" | "dark";
  colors: typeof LightColors;
  addGems: (amount: number) => void;
  removeGems: (amount: number) => boolean;
  addHeart: () => void;
  removeHeart: () => void;
  setLanguage: (lang: "mg" | "fr") => void;
  setAvatar: (avatar: string) => void;
  addMedal: (medal: string) => void;
  setTheme: (theme: "light" | "dark") => void;
  toggleTheme: () => void;
  buyHeartWithGems: () => boolean;
  lastHeartRefill: number;
  nextRefillIn: number;
  username: string | null;
  churchName: string | null;
  city: string | null;
  isLoggedIn: boolean;
  login: (name: string, church: string, city: string) => void;
  logout: () => void;
  isLoading: boolean;
}

const UserContext = createContext<UserState | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [gems, setGems] = useState(20);
  const [hearts, setHearts] = useState(5);
  const [medals, setMedals] = useState<string[]>(["bronze"]);
  const [avatar, setAvatarLocal] = useState("default");
  const [language, setLanguageLocal] = useState<"mg" | "fr">("mg");
  const [theme, setThemeState] = useState<"light" | "dark">("light");
  const [username, setUsername] = useState<string | null>(null);
  const [churchName, setChurchName] = useState<string | null>(null);
  const [city, setCity] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [lastHeartRefill, setLastHeartRefill] = useState<number>(Date.now());
  const [nextRefillIn, setNextRefillIn] = useState<number>(15 * 60);

  // 1. Initial Load
  useEffect(() => {
    const initData = async () => {
      try {
        await databaseService.init();
        const savedState = await databaseService.getUserState();
        if (savedState) {
          setGems(savedState.gems);
          setHearts(savedState.hearts);
          setMedals(savedState.medals.split(","));
          setAvatarLocal(savedState.avatar);
          setLanguageLocal(savedState.language as "mg" | "fr");
          setThemeState(savedState.theme as "light" | "dark");
          setUsername(savedState.username);
          setChurchName(savedState.churchName);
          setCity(savedState.city);
          setIsLoggedIn(!!savedState.username);
          setLastHeartRefill(savedState.lastHeartRefill || Date.now());

          if (savedState.language) {
            i18n.locale = savedState.language;
          }
        }
      } catch (e) {
        console.error("Failed to init SQLite", e);
      } finally {
        setIsLoading(false);
      }
    };
    initData();
  }, []);

  // 2. Heart Refill Timer
  useEffect(() => {
    const refillInterval = setInterval(() => {
      if (hearts < 5) {
        const now = Date.now();
        const diff = Math.floor((now - lastHeartRefill) / 1000);
        const remaining = 15 * 60 - (diff % (15 * 60));

        setNextRefillIn(remaining);

        if (diff >= 15 * 60) {
          const heartsToAdd = Math.floor(diff / (15 * 60));
          if (heartsToAdd > 0) {
            setHearts((prev) => {
              const newVal = Math.min(prev + heartsToAdd, 5);
              if (newVal !== prev) {
                databaseService.saveUserState({
                  hearts: newVal,
                  lastHeartRefill: now,
                });
              }
              return newVal;
            });
            setLastHeartRefill(now);
          }
        }
      } else {
        setNextRefillIn(15 * 60);
      }
    }, 1000);

    return () => clearInterval(refillInterval);
  }, [hearts, lastHeartRefill]);

  // 3. Persist Helpers
  const updateDB = (data: any) => databaseService.saveUserState(data);

  const addGems = (amount: number) => {
    setGems((prev) => {
      const newVal = prev + amount;
      updateDB({ gems: newVal });
      return newVal;
    });
  };

  const removeGems = (amount: number): boolean => {
    if (gems >= amount) {
      setGems((prev) => {
        const newVal = prev - amount;
        updateDB({ gems: newVal });
        return newVal;
      });
      return true;
    }
    return false;
  };

  const addHeart = () => {
    setHearts((prev) => {
      const newVal = Math.min(prev + 1, 5);
      updateDB({ hearts: newVal, lastHeartRefill: Date.now() });
      return newVal;
    });
  };

  const removeHeart = () => {
    setHearts((prev) => {
      const newVal = Math.max(prev - 1, 0);
      updateDB({ hearts: newVal, lastHeartRefill: Date.now() });
      return newVal;
    });
  };

  const setLanguage = (lang: "mg" | "fr") => {
    setLanguageLocal(lang);
    i18n.locale = lang;
    updateDB({ language: lang });
  };

  const setAvatar = (newAvatar: string) => {
    setAvatarLocal(newAvatar);
    updateDB({ avatar: newAvatar });
  };

  const addMedal = (medal: string) => {
    if (!medals.includes(medal)) {
      setMedals((prev) => {
        const newVal = [...prev, medal];
        updateDB({ medals: newVal.join(",") });
        return newVal;
      });
    }
  };

  const setTheme = (newTheme: "light" | "dark") => {
    setThemeState(newTheme);
    updateDB({ theme: newTheme });
  };

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setThemeState(newTheme);
    updateDB({ theme: newTheme });
  };

  const login = (name: string, church: string, city: string) => {
    setUsername(name);
    setChurchName(church);
    setCity(city);
    setIsLoggedIn(true);
    updateDB({ username: name, churchName: church, city: city });
  };

  const logout = () => {
    setUsername(null);
    setChurchName(null);
    setCity(null);
    setIsLoggedIn(false);
    updateDB({ username: null, churchName: null, city: null });
  };

  const colors = theme === "light" ? LightColors : DarkColors;

  return (
    <UserContext.Provider
      value={{
        gems,
        hearts,
        medals,
        avatar,
        language,
        theme,
        colors,
        addGems,
        removeGems,
        addHeart,
        removeHeart,
        buyHeartWithGems: () => {
          if (hearts < 5 && removeGems(20)) {
            addHeart();
            return true;
          }
          return false;
        },
        lastHeartRefill,
        nextRefillIn,
        setLanguage,
        setAvatar,
        addMedal,
        setTheme,
        toggleTheme,
        username,
        churchName,
        city,
        isLoggedIn,
        login,
        logout,
        isLoading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within a UserProvider");
  return context;
};
