import { t } from "@/app/locales/translation";
import { useConditionalLogic } from "@/app/questionnaire/hooks/useConditionalLogic";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { QuestionType } from "@/types/question";
import { useParams, useRouter } from "next/navigation";
import { useCallback } from "react";
import { useQuestionContext } from "../context/question-context";
import MultipleChoiceQuestion from "./(question-types)/(multiple-choice-question)";
import SingleChoiceQuestion from "./(question-types)/(single-choice-question)";
import TextQuestion from "./(question-types)/(text-question)";
import InvalidComponent from "./InvalidComponent";
import SubmitAlert from "./SubmitAlert";

const QUESTION_COMPONENTS: Record<
  QuestionType,
  | typeof TextQuestion
  | typeof SingleChoiceQuestion
  | typeof MultipleChoiceQuestion
> = {
  text: TextQuestion,
  single_choice: SingleChoiceQuestion,
  multiple_choice: MultipleChoiceQuestion,
};

const QuestionCard = () => {
  const {
    currentQuestion,
    answer,
    saveAnswer,
    goToNext,
    goToPrevious,
    isFirstQuestion,
    isLastQuestion,
  } = useQuestionContext();

  const handleChange = useCallback(
    (value: string | string[]) => {
      saveAnswer(value);
    },
    [saveAnswer]
  );

  const showQuestion = useConditionalLogic(currentQuestion);

  const QuestionComponent = QUESTION_COMPONENTS[currentQuestion?.type];

  if (!currentQuestion) {
    return <div>No question found</div>;
  }

  if (!QuestionComponent) {
    return (
      <InvalidComponent
        type={currentQuestion?.type}
        supportedTypes={Object.keys(QUESTION_COMPONENTS)}
        isFirstQuestion={isFirstQuestion}
        isLastQuestion={isLastQuestion}
        onPrevious={goToPrevious}
        onNext={goToNext}
      />
    );
  }

  return (
    <Card className="w-full h-full flex flex-col justify-between">
      <QuestionCardHeader title={currentQuestion.question} />
      <CardContent
        className={`${!showQuestion && "opacity-50 pointer-events-none"}`}
      >
        <QuestionComponent
          question={currentQuestion}
          answer={answer}
          onChange={handleChange}
        />
      </CardContent>
      <QuestionCardFooter
        isFirstQuestion={isFirstQuestion}
        isLastQuestion={isLastQuestion}
        goToPrevious={goToPrevious}
        goToNext={goToNext}
      />
    </Card>
  );
};

type QuestionCardHeaderProps = {
  title: string;
};

const QuestionCardHeader = ({ title }: QuestionCardHeaderProps) => {
  return (
    <CardHeader className="h-1/4">
      <CardTitle className="font-extrabold text-3xl text-primary-foreground">
        {title}
      </CardTitle>
    </CardHeader>
  );
};

interface QuestionCardFooterProps {
  isFirstQuestion?: boolean;
  isLastQuestion?: boolean;
  goToPrevious?: () => void;
  goToNext?: () => void;
}

export const QuestionCardFooter = ({
  isFirstQuestion,
  isLastQuestion,
  goToPrevious,
  goToNext,
}: QuestionCardFooterProps) => {
  const { id } = useParams();
  const router = useRouter();

  const handleSubmit = () => {
    router.push(`/answers/${id}`);
  };

  return (
    <CardFooter
      className={`justify-between items-end h-1/4 ${
        isFirstQuestion && "justify-end"
      }`}
    >
      {!isFirstQuestion && (
        <Button variant="outline" onClick={goToPrevious} className="w-24">
          {t("previous")}
        </Button>
      )}
      {!isLastQuestion ? (
        <Button onClick={goToNext} className="w-24">
          {t("next")}
        </Button>
      ) : (
        <SubmitAlert onSubmit={handleSubmit} />
      )}
    </CardFooter>
  );
};

export default QuestionCard;
