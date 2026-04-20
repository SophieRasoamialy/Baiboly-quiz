import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import i18n from "../../i18n";
import { lightColors, darkColors } from "../../theme";
import { databaseService } from "../../services/DatabaseService";

import {
  DEFAULT_AVATAR,
  DEFAULT_GEMS,
  DEFAULT_HEARTS,
  DEFAULT_LANGUAGE,
  DEFAULT_MEDALS,
  DEFAULT_THEME,
  HEART_PRICE_GEMS,
  HEART_REFILL_SECONDS,
  MAX_HEARTS,
} from "./user.constants";
import {
  canBuyHeart,
  clampHearts,
  getHeartsToRefill,
  getRemainingRefillTime,
} from "./user.helpers";
import {
  LanguageCode,
  ThemeMode,
  UserContextType,
} from "./user.types";

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState(true);

  const [gems, setGems] = useState(DEFAULT_GEMS);
  const [hearts, setHearts] = useState(DEFAULT_HEARTS);
  const [medals, setMedals] = useState<string[]>(DEFAULT_MEDALS);
  const [avatar, setAvatarLocal] = useState(DEFAULT_AVATAR);
  const [language, setLanguageLocal] = useState<LanguageCode>(DEFAULT_LANGUAGE);
  const [theme, setThemeState] = useState<ThemeMode>(DEFAULT_THEME);

  const [username, setUsername] = useState<string | null>(null);
  const [churchName, setChurchName] = useState<string | null>(null);
  const [city, setCity] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [friends, setFriends] = useState<any[]>([]);

  const [lastHeartRefill, setLastHeartRefill] = useState<number>(Date.now());
  const [nextRefillIn, setNextRefillIn] = useState<number>(HEART_REFILL_SECONDS);

  const updateDB = (data: Record<string, any>) => {
    return databaseService.saveUserState(data);
  };

  useEffect(() => {
    const initData = async () => {
      try {
        await databaseService.init();

        const savedState = await databaseService.getUserState();

        if (savedState) {
          setGems(savedState.gems ?? DEFAULT_GEMS);
          setHearts(savedState.hearts ?? DEFAULT_HEARTS);
          setMedals(savedState.medals ? savedState.medals.split(",") : DEFAULT_MEDALS);
          setAvatarLocal(savedState.avatar ?? DEFAULT_AVATAR);
          setLanguageLocal((savedState.language as LanguageCode) ?? DEFAULT_LANGUAGE);
          setThemeState((savedState.theme as ThemeMode) ?? DEFAULT_THEME);
          setUsername(savedState.username ?? null);
          setChurchName(savedState.churchName ?? null);
          setCity(savedState.city ?? null);
          setIsLoggedIn(!!savedState.username);
          setLastHeartRefill(savedState.lastHeartRefill || Date.now());

          if (savedState.language) {
            i18n.locale = savedState.language;
          }

          const savedFriends = await databaseService.getFriends();
          setFriends(savedFriends || []);
        }
      } catch (error) {
        console.error("Failed to init SQLite", error);
      } finally {
        setIsLoading(false);
      }
    };

    initData();
  }, []);

  useEffect(() => {
    const refillInterval = setInterval(() => {
      if (hearts < MAX_HEARTS) {
        const remaining = getRemainingRefillTime(lastHeartRefill);
        setNextRefillIn(remaining);

        const heartsToAdd = getHeartsToRefill(lastHeartRefill);

        if (heartsToAdd > 0) {
          const now = Date.now();

          setHearts((prev) => {
            const newHearts = clampHearts(prev + heartsToAdd);

            if (newHearts !== prev) {
              updateDB({
                hearts: newHearts,
                lastHeartRefill: now,
              });
            }

            return newHearts;
          });

          setLastHeartRefill(now);
        }
      } else {
        setNextRefillIn(HEART_REFILL_SECONDS);
      }
    }, 1000);

    return () => clearInterval(refillInterval);
  }, [hearts, lastHeartRefill]);

  const addGems = (amount: number) => {
    setGems((prev) => {
      const newValue = prev + amount;
      updateDB({ gems: newValue });
      return newValue;
    });
  };

  const removeGems = (amount: number): boolean => {
    if (gems < amount) return false;

    setGems((prev) => {
      const newValue = prev - amount;
      updateDB({ gems: newValue });
      return newValue;
    });

    return true;
  };

  const addHeart = () => {
    const now = Date.now();

    setHearts((prev) => {
      const newValue = clampHearts(prev + 1);
      updateDB({
        hearts: newValue,
        lastHeartRefill: now,
      });
      return newValue;
    });

    setLastHeartRefill(now);
  };

  const removeHeart = () => {
    const now = Date.now();

    setHearts((prev) => {
      const newValue = clampHearts(prev - 1);
      updateDB({
        hearts: newValue,
        lastHeartRefill: now,
      });
      return newValue;
    });

    setLastHeartRefill(now);
  };

  const buyHeartWithGems = (): boolean => {
    if (!canBuyHeart(gems, hearts)) return false;

    const removed = removeGems(HEART_PRICE_GEMS);
    if (!removed) return false;

    addHeart();
    return true;
  };

  const setLanguage = (lang: LanguageCode) => {
    setLanguageLocal(lang);
    i18n.locale = lang;
    updateDB({ language: lang });
  };

  const setAvatar = (newAvatar: string) => {
    setAvatarLocal(newAvatar);
    updateDB({ avatar: newAvatar });
  };

  const addMedal = (medal: string) => {
    if (medals.includes(medal)) return;

    setMedals((prev) => {
      const newValue = [...prev, medal];
      updateDB({ medals: newValue.join(",") });
      return newValue;
    });
  };

  const setTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme);
    updateDB({ theme: newTheme });
  };

  const toggleTheme = () => {
    const newTheme: ThemeMode = theme === "light" ? "dark" : "light";
    setThemeState(newTheme);
    updateDB({ theme: newTheme });
  };

  const login = (name: string, church: string, cityName: string) => {
    setUsername(name);
    setChurchName(church);
    setCity(cityName);
    setIsLoggedIn(true);

    updateDB({
      username: name,
      churchName: church,
      city: cityName,
    });
  };

  const logout = () => {
    setUsername(null);
    setChurchName(null);
    setCity(null);
    setIsLoggedIn(false);

    updateDB({
      username: null,
      churchName: null,
      city: null,
    });
  };

  const addFriend = async (friend: any) => {
    if (friends.some((f) => f.id === friend.id)) return;
    await databaseService.addFriend(friend);
    setFriends((prev) => [...prev, friend]);
  };

  const removeFriend = async (id: string) => {
    await databaseService.removeFriend(id);
    setFriends((prev) => prev.filter((f) => f.id !== id));
  };

  const colors = theme === "light" ? lightColors : darkColors;

  const value = useMemo<UserContextType>(
    () => ({
      gems,
      hearts,
      medals,
      avatar,
      language,
      theme,
      colors,
      lastHeartRefill,
      nextRefillIn,
      username,
      churchName,
      city,
      isLoggedIn,
      isLoading,
      friends,

      addGems,
      removeGems,
      addHeart,
      removeHeart,
      buyHeartWithGems,
      setLanguage,
      setAvatar,
      addMedal,
      setTheme,
      toggleTheme,
      login,
      logout,
      addFriend,
      removeFriend,
    }),
    [
      gems,
      hearts,
      medals,
      avatar,
      language,
      theme,
      colors,
      lastHeartRefill,
      nextRefillIn,
      username,
      churchName,
      city,
      isLoggedIn,
      isLoading,
      friends,
    ],
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return context;
};