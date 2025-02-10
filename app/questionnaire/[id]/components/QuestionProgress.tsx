import { Progress } from "@/components/ui/progress";
import useQuestionStore from "@/app/questionnaire/[id]/store/store";

const QuestionProgress = () => {
  const { currentQuestionIndex, totalQuestions } = useQuestionStore();

  return (
    <Progress
      value={(currentQuestionIndex / totalQuestions) * 100}
      className="h-6 w-full md:w-3/4"
    />
  );
};

export default QuestionProgress;
