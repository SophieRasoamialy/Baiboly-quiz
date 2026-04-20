import React from "react";
import { View, Text, TouchableOpacity, ScrollView, Image, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation";
import { useUser } from "../../context/user";
import { useAppTheme } from "../../hooks/useAppTheme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { AVATAR_MAP } from "../../constants/avatar";

import { createFriendSelectionStyles } from "./friend-selection.styles";
import FloatingGem from "../../components/home/FloatingGem";
import { BackButton } from "../../components/ui/BackButton";

const { width } = Dimensions.get("window");

type FriendSelectionScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "FriendSelection"
>;

interface Props {
  navigation: FriendSelectionScreenNavigationProp;
  route: any;
}

const FriendSelectionScreen: React.FC<Props> = ({ navigation, route }) => {
  const { gameType = "duo", quizType = "standard" } = route.params || {};
  const { friends } = useUser();
  const { colors, isLight } = useAppTheme();
  const styles = createFriendSelectionStyles(colors);

  const gemsConfig = [
    { x: width * 0.1, size: 14, delay: 0, duration: 8000, opacity: 0.5 },
    { x: width * 0.85, size: 18, delay: 2000, duration: 7500, opacity: 0.4 },
  ];

  return (
    <View style={styles.container}>
      <StatusBar style={isLight ? "dark" : "light"} />
      
      <LinearGradient
        colors={
          isLight
            ? [colors.background, colors.backgroundSecondary]
            : [colors.background, colors.backgroundSecondary, colors.background]
        }
        style={styles.backgroundFill}
      />

      {!isLight && (
        <>
          <View pointerEvents="none" style={styles.glowLeft} />
          <View pointerEvents="none" style={styles.glowRight} />
        </>
      )}

      {gemsConfig.map((gem, index) => (
        <FloatingGem key={index} {...gem} isLight={isLight} />
      ))}

      <SafeAreaView style={styles.safeArea} edges={["top"]}>
        <View style={styles.header}>
          <BackButton colors={colors} onPress={() => navigation.goBack()} />
          <Text style={styles.headerTitle}>
            {gameType === "team" ? "Hifidy Mpilalao (2v2)" : "Hifidy Mpilalao"}
          </Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
          <Text style={styles.sectionTitle}>Fomba hitadiavana</Text>
          
          <View style={styles.cardGroup}>
            <TouchableOpacity 
              activeOpacity={0.85} 
              style={styles.selectionCard}
              onPress={() => navigation.navigate("Matchmaking", { mode: "random", gameType, quizType } as any)}
            >
              <LinearGradient
                colors={[colors.card, colors.surfaceSoft]}
                style={styles.selectionGradient}
              >
                <View style={styles.iconBox}>
                  <MaterialCommunityIcons name="radar" size={30} color={colors.primary} />
                </View>
                <View style={styles.cardInfo}>
                  <Text style={styles.cardTitle}>Lalao Kisendrasendra</Text>
                  <Text style={styles.cardDesc}>Hikaroka mpilalao hafa mifandray aminao.</Text>
                </View>
                <MaterialCommunityIcons name="chevron-right" size={20} color={colors.textMuted} />
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity 
              activeOpacity={0.85} 
              style={styles.selectionCard}
              onPress={() => navigation.navigate("FriendSearch", { gameType, quizType } as any)}
            >
              <LinearGradient
                colors={[colors.card, colors.surfaceSoft]}
                style={styles.selectionGradient}
              >
                <View style={styles.iconBox}>
                  <MaterialCommunityIcons name="account-search-outline" size={30} color={colors.secondary} />
                </View>
                <View style={styles.cardInfo}>
                  <Text style={styles.cardTitle}>Mikaroka Namana</Text>
                  <Text style={styles.cardDesc}>Tadiavo amin'ny anarany ny namanao.</Text>
                </View>
                <MaterialCommunityIcons name="chevron-right" size={20} color={colors.textMuted} />
              </LinearGradient>
            </TouchableOpacity>
          </View>

          <Text style={styles.sectionTitle}>Ny Namako ({friends.length})</Text>

          <View style={styles.friendsList}>
            {friends.length > 0 ? (
              friends.map((friend) => (
                <View key={friend.id} style={styles.friendRow}>
                  <View style={styles.friendAvatar}>
                    <Image
                      source={AVATAR_MAP[friend.avatar as keyof typeof AVATAR_MAP] || AVATAR_MAP.david}
                      style={styles.friendImage}
                    />
                  </View>
                  <View style={styles.friendInfo}>
                    <Text style={styles.friendName}>{friend.name}</Text>
                    {friend.church && (
                      <Text style={styles.friendDetail}>
                        <MaterialCommunityIcons name="church" size={10} /> {friend.church}
                      </Text>
                    )}
                  </View>
                  <TouchableOpacity 
                    style={styles.inviteBtn}
                    onPress={() => navigation.navigate("Matchmaking", { mode: "invite", friendName: friend.name, gameType, quizType } as any)}
                  >
                    <Text style={styles.inviteText}>ASAO</Text>
                  </TouchableOpacity>
                </View>
              ))
            ) : (
              <View style={styles.emptyFriends}>
                <MaterialCommunityIcons name="account-heart-outline" size={48} color={colors.textMuted} />
                <Text style={styles.emptyFriendsText}>
                  Tsy mbola manana namana voatahiry ianao. Mikaroha namana mba hanampiana azy eto.
                </Text>
              </View>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default FriendSelectionScreen;
