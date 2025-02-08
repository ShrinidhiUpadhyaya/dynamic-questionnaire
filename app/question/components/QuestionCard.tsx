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

interface QuestionCardProps {
  question: Question;
  onChange: (value) => void;
  onNext: () => void;
  onPrevious: () => void;
  isFirstQuestion: boolean;
  isLastQuestion: boolean;
}

const QUESTION_COMPONENTS: Record<QuestionType, React.FC<any>> = {
  text: TextQuestion,
  single_choice: SingleChoiceQuestion,
  multiple_choice: MultipleChoiceQuestion,
};

const QuestionCard = ({
  question,
  onChange,
  onNext,
  onPrevious,
  isFirstQuestion,
  isLastQuestion,
}: QuestionCardProps) => {
  const QuestionComponent = QUESTION_COMPONENTS[question.type];

  if (!QuestionComponent) {
    console.error(`Unknown question type: ${question.type}`);
    return null;
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle> {question?.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <QuestionComponent question={question} onChange={onChange} />
      </CardContent>
      <CardFooter className="justify-between">
        {!isFirstQuestion && (
          <Button variant="outline" onClick={onPrevious} className="w-24">
            Previous
          </Button>
        )}
        {!isLastQuestion && (
          <Button onClick={onNext} className="w-24">
            Next
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default QuestionCard;
