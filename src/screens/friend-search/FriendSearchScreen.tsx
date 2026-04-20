import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { useUser } from "../../context/user";
import { useAppTheme } from "../../hooks/useAppTheme";
import { MOCK_USERS } from "../../constants/friends";
import { FriendItem } from "../../components/friend-search/FriendItem";

import { createFriendSearchStyles } from "./friend-search.styles";
import FloatingGem from "../../components/home/FloatingGem";

const { width } = Dimensions.get("window");

type FriendSearchScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "FriendSearch"
>;

interface Props {
  navigation: FriendSearchScreenNavigationProp;
  route: any;
}

const FriendSearchScreen: React.FC<Props> = ({ navigation, route }) => {
  const { gameType = "duo" } = route.params || {};
  const { friends, addFriend } = useUser();
  const { colors, isLight } = useAppTheme();
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<any[]>([]);

  const styles = createFriendSearchStyles(colors);

  const handleSearch = (text: string) => {
    setSearch(text);
    if (text.trim().length > 1) {
      const filtered = MOCK_USERS.filter((user) =>
        user.name.toLowerCase().includes(text.toLowerCase()),
      );
      setResults(filtered);
    } else {
      setResults([]);
    }
  };

  const inviteFriend = (friend: any) => {
    navigation.navigate("Matchmaking", {
      mode: "invite",
      friendName: friend.name,
    } as any);
  };

  const handleAddFriend = (friend: any) => {
    addFriend(friend);
  };

  const gemsConfig = [
    { x: width * 0.1, size: 12, delay: 0, duration: 8000, opacity: 0.4 },
    { x: width * 0.9, size: 16, delay: 2000, duration: 9000, opacity: 0.5 },
  ];

  const renderEmptyState = () => {
    if (search.length > 0 && results.length === 0) {
      return (
        <View style={styles.emptyState}>
          <MaterialCommunityIcons
            name="account-search-outline"
            size={80}
            color={colors.surfaceSoft}
          />
          <Text style={styles.emptyText}>
            Tsy nisy mpilalao hita amin'io anarana io.
          </Text>
        </View>
      );
    }
    return (
      <View style={styles.emptyState}>
        <MaterialCommunityIcons
          name="human-greeting-variant"
          size={80}
          color={colors.surfaceSoft}
        />
        <Text style={styles.emptyText}>
          Ampidiro ny anaran'ny namanao mba hikarohana azy.
        </Text>
      </View>
    );
  };

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
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backBtn}
          >
            <MaterialCommunityIcons name="arrow-left" size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Mikaroka Namana</Text>
          <View style={{ width: 40 }} />
        </View>

        <View style={styles.searchContainer}>
          <View style={styles.searchWrapper}>
            <MaterialCommunityIcons
              name="magnify"
              size={24}
              color={colors.textMuted}
            />
            <TextInput
              style={styles.input}
              placeholder="Solon'anarana mpanampy..."
              placeholderTextColor={colors.textMuted}
              value={search}
              onChangeText={handleSearch}
              autoFocus
            />
          </View>
        </View>

        <View style={styles.content}>
          <FlatList
            data={search.length > 0 ? results : []}
            renderItem={({ item }) => (
              <FriendItem 
                item={item} 
                onInvite={inviteFriend}
                onAddFriend={handleAddFriend}
                isFriend={friends.some(f => f.id === item.id)}
                styles={styles} 
                colors={colors} 
              />
            )}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContent}
            ListEmptyComponent={renderEmptyState()}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

export default FriendSearchScreen;
