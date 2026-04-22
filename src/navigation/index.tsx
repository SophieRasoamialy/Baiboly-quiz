import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/home/HomeScreen";
import SoloQuizScreen from "../screens/solo-quiz/SoloQuizScreen";
import ThemeSelectionScreen from "../screens/solo-quiz/ThemeSelectionScreen";
import MultiplayerScreen from "../screens/multiplayer/MultiplayerScreen";
import ProfileScreen from "../screens/profile/ProfileScreen";
import SettingsScreen from "../screens/settings/SettingsScreen";
import RankingScreen from "../screens/ranking/RankingScreen";
import BibleScreen from "../screens/bible/BibleScreen";
import VerseOfDayScreen from "../screens/verse-of-day/VerseOfDayScreen";
import AuthScreen from "../screens/auth/AuthScreen";
import DuoQuizScreen from "../screens/duo/DuoQuizScreen";
import DuoImageQuizScreen from "../screens/duo/DuoImageQuizScreen";
import DuoSetupScreen from "../screens/duo/DuoSetupScreen";
import FriendSelectionScreen from "../screens/multiplayer/FriendSelectionScreen";
import MatchmakingScreen from "../screens/matchmaking/MatchmakingScreen";
import FriendSearchScreen from "../screens/friend-search/FriendSearchScreen";
import OnlineQuizScreen from "../screens/online-quiz/OnlineQuizScreen";
import OnlineImageQuizScreen from "../screens/online-quiz/OnlineImageQuizScreen";
import TeamQuizScreen from "../screens/team-quiz/TeamQuizScreen";
import ImageQuizScreen from "../screens/image-quiz/ImageQuizScreen";
import ImageQuizModeScreen from "../screens/image-quiz/ImageQuizModeScreen";
import { useUser } from "../context/user";

import { RootStackParamList } from "./types";


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
      <Stack.Screen name="DuoImageQuiz" component={DuoImageQuizScreen} />
      <Stack.Screen name="DuoSetup" component={DuoSetupScreen} />
      <Stack.Screen name="FriendSelection" component={FriendSelectionScreen} />
      <Stack.Screen name="Matchmaking" component={MatchmakingScreen} />
      <Stack.Screen name="FriendSearch" component={FriendSearchScreen} />
      <Stack.Screen name="OnlineQuiz" component={OnlineQuizScreen} />
      <Stack.Screen name="OnlineImageQuiz" component={OnlineImageQuizScreen} />
      <Stack.Screen name="TeamQuiz" component={TeamQuizScreen} />
      <Stack.Screen name="ImageQuiz" component={ImageQuizScreen} />
      <Stack.Screen name="ImageQuizMode" component={ImageQuizModeScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
