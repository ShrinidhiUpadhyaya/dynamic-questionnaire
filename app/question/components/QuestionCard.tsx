import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";

import { Question } from "@/app/types/question-types";

interface QuestionCardProps {
  question: Question;
  onNext: () => void;
  onPrevious: () => void;
}

const QuestionCard = ({ question, onNext, onPrevious }: QuestionCardProps) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle> {question?.title}</CardTitle>
      </CardHeader>
      <CardContent>{question.type}</CardContent>
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
