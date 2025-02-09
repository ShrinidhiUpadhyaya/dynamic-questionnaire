import { Progress } from "@/components/ui/progress";
import useQuestionStore from "@/app/store/store";
const QuestionProgress = () => {
  const { currentQuestionIndex, totalQuestions } = useQuestionStore();

  return (
    <div className="flex items-center justify-between">
      <Progress
        value={(currentQuestionIndex / totalQuestions) * 100}
        className="h-6"
      />
    </div>
  );
};

export default QuestionProgress;
