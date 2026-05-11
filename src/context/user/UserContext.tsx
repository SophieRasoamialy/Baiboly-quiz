import React, { createContext, useContext, useEffect, useMemo, useState, useCallback } from "react";
import i18n from "../../i18n";
import { lightColors, darkColors } from "../../theme";
import { databaseService } from "../../services/DatabaseService";
import { supabaseService } from "../../services/SupabaseService";
import { MEDALS, getMedalForPoints, getMedalsForPoints, MedalInfo } from "../../utils/medal";

import {
  DEFAULT_AVATAR,
  DEFAULT_GEMS,
  DEFAULT_HEARTS,
  DEFAULT_LANGUAGE,
  DEFAULT_MEDALS,
  DEFAULT_THEME,
  DEFAULT_SOUND_ENABLED,
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

const normalizeMedals = (rawMedals: string | null | undefined) =>
  (rawMedals || "")
    .split(",")
    .map((medal) => medal.trim())
    .filter((medal) => medal.length > 0 && MEDALS.some(({ id }) => id === medal));

const isProfileComplete = (profile: {
  name?: string | null;
  church?: string | null;
  city?: string | null;
} | null) =>
  !!profile?.name?.trim() && !!profile?.church?.trim() && !!profile?.city?.trim();

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
  const [points, setPoints] = useState(0);
  const [soundEnabled, setSoundEnabledLocal] = useState(DEFAULT_SOUND_ENABLED);

  const [email, setEmail] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [churchName, setChurchName] = useState<string | null>(null);
  const [city, setCity] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [friends, setFriends] = useState<any[]>([]);

  const [profileId, setProfileId] = useState<string | null>(null);
  const [lastHeartRefill, setLastHeartRefill] = useState<number>(Date.now());
  const [nextRefillIn, setNextRefillIn] = useState<number>(HEART_REFILL_SECONDS);
  
  // Medal unlock callback for notifications
  const [newlyUnlockedMedal, setNewlyUnlockedMedal] = useState<MedalInfo | null>(null);
  const [onMedalUnlocked, setOnMedalUnlocked] = useState<((medal: MedalInfo) => void) | null>(null);

  const updateDB = (data: Record<string, any>) => {
    return databaseService.saveUserState(data);
  };

  const applyAuthenticatedProfile = useCallback(
    async (
      authUserId: string,
      authEmail: string | null,
      profile: {
        name?: string | null;
        avatar?: string | null;
        church?: string | null;
        city?: string | null;
        points?: number | null;
      } | null,
    ) => {
      const nextAvatar = profile?.avatar || DEFAULT_AVATAR;
      const nextName = profile?.name ?? null;
      const nextChurch = profile?.church ?? null;
      const nextCity = profile?.city ?? null;
      const nextPoints = profile?.points ?? 0;

      setProfileId(authUserId);
      setEmail(authEmail);
      setUsername(nextName);
      setAvatarLocal(nextAvatar);
      setChurchName(nextChurch);
      setCity(nextCity);
      setPoints(nextPoints);
      setIsLoggedIn(true);

      await updateDB({
        profileId: authUserId,
        email: authEmail,
        username: nextName,
        avatar: nextAvatar,
        churchName: nextChurch,
        city: nextCity,
        points: nextPoints,
      });
    },
    [],
  );

  const getProfileDefaultsFromUser = useCallback(
    (user: { email?: string | null; user_metadata?: Record<string, any> | null }) => ({
      name: user.user_metadata?.name || user.email?.split("@")[0] || "Mpilalao",
      avatar: user.user_metadata?.avatar || DEFAULT_AVATAR,
      church: user.user_metadata?.church || null,
      city: user.user_metadata?.city || null,
      points: 0,
    }),
    [],
  );

  const clearAuthState = useCallback(async () => {
    setProfileId(null);
    setEmail(null);
    setUsername(null);
    setChurchName(null);
    setCity(null);
    setIsLoggedIn(false);

    await updateDB({
      profileId: null,
      email: null,
      username: null,
      churchName: null,
      city: null,
    });
  }, []);

  useEffect(() => {
    const initData = async () => {
      try {
        await databaseService.init();

        const savedState = await databaseService.getUserState();

        if (savedState) {
          const normalizedMedals = normalizeMedals(savedState.medals);

          setEmail(savedState.email ?? null);
          setGems(savedState.gems ?? DEFAULT_GEMS);
          setHearts(savedState.hearts ?? DEFAULT_HEARTS);
          setMedals(normalizedMedals.length > 0 ? normalizedMedals : DEFAULT_MEDALS);
          setAvatarLocal(savedState.avatar ?? DEFAULT_AVATAR);
          setLanguageLocal((savedState.language as LanguageCode) ?? DEFAULT_LANGUAGE);
          setThemeState((savedState.theme as ThemeMode) ?? DEFAULT_THEME);
          setUsername(savedState.username ?? null);
          setChurchName(savedState.churchName ?? null);
          setCity(savedState.city ?? null);
          setIsLoggedIn(false);
          setLastHeartRefill(savedState.lastHeartRefill || Date.now());
          setPoints(savedState.points || 0);
          setSoundEnabledLocal(savedState.soundEnabled !== undefined ? !!savedState.soundEnabled : DEFAULT_SOUND_ENABLED);
          setProfileId(savedState.profileId ?? null);

          if ((savedState.medals || "") !== normalizedMedals.join(",")) {
            await updateDB({ medals: normalizedMedals.join(",") });
          }

          if (savedState.language) {
            i18n.locale = savedState.language;
          }

          const savedFriends = await databaseService.getFriends();
          setFriends(savedFriends || []);
        }

        const currentUser = await supabaseService.getCurrentSessionUser().catch(() => null);

        if (currentUser) {
          let profile = await supabaseService.getProfile(currentUser.id);

          if (!profile) {
            const defaults = getProfileDefaultsFromUser(currentUser);
            await supabaseService.upsertProfile(currentUser.id, {
              name: savedState?.username || defaults.name,
              avatar: savedState?.avatar || defaults.avatar,
              church: savedState?.churchName || defaults.church,
              city: savedState?.city || defaults.city,
              points: savedState?.points || defaults.points,
            });

            profile = await supabaseService.getProfile(currentUser.id);
          }

          await applyAuthenticatedProfile(currentUser.id, currentUser.email ?? null, profile);
        } else {
          await clearAuthState();
        }
      } catch (error) {
        console.error("Failed to init SQLite", error);
      } finally {
        setIsLoading(false);
      }
    };

    initData();
  }, [applyAuthenticatedProfile, clearAuthState, getProfileDefaultsFromUser]);

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

  // Check and unlock medals based on points
  const checkAndUnlockMedals = useCallback((currentPoints: number) => {
    const earnedMedals = getMedalsForPoints(currentPoints);
    const newMedals: string[] = [];
    
    earnedMedals.forEach(medal => {
      if (!medals.includes(medal.id)) {
        newMedals.push(medal.id);
      }
    });
    
    if (newMedals.length > 0) {
      setMedals(prev => {
        const updated = [...prev, ...newMedals];
        updateDB({ medals: updated.join(",") });
        return updated;
      });
      
      // Trigger callback for the most recently unlocked medal
      const latestMedal = earnedMedals[earnedMedals.length - 1];
      setNewlyUnlockedMedal(latestMedal);
      if (onMedalUnlocked) {
        onMedalUnlocked(latestMedal);
      }
    }
  }, [medals, onMedalUnlocked]);

  const addPoints = (amount: number) => {
    setPoints((prev) => {
      const newValue = Math.max(0, prev + amount);
      updateDB({ points: newValue });
      
      // Check for new medal unlocks after points update
      setTimeout(() => checkAndUnlockMedals(newValue), 100);
      
      // Sync to Supabase
      if (isLoggedIn && profileId && (username || churchName)) {
        supabaseService.upsertProfile(profileId, {
          name: username || "Mpilalao",
          avatar: avatar,
          church: churchName,
          city: city,
          points: newValue,
        }).catch(err => console.error("Auto-sync points error:", err));
      }

      return newValue;
    });
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

    // Sync to Supabase
    if (isLoggedIn && profileId && (username || churchName)) {
      supabaseService.upsertProfile(profileId, {
        name: username || "Mpilalao",
        avatar: newAvatar,
        church: churchName,
        city: city,
        points: points,
      }).catch(err => console.error("Auto-sync avatar error:", err));
    }
  };

  const addMedal = (medal: string) => {
    if (medals.includes(medal)) return;

    setMedals((prev) => {
      const newValue = [...prev, medal];
      updateDB({ medals: newValue.join(",") });
      return newValue;
    });
  };
  
  // Set callback for medal unlock notifications
  const setMedalUnlockCallback = useCallback((callback: (medal: MedalInfo) => void | null) => {
    setOnMedalUnlocked(() => callback);
  }, []);
  
  // Clear the newly unlocked medal notification
  const clearNewlyUnlockedMedal = useCallback(() => {
    setNewlyUnlockedMedal(null);
  }, []);
  
  // Get current medal based on points
  const currentMedal = useMemo(() => getMedalForPoints(points), [points]);
  
  // Get next medal to unlock
  const nextMedal = useMemo(() => {
    return MEDALS.find(m => points < m.minPoints) || null;
  }, [points]);

  const setTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme);
    updateDB({ theme: newTheme });
  };

  const setSoundEnabled = (enabled: boolean) => {
    setSoundEnabledLocal(enabled);
    updateDB({ soundEnabled: enabled ? 1 : 0 });
  };

  const toggleTheme = () => {
    const newTheme: ThemeMode = theme === "light" ? "dark" : "light";
    setThemeState(newTheme);
    updateDB({ theme: newTheme });
  };

  const signUp = async (
    nextEmail: string,
    nextPassword: string,
    profile: { name: string; avatar: string; church: string; city: string },
  ) => {
    const result = await supabaseService.signUpWithEmail(nextEmail, nextPassword, {
      name: profile.name,
      avatar: profile.avatar,
      church: profile.church,
      city: profile.city,
      points: 0,
    });

    if (!result.needsEmailConfirmation) {
      await applyAuthenticatedProfile(result.user.id, result.user.email ?? nextEmail.trim(), {
        name: profile.name,
        avatar: profile.avatar,
        church: profile.church,
        city: profile.city,
        points: 0,
      });
    }

    return {
      needsEmailConfirmation: result.needsEmailConfirmation,
    };
  };

  const signIn = async (nextEmail: string, nextPassword: string) => {
    const { user } = await supabaseService.signInWithEmail(nextEmail, nextPassword);

    if (!user) {
      throw new Error("Supabase sign in succeeded without a user.");
    }

    let profile = await supabaseService.getProfile(user.id);

    if (!profile) {
      await supabaseService.upsertProfile(user.id, getProfileDefaultsFromUser(user));

      profile = await supabaseService.getProfile(user.id);
    }

    await applyAuthenticatedProfile(user.id, user.email ?? nextEmail.trim(), profile);
  };

  const signInWithGoogle = async (callbackUrl: string) => {
    const user = await supabaseService.completeOAuthSignInFromUrl(callbackUrl);

    if (!user) {
      throw new Error("Google sign in succeeded without a user.");
    }

    let profile = await supabaseService.getProfile(user.id);
    let profileComplete = isProfileComplete(profile);

    if (!profile) {
      await supabaseService.upsertProfile(user.id, getProfileDefaultsFromUser(user));
      profile = await supabaseService.getProfile(user.id);
      profileComplete = false;
    }

    await applyAuthenticatedProfile(user.id, user.email ?? null, profile);

    return {
      profileComplete,
    };
  };

  const updateProfile = async (profile: { name: string; church: string; city: string }) => {
    if (!profileId) {
      throw new Error("No authenticated profile to update.");
    }

    await supabaseService.upsertProfile(profileId, {
      name: profile.name,
      avatar,
      church: profile.church,
      city: profile.city,
      points,
    });

    setUsername(profile.name);
    setChurchName(profile.church);
    setCity(profile.city);

    await updateDB({
      username: profile.name,
      churchName: profile.church,
      city: profile.city,
    });
  };

  const syncProfile = async () => {
    if (!profileId || !username) return;
    try {
      await supabaseService.upsertProfile(profileId, {
        name: username,
        avatar,
        church: churchName,
        city,
        points,
      });
    } catch (error) {
      console.error("Manual syncProfile error:", error);
    }
  };

  const logout = async () => {
    try {
      await supabaseService.signOut();
    } finally {
      await clearAuthState();
    }
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
      email,
      username,
      churchName,
      city,
      isLoggedIn,
      isLoading,
      friends,
      points,
      soundEnabled,

      addGems,
      removeGems,
      addPoints,
      addHeart,
      removeHeart,
      buyHeartWithGems,
      setLanguage,
      setAvatar,
      addMedal,
      setTheme,
      toggleTheme,
      signUp,
      signIn,
      signInWithGoogle,
      updateProfile,
      logout,
      addFriend,
      removeFriend,
      setSoundEnabled,
      syncProfile,
      profileId,
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
      email,
      username,
      churchName,
      city,
      isLoggedIn,
      isLoading,
      friends,
      points,
      soundEnabled,
      profileId,
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
