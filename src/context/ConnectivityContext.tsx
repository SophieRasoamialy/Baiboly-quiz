import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { AppState, AppStateStatus, NativeModules } from "react-native";

interface ConnectivityContextType {
  isOnline: boolean;
  isCheckingConnection: boolean;
  refreshConnection: () => Promise<boolean>;
}

const ConnectivityContext = createContext<ConnectivityContextType | undefined>(undefined);
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const CONNECTION_TEST_URL = supabaseUrl
  ? `${supabaseUrl}/auth/v1/health`
  : "https://www.google.com/generate_204";

type NetInfoModule = {
  fetch: () => Promise<{
    type?: string;
    isConnected?: boolean | null;
    isInternetReachable?: boolean | null;
  }>;
  addEventListener: (
    listener: (state: {
      type?: string;
      isConnected?: boolean | null;
      isInternetReachable?: boolean | null;
    }) => void,
  ) => () => void;
};

const getNetInfoModule = (): NetInfoModule | null => {
  if (!NativeModules.RNCNetInfo) {
    console.log("[Connectivity] Native NetInfo module missing, using HTTP fallback");
    return null;
  }

  try {
    const requiredModule = require("@react-native-community/netinfo");
    const module = requiredModule?.default ?? requiredModule;

    if (!module) {
      console.log("[Connectivity] NetInfo package loaded without export, using HTTP fallback");
      return null;
    }

    return module;
  } catch (error) {
    console.log("[Connectivity] NetInfo module unavailable, using HTTP fallback", {
      message: error instanceof Error ? error.message : String(error),
      name: error instanceof Error ? error.name : "UnknownError",
    });
    return null;
  }
};

export const ConnectivityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOnline, setIsOnline] = useState(true);
  const [isCheckingConnection, setIsCheckingConnection] = useState(true);
  const mountedRef = useRef(true);
  const netInfoRef = useRef<NetInfoModule | null>(getNetInfoModule());

  const refreshConnection = useCallback(async () => {
    const netInfo = netInfoRef.current;

    try {
      if (netInfo) {
        const state = await netInfo.fetch();
        const nextOnline = !!state.isConnected && state.isInternetReachable !== false;

        console.log("[Connectivity] NetInfo fetch", {
          type: state.type,
          isConnected: state.isConnected,
          isInternetReachable: state.isInternetReachable,
          online: nextOnline,
        });
        if (mountedRef.current) {
          setIsOnline(nextOnline);
        }
        return nextOnline;
      }

      const response = await fetch(CONNECTION_TEST_URL, { method: "GET" });
      const nextOnline = true;
      console.log("[Connectivity] HTTP fallback result", {
        status: response.status,
        ok: response.ok,
        online: nextOnline,
      });
      if (mountedRef.current) {
        setIsOnline(nextOnline);
      }
      return nextOnline;
    } catch (error) {
      console.log("[Connectivity] Connectivity check failed", {
        message: error instanceof Error ? error.message : String(error),
        name: error instanceof Error ? error.name : "UnknownError",
      });
      if (mountedRef.current) {
        setIsOnline(false);
      }
      return false;
    } finally {
      if (mountedRef.current) {
        setIsCheckingConnection(false);
      }
    }
  }, []);

  useEffect(() => {
    mountedRef.current = true;
    console.log("[Connectivity] Provider mounted");
    refreshConnection();

    const appStateSubscription = AppState.addEventListener("change", (nextState: AppStateStatus) => {
      if (nextState === "active") {
        refreshConnection();
      }
    });

    const unsubscribeNetInfo =
      netInfoRef.current?.addEventListener((state) => {
        const nextOnline = !!state.isConnected && state.isInternetReachable !== false;
        console.log("[Connectivity] NetInfo event", {
          type: state.type,
          isConnected: state.isConnected,
          isInternetReachable: state.isInternetReachable,
          online: nextOnline,
        });

        if (mountedRef.current) {
          setIsOnline(nextOnline);
          setIsCheckingConnection(false);
        }
      }) ?? (() => {});

    return () => {
      console.log("[Connectivity] Provider unmounted");
      mountedRef.current = false;
      unsubscribeNetInfo();
      appStateSubscription.remove();
    };
  }, [refreshConnection]);

  const value = useMemo(
    () => ({
      isOnline,
      isCheckingConnection,
      refreshConnection,
    }),
    [isCheckingConnection, isOnline, refreshConnection],
  );

  return <ConnectivityContext.Provider value={value}>{children}</ConnectivityContext.Provider>;
};

export const useConnectivity = () => {
  const context = useContext(ConnectivityContext);

  if (!context) {
    throw new Error("useConnectivity must be used within a ConnectivityProvider");
  }

  return context;
};
