import React from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";

interface GameOverModalProps {
  p1: number;
  p2: number;
  p1Name?: string;
  p2Name?: string;
  onExit: () => void;
  styles: any;
  colors: any;
}

export const GameOverModal: React.FC<GameOverModalProps> = ({
  p1,
  p2,
  p1Name = "Mpilalao 1",
  p2Name = "Mpilalao 2",
  onExit,
  styles,
  colors,
}) => {
  const winner = p1 > p2 ? 1 : p2 > p1 ? 2 : 0;
  const winnerName = winner === 1 ? p1Name : p2Name;

  return (
    <Modal visible transparent animationType="fade">
      <View style={styles.gameOver}>
        <Text style={styles.gameOverTitle}>Tapitra ny lalao!</Text>
        
        {winner !== 0 && (
          <Text style={styles.winnerName}>{winnerName} NO MPANDRESY! 🏆</Text>
        )}

        <Text style={styles.finalScore}>
          {p1Name}: {p1} isa{"\n"}
          {p2Name}: {p2} isa{"\n\n"}
          {winner === 0
            ? "Sahala ny lalao!"
            : `Tena nahay i ${winnerName}!`}
        </Text>
        <TouchableOpacity style={styles.exitBtn} onPress={onExit}>
          <Text style={styles.exitText}>HIVERINA</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};