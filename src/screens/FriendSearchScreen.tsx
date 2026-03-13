import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  Animated,
  Image,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS } from "./HomeScreenStyles";

const { width } = Dimensions.get("window");

type FriendSearchScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "FriendSearch"
>;
interface Props {
  navigation: FriendSearchScreenNavigationProp;
}

const MOCK_USERS = [
  {
    id: "1",
    name: "Rasoa",
    church: "FJKM Ambatonakanga",
    avatar: "woman",
    status: "online",
  },
  {
    id: "2",
    name: "Andry",
    church: "METM Itaosy",
    avatar: "boy",
    status: "online",
  },
  {
    id: "3",
    name: "Miora",
    church: "Ekar Faravohitra",
    avatar: "girl",
    status: "offline",
  },
  {
    id: "4",
    name: "Tafita",
    church: "FLM Ambohibao",
    avatar: "kid",
    status: "online",
  },
  {
    id: "5",
    name: "Mpitoriteny",
    church: "FJKM Analakely",
    avatar: "pastor",
    status: "online",
  },
  {
    id: "6",
    name: "Dera",
    church: "AEE Ambohidratrimo",
    avatar: "elder",
    status: "online",
  },
];

const AVATAR_MAP: { [key: string]: any } = {
  elder: require("../../assets/avatars/elder.png"),
  woman: require("../../assets/avatars/woman.png"),
  boy: require("../../assets/avatars/boy.png"),
  girl: require("../../assets/avatars/girl.png"),
  kid: require("../../assets/avatars/kid.png"),
  pastor: require("../../assets/avatars/pastor.png"),
};

const FriendSearchScreen: React.FC<Props> = ({ navigation }) => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<any[]>([]);

  const fadeAnim = useRef(new Animated.Value(1)).current;

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
    });
  };

  const renderUser = ({ item }: { item: any }) => (
    <View style={styles.userItem}>
      <View style={styles.avatarWrapper}>
        <Image source={AVATAR_MAP[item.avatar]} style={styles.itemAvatar} />
        <View
          style={[
            styles.statusDot,
            {
              backgroundColor: item.status === "online" ? "#00E676" : "#757575",
            },
          ]}
        />
      </View>
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{item.name}</Text>
        <Text style={styles.userChurch}>{item.church}</Text>
      </View>
      <TouchableOpacity
        onPress={() => inviteFriend(item)}
        disabled={item.status === "offline"}
        style={[
          styles.inviteBtn,
          item.status === "offline" && styles.inviteBtnDisabled,
        ]}
      >
        <Text style={styles.inviteText}>
          {item.status === "online" ? "Asao" : "Tsy eo"}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#0D0B15", "#0A121A"]}
        style={StyleSheet.absoluteFillObject}
      />

      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backBtn}
          >
            <MaterialCommunityIcons name="arrow-left" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Mikaroka Namana</Text>
          <View style={{ width: 40 }} />
        </View>

        <View style={styles.searchContainer}>
          <View style={styles.searchWrapper}>
            <MaterialCommunityIcons
              name="magnify"
              size={24}
              color="rgba(255,255,255,0.4)"
            />
            <TextInput
              style={styles.input}
              placeholder="Solon'anarana mpanampy..."
              placeholderTextColor="rgba(255,255,255,0.3)"
              value={search}
              onChangeText={handleSearch}
              autoFocus
            />
          </View>
        </View>

        <View style={styles.content}>
          {search.length > 0 && results.length === 0 ? (
            <View style={styles.emptyState}>
              <MaterialCommunityIcons
                name="account-search-outline"
                size={80}
                color="rgba(255,255,255,0.1)"
              />
              <Text style={styles.emptyText}>
                Tsy nisy mpilalao hita amin'io anarana io.
              </Text>
            </View>
          ) : search.length === 0 ? (
            <View style={styles.emptyState}>
              <MaterialCommunityIcons
                name="human-greeting-variant"
                size={80}
                color="rgba(255,255,255,0.1)"
              />
              <Text style={styles.emptyText}>
                Ampidiro ny anaran'ny namanao mba hikarohana azy.
              </Text>
            </View>
          ) : (
            <FlatList
              data={results}
              renderItem={renderUser}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.listContent}
            />
          )}
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.05)",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "800",
  },
  searchContainer: {
    padding: 20,
  },
  searchWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 16,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  input: {
    flex: 1,
    height: 54,
    color: "#fff",
    fontSize: 16,
    marginLeft: 10,
  },
  content: {
    flex: 1,
  },
  listContent: {
    padding: 20,
    paddingTop: 0,
  },
  userItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.03)",
    padding: 15,
    borderRadius: 20,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
  },
  avatarWrapper: {
    position: "relative",
  },
  itemAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "rgba(0,229,204,0.1)",
  },
  statusDot: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: "#0A121A",
  },
  userInfo: {
    flex: 1,
    marginLeft: 15,
  },
  userName: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  userChurch: {
    color: "rgba(255,255,255,0.4)",
    fontSize: 12,
    marginTop: 2,
  },
  inviteBtn: {
    backgroundColor: COLORS.emerald,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
  },
  inviteBtnDisabled: {
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  inviteText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "800",
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
    marginTop: -50,
  },
  emptyText: {
    color: "rgba(255,255,255,0.3)",
    fontSize: 15,
    textAlign: "center",
    marginTop: 20,
    lineHeight: 22,
  },
});

export default FriendSearchScreen;
