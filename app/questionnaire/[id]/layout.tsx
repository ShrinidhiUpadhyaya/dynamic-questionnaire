"use client";

import React from "react";

import QuestionProgress from "../components/QuestionProgress";

const QuestionsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-svh flex-col items-center space-y-16 p-16">
      <QuestionProgress />
      <div className="flex w-full flex-1 items-center justify-center">{children}</div>
    </div>
  );
};

export default QuestionsLayout;
