import { Progress } from "@/components/ui/progress";
import useQuestionStore from "@/app/question/store/store";

const QuestionProgress = () => {
  const { currentQuestionIndex, totalQuestions } = useQuestionStore();

  return (
    <div className="flex items-center justify-center">
      <Progress
        value={(currentQuestionIndex / totalQuestions) * 100}
        className="h-6 w-3/4"
      />
    </div>
  );
};

export default QuestionProgress;
