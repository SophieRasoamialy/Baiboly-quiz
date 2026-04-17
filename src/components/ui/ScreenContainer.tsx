import React from 'react';
import { View } from 'react-native';

interface ScreenContainerProps {
  children: React.ReactNode;
}

export default function ScreenContainer({ children }: ScreenContainerProps) {
  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: '#0f172a' }}>
      {children}
    </View>
  );
}