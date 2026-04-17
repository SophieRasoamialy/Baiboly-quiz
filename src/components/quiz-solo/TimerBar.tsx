import React from "react";
import { View, Text } from "react-native";

interface Props {
  time: number;
  totalTime: number;
  styles: any;
  colors: any;
}

const TimerBar: React.FC<Props> = ({ time, totalTime, styles, colors }) => {
  const percentage = Math.max(0, Math.min(100, (time / totalTime) * 100));
  
  let timerColor = colors.secondary;
  if (time <= 5) timerColor = colors.accent;
  else if (time <= 10) timerColor = colors.primary;

  return (
    <View style={styles.timerWrap}>
      <View style={styles.timerTrack}>
        <View 
          style={[
            styles.timerFill, 
            { width: `${percentage}%`, backgroundColor: timerColor }
          ]} 
        />
      </View>
      <Text style={styles.timerLabel}>{time} segaondra</Text>
    </View>
  );
};

export default TimerBar;