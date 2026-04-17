import React from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";

interface GameOverModalProps {
  p1: number;
  p2: number;
  onExit: () => void;
  styles: any;
}

export const GameOverModal: React.FC<GameOverModalProps> = ({
  p1,
  p2,
  onExit,
  styles,
}) => {
  const winner = p1 > p2 ? 1 : p2 > p1 ? 2 : 0;

  return (
    <Modal visible transparent animationType="fade">
      <View style={styles.gameOver}>
        <Text style={styles.gameOverTitle}>Tapitra ny lalao!</Text>
        <Text style={styles.finalScore}>
          Mpilalao 1: {p1} isa{"\n"}
          Mpilalao 2: {p2} isa{"\n\n"}
          {winner === 0
            ? "Sahala ny lalao!"
            : `Mpilalao ${winner} no mpandresy!`}
        </Text>
        <TouchableOpacity style={styles.exitBtn} onPress={onExit}>
          <Text style={styles.exitText}>HIVERINA</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};