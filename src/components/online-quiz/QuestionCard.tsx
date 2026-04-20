import { View, Text, Image } from "react-native";

interface QuestionCardProps {
  questionIndex: number;
  totalQuestions: number;
  questionText: string;
  questionImage?: any;
  styles: any;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  questionIndex,
  totalQuestions,
  questionText,
  questionImage,
  styles,
}) => {
  return (
    <View style={styles.questionCard}>
      <Text style={styles.questionCounter}>
        FANONTANIANA {questionIndex + 1} / {totalQuestions}
      </Text>
      {questionImage && (
        <View style={styles.questionImageContainer}>
          <Image source={questionImage} style={styles.questionImage} resizeMode="contain" />
        </View>
      )}
      <Text style={styles.questionText}>
        {questionText}
      </Text>
    </View>
  );
};
