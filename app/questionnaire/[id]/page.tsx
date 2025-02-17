"use client";

import DErrorPage from "@/components/DErrorPage";
import { CustomError } from "@/types/common";
import { notFound } from "next/navigation";

import QuestionCard from "../components/QuestionCard";
import QuestionLoadingCard from "../components/QuestionLoadingCard";
import { QuestionProvider, useQuestionContext } from "../context/question-context";

const QuestionPage = () => {
  return (
    <QuestionProvider>
      <QuestionPageContent />
    </QuestionProvider>
  );
};

const QuestionPageContent = () => {
  const { isLoading, error, errorStatus, currentQuestion } = useQuestionContext();

  if (isLoading) {
    return <QuestionLoadingCard />;
  }

  if (errorStatus === 404) {
    return notFound();
  }

  if (error || !currentQuestion) {
    return <DErrorPage error={error as CustomError} />;
  }

  return (
    <div className="h-full w-full md:w-3/4">
      <QuestionCard />
    </div>
  );
};

export default QuestionPage;
