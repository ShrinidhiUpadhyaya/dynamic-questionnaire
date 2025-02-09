"use client";

import React from "react";
import QuestionCard from "./components/QuestionCard";
import QuestionLoadingCard from "./components/QuestionLoadingCard";
import {
  QuestionProvider,
  useQuestionContext,
} from "./context/question-context";

const QuestionPage = () => {
  return (
    // <ErrorBoundary fallback={<ErrorFallback />}>
    <QuestionProvider>
      <QuestionPageContent />
    </QuestionProvider>
    // </ErrorBoundary>
  );
};

const QuestionPageContent: React.FC = () => {
  const { isLoading, error } = useQuestionContext();

  if (isLoading) {
    return <QuestionLoadingCard />;
  }

  // if (error || !currentQuestion) {
  //   return <QuestionError error={error} />;
  // }

  return (
    <div className="flex-1">
      <QuestionCard />
    </div>
  );
};

export default QuestionPage;
