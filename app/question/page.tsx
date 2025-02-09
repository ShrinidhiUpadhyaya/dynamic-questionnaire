"use client";

import React from "react";
import QuestionCard from "./components/QuestionCard";
import { useResponse } from "@/app/hooks/useResponse";
import { useQuestion } from "@/app/hooks/useQuestion";
import QuestionLoadingCard from "./components/QuestionLoadingCard";

const QuestionPage = () => {
  const {
    currentQuestion,
    isLoading,
    error,
    goToNextQuestion,
    goToPreviousQuestion,
    isFirstQuestion,
    isLastQuestion,
  } = useQuestion();

  const { answers, saveAnswers } = useResponse();

  if (isLoading) {
    return <QuestionLoadingCard />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handleNext = () => {
    console.log("Next");
    goToNextQuestion();
  };

  const handlePrevious = () => {
    console.log("Previous");
    goToPreviousQuestion();
  };

  const handleChange = (value) => {
    console.log("Value changed:", value);
    saveAnswers({
      questionId: currentQuestion?.id,
      value: value,
    });
  };

  return (
    <div className="flex-1">
      <QuestionCard
        question={currentQuestion}
        onChange={handleChange}
        onNext={handleNext}
        onPrevious={handlePrevious}
        isFirstQuestion={isFirstQuestion}
        isLastQuestion={isLastQuestion}
      />
    </div>
  );
};

export default QuestionPage;
