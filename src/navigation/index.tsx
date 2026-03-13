import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import SoloQuizScreen from "../screens/SoloQuizScreen";
import ThemeSelectionScreen from "../screens/ThemeSelectionScreen";
import MultiplayerScreen from "../screens/MultiplayerScreen";
import ProfileScreen from "../screens/ProfileScreen";
import SettingsScreen from "../screens/SettingsScreen";
import RankingScreen from "../screens/RankingScreen";
import BibleScreen from "../screens/BibleScreen";
import VerseOfDayScreen from "../screens/VerseOfDayScreen";
import AuthScreen from "../screens/AuthScreen";
import DuoQuizScreen from "../screens/DuoQuizScreen";
import MatchmakingScreen from "../screens/MatchmakingScreen";
import FriendSearchScreen from "../screens/FriendSearchScreen";
import OnlineQuizScreen from "../screens/OnlineQuizScreen";
import { useUser } from "../context/UserContext";

export type RootStackParamList = {
  Home: undefined;
  ThemeSelection: undefined;
  SoloQuiz: { theme: string };
  Multiplayer: undefined;
  Profile: undefined;
  Settings: undefined;
  Ranking: undefined;
  Bible: undefined;
  VerseOfDay: undefined;
  Auth: undefined;
  DuoQuiz: undefined;
  Matchmaking: { mode: "random" | "invite"; friendName?: string };
  FriendSearch: undefined;
  OnlineQuiz: { opponent: any };
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  const { theme, colors } = useUser();

  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="ThemeSelection" component={ThemeSelectionScreen} />
      <Stack.Screen name="SoloQuiz" component={SoloQuizScreen} />
      <Stack.Screen name="Multiplayer" component={MultiplayerScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Ranking" component={RankingScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="Bible" component={BibleScreen} />
      <Stack.Screen name="VerseOfDay" component={VerseOfDayScreen} />
      <Stack.Screen name="Auth" component={AuthScreen} />
      <Stack.Screen name="DuoQuiz" component={DuoQuizScreen} />
      <Stack.Screen name="Matchmaking" component={MatchmakingScreen} />
      <Stack.Screen name="FriendSearch" component={FriendSearchScreen} />
      <Stack.Screen name="OnlineQuiz" component={OnlineQuizScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
