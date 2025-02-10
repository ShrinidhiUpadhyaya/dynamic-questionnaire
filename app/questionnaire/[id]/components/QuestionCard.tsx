import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import SingleChoiceQuestion from "./(question-types)/(single-choice-question)";
import MultipleChoiceQuestion from "./(question-types)/(multiple-choice-question)";
import TextQuestion from "./(question-types)/(text-question)";
import { QuestionType } from "@/app/questionnaire/[id]/types/question-types";
import InvalidComponent from "./InvalidComponent";
import { useQuestionContext } from "../context/question-context";
import { useCallback } from "react";
import { useConditionalLogic } from "@/app/questionnaire/[id]/hooks/useConditionalLogic";
import SubmitAlert from "./SubmitAlert";
import { useRouter } from "next/navigation";
import { t } from "@/app/locales/translation";
import { useParams } from "next/navigation";
const QUESTION_COMPONENTS: Record<QuestionType, React.FC<any>> = {
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

  if (!currentQuestion) {
    return <div>No question found</div>;
  }

  const handleChange = useCallback(
    (value: string | string[]) => {
      saveAnswer(value);
    },
    [saveAnswer]
  );

  const { showQuestion } = useConditionalLogic(currentQuestion);

  const QuestionComponent = QUESTION_COMPONENTS[currentQuestion?.type];

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
        className={`${!showQuestion() && "opacity-50 pointer-events-none"}`}
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
      <CardTitle className="font-extrabold text-4xl text-primary-foreground">
        {title}
      </CardTitle>
    </CardHeader>
  );
};

type QuestionCardFooterProps = {
  isFirstQuestion: boolean;
  isLastQuestion: boolean;
  goToPrevious: () => void;
  goToNext: () => void;
};

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
