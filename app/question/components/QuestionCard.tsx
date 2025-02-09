import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import SingleChoiceQuestion from "./(question-types)/SingleChoiceQuestion";
import MultipleChoiceQuestion from "./(question-types)/MultipleChoiceQuestion";
import TextQuestion from "./(question-types)/TextQuestion";
import { QuestionType, Question } from "@/app/types/question-types";
import InvalidComponent from "./InvalidComponent";
import { useQuestionContext } from "../context/question-context";
import { useCallback } from "react";
import useUnsavedChanges from "@/app/hooks/useUnsavedChanges";
import { useConditionalLogic } from "@/app/hooks/useConditionalLogic";

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

  const { showQuestion } = useConditionalLogic(currentQuestion);

  useUnsavedChanges(true, currentQuestion?.id);

  const handleChange = useCallback(
    (value: string | string[]) => {
      saveAnswer(value);
    },
    [saveAnswer]
  );

  const QuestionComponent = QUESTION_COMPONENTS[currentQuestion?.type];

  if (!QuestionComponent) {
    return (
      <InvalidComponent
        type={currentQuestion?.type}
        supportedTypes={Object.keys(QUESTION_COMPONENTS)}
      />
    );
  }

  return (
    <Card className="w-full h-full flex flex-col justify-between">
      <QuestionCardHeader title={currentQuestion?.question} />
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

const QuestionCardFooter = ({
  isFirstQuestion,
  isLastQuestion,
  goToPrevious,
  goToNext,
}: QuestionCardFooterProps) => {
  return (
    <CardFooter className="justify-between items-end h-1/4">
      {!isFirstQuestion && (
        <Button variant="outline" onClick={goToPrevious} className="w-24">
          Previous
        </Button>
      )}
      {!isLastQuestion ? (
        <Button onClick={goToNext} className="w-24">
          Next
        </Button>
      ) : (
        <Button onClick={goToNext} className="w-24">
          Submit
        </Button>
      )}
    </CardFooter>
  );
};

export default QuestionCard;
