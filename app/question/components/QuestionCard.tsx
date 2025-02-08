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
import DateTimeQuestion from "./(question-types)/DateTimeQuestion";
import RatingsAndScaleQuestion from "./(question-types)/RatingsAndScaleQuestion";
import TextQuestion from "./(question-types)/TextQuestion";
import { QuestionType, Question } from "@/app/types/question-types";

interface QuestionCardProps {
  question: Question;
  onNext: () => void;
  onPrevious: () => void;
}

const QUESTION_COMPONENTS: Record<QuestionType, React.FC<any>> = {
  text: TextQuestion,
  single_choice: SingleChoiceQuestion,
  multiple_choice: MultipleChoiceQuestion,
  date_time: DateTimeQuestion,
  ratings: RatingsAndScaleQuestion,
};

const QuestionCard = ({ question, onNext, onPrevious }: QuestionCardProps) => {
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
        <QuestionComponent />
      </CardContent>
      <CardFooter className="justify-between">
        <Button variant="outline" onClick={onPrevious} className="w-24">
          Previous
        </Button>
        <Button onClick={onNext} className="w-24">
          Next
        </Button>
      </CardFooter>
    </Card>
  );
};

export default QuestionCard;
