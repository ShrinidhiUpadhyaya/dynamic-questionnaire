"use client";

import React from "react";
import QuestionCard from "../components/QuestionCard";
import QuestionLoadingCard from "../components/QuestionLoadingCard";
import {
  QuestionProvider,
  useQuestionContext,
} from "../context/question-context";
const QuestionPage = () => {
  return (
    <QuestionProvider>
      <QuestionPageContent />
    </QuestionProvider>
  );
};

const QuestionPageContent = () => {
  const { isLoading, error, currentQuestion } = useQuestionContext();

  if (isLoading) {
    return <QuestionLoadingCard />;
  }

  if (error || !currentQuestion) {
    return <p>Error: {error?.message}</p>;
  }

  return (
    <div className="h-full sm:h-3/4 md:w-3/4 lg:w-1/2 w-full">
      <QuestionCard />
    </div>
  );
};

export default QuestionPage;
