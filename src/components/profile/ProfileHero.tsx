// No changes needed as no hardcoded strings found.
import { Animated, Image, Text, TouchableOpacity, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import UserAvatar from "../ui/UserAvatar";

interface Props {
  styles: any;
  colors: any;
  avatar: string;
  points: number;
  pulseAnim: Animated.Value;
  isLoggedIn: boolean;
  username?: string | null;
  churchName?: string | null;
  city?: string | null;
  onEdit?: () => void;
}

const ProfileHero: React.FC<Props> = ({
  styles,
  colors,
  avatar,
  points,
  pulseAnim,
  isLoggedIn,
  username,
  churchName,
  city,
  onEdit,
}) => {
  const ringScale = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.06],
  });

  const ringOpacity = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.5, 0.95],
  });

  return (
    <View style={styles.heroWrap}>
      {isLoggedIn && (
        <>
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <UserAvatar 
              avatar={avatar} 
              size={100} 
              showPulse={true} 
              points={points}
            />
          </View>

          <View style={styles.userNameRow}>
            <Text style={styles.userName}>{username}</Text>
            <TouchableOpacity onPress={onEdit} style={styles.editButton}>
              <MaterialCommunityIcons
                name="pencil-outline"
                size={18}
                color={colors.primary}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.chipsRow}>
            {churchName && (
              <View style={styles.infoChip}>
                <MaterialCommunityIcons
                  name="church"
                  size={13}
                  color={colors.secondary}
                />
                <Text style={styles.infoChipText}>{churchName}</Text>
              </View>
            )}

            {city && (
              <View style={styles.infoChip}>
                <MaterialCommunityIcons
                  name="map-marker"
                  size={13}
                  color={colors.secondary}
                />
                <Text style={styles.infoChipText}>{city}</Text>
              </View>
            )}
          </View>
        </>
      )}
    </View>
  );
};

export default ProfileHero;