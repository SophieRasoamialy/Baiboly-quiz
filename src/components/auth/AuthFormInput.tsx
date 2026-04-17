import React from "react";
import { Text, TextInput, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface Props {
  styles: any;
  label: string;
  icon: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  maxLength?: number;
}

const AuthFormInput: React.FC<Props> = ({
  styles,
  label,
  icon,
  placeholder,
  value,
  onChangeText,
  maxLength,
}) => {
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
        />
      </View>
    </View>
  );
};

export default AuthFormInput;