import React, { useCallback } from "react";
import { View, LogBox } from "react-native";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import AppNavigator from "./src/navigation";
import { UserProvider, useUser } from "./src/context/user";
import { AlertProvider } from "./src/context/AlertContext";
import CustomAlert from "./src/components/ui/CustomAlert";
import { lightColors, darkColors } from "./src/theme/colors";

// Ignore some warnings in dev
LogBox.ignoreLogs([
  "Sending `onAnimatedValueUpdate` with no listeners registered",
]);

SplashScreen.preventAutoHideAsync();

function AppContent() {
  const { theme } = useUser();

  const colors = theme === "light" ? lightColors : darkColors;
  const isLight = theme === "light";

  const navigationTheme = {
    ...(isLight ? DefaultTheme : DarkTheme),
    colors: {
      ...(isLight ? DefaultTheme.colors : DarkTheme.colors),
      background: colors.background,
      card: colors.surface,
      text: colors.text,
      border: colors.border,
      primary: colors.primary,
      notification: colors.accent,
    },
  };

  return (
    <>
      <NavigationContainer theme={navigationTheme}>
        <AppNavigator />
      </NavigationContainer>

      <CustomAlert />
      <StatusBar style={isLight ? "dark" : "light"} />
    </>
  );
}

export default function App() {
  const [fontsLoaded] = useFonts({
    // Example:
    // "Inter-Regular": require("./assets/fonts/Inter-Regular.ttf"),
    // "Inter-Bold": require("./assets/fonts/Inter-Bold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <UserProvider>
      <AlertProvider>
        <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
          <AppContent />
        </View>
      </AlertProvider>
    </UserProvider>
  );
}
