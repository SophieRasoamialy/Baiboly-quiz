import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAppTheme } from "../../hooks/useAppTheme";

interface Props {
  styles: any;
  label: string;
  icon: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  maxLength?: number;
  secureTextEntry?: boolean;
}

function AuthFormInput({
  styles,
  label,
  icon,
  placeholder,
  value,
  onChangeText,
  maxLength,
  secureTextEntry,
}: Props) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const isSecureField = !!secureTextEntry;
  const { colors } = useAppTheme();

  return (
    <View>
      <Text style={styles.sectionLabel}>{label}</Text>

      <View style={styles.inputWrapper}>
        <MaterialCommunityIcons
          name={icon as any}
          size={20}
          color="rgba(255,255,255,0.35)"
          style={styles.inputIcon}
        />

        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="rgba(255,255,255,0.35)"
          value={value}
          onChangeText={onChangeText}
          maxLength={maxLength}
          autoCorrect={false}
          secureTextEntry={isSecureField && !isPasswordVisible}
        />

        {isSecureField && (
          <TouchableOpacity
            onPress={() => setIsPasswordVisible((prev) => !prev)}
            activeOpacity={0.7}
          >
            <MaterialCommunityIcons
              name={isPasswordVisible ? "eye-off-outline" : "eye-outline"}
              size={20}
              color={colors.textSecondary}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default AuthFormInput;
