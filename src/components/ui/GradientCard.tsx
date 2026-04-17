import { LinearGradient } from 'expo-linear-gradient';
import { TouchableOpacity, Text, View } from 'react-native';

interface GradientCardProps {
  title: string;
  subtitle: string;
  colors: readonly [string, string, ...string[]];
  onPress: () => void;
}

export default function GradientCard({
  title,
  subtitle,
  colors,
  onPress,
}: GradientCardProps) {
  return (
    <TouchableOpacity onPress={onPress} style={{ marginBottom: 12 }}>
      <LinearGradient
        colors={colors}
        style={{
          padding: 16,
          borderRadius: 16,
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#fff' }}>
          {title}
        </Text>
        <Text style={{ color: '#eee' }}>{subtitle}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}