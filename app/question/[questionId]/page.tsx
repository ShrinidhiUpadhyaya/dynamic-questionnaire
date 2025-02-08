"use client";

import React from "react";
import QuestionCard from "../components/QuestionCard";
import { Question } from "@/app/types/question-types";

const PlaceHolderQuestion: Question = {
  id: "1",
  title: "Place Holder Question",
  type: "text",
};

const QuestionPage = () => {
  const handleNext = () => {
    console.log("Next");
  };

  const handlePrevious = () => {
    console.log("Previous");
  };

  return (
    <div className="flex-1">
      <QuestionCard
        question={PlaceHolderQuestion}
        onNext={handleNext}
        onPrevious={handlePrevious}
      />
    </div>
  );
};

export default QuestionPage;
