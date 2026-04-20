import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation";
import { useAppTheme } from "../../hooks/useAppTheme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { AVATARS } from "../../constants/avatar";

import { createMultiplayerStyles } from "../multiplayer/multiplayer.styles";
import { BackButton } from "../../components/ui/BackButton";

const { width, height } = Dimensions.get("window");

type DuoSetupScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "DuoSetup"
>;

interface Props {
  navigation: DuoSetupScreenNavigationProp;
  route: any;
}

const DuoSetupScreen: React.FC<Props> = ({ navigation, route }) => {
  const { quizType = "standard" } = route.params || {};
  const { colors, isLight } = useAppTheme();
  const [p1Selection, setP1Selection] = useState<any>(null);
  const [p2Selection, setP2Selection] = useState<any>(null);

  const styles = createMultiplayerStyles(colors);

  const handleStart = () => {
    if (p1Selection && p2Selection) {
      const destination = quizType === "image" ? "DuoImageQuiz" : "DuoQuiz";
      navigation.navigate(destination as any, { p1: p1Selection, p2: p2Selection });
    }
  };

  const renderCharacterList = (
    selected: any,
    onSelect: (char: any) => void,
    otherSelected: any,
    inverted: boolean = false
  ) => (
    <View style={inverted ? { transform: [{ rotate: "180deg" }], flex: 1, justifyContent: 'center' } : { flex: 1, justifyContent: 'center' }}>
      <Text style={[styles.sectionTitle, { textAlign: 'center', marginBottom: 10 }]}>
        Hifidy ny anaranao
      </Text>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, alignItems: 'center' }}
      >
        {AVATARS.map((char) => {
          const isSelected = selected?.id === char.id;
          const isTaken = otherSelected?.id === char.id;
          
          return (
            <TouchableOpacity
              key={char.id}
              disabled={isTaken}
              onPress={() => onSelect(char)}
              style={{
                marginRight: 15,
                alignItems: 'center',
                opacity: isTaken ? 0.3 : 1,
              }}
            >
              <View style={{
                width: 80,
                height: 80,
                borderRadius: 40,
                borderWidth: isSelected ? 3 : 1,
                borderColor: isSelected ? colors.primary : colors.border,
                backgroundColor: colors.card,
                overflow: 'hidden',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <Image source={char.img} style={{ width: '80%', height: '80%', resizeMode: 'contain' }} />
              </View>
              <Text style={{ 
                color: isSelected ? colors.primary : colors.text, 
                fontSize: 12, 
                fontWeight: '800',
                marginTop: 6,
                textTransform: 'capitalize'
              }}>
                {char.id}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );

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

      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
            <BackButton colors={colors} onPress={() => navigation.goBack()} />
            <Text style={styles.headerTitle}>Fidiana Mpilalao</Text>
        </View>

        <View style={{ flex: 1 }}>
            {/* Player 2 Selection (Top, Inverted) */}
            <View style={{ flex: 1, borderBottomWidth: 1, borderColor: colors.border }}>
                {renderCharacterList(p2Selection, setP2Selection, p1Selection, true)}
            </View>

            {/* Start Button in the middle */}
            <View style={{ height: 60, justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity 
                    onPress={handleStart}
                    disabled={!p1Selection || !p2Selection}
                    style={{
                        backgroundColor: (p1Selection && p2Selection) ? colors.primary : colors.surfaceSoft,
                        paddingHorizontal: 40,
                        paddingVertical: 12,
                        borderRadius: 30,
                        opacity: (p1Selection && p2Selection) ? 1 : 0.5
                    }}
                >
                    <Text style={{ color: (p1Selection && p2Selection) ? '#000' : colors.textMuted, fontWeight: '900', fontSize: 16 }}>HANOMBOKA</Text>
                </TouchableOpacity>
            </View>

            {/* Player 1 Selection (Bottom) */}
            <View style={{ flex: 1, borderTopWidth: 1, borderColor: colors.border }}>
                {renderCharacterList(p1Selection, setP1Selection, p2Selection)}
            </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default DuoSetupScreen;
