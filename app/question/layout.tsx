"use client";

import React from "react";
import QuestionProgress from "./components/QuestionProgress";

const QuestionsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-svh flex flex-col p-16 space-y-16">
      <QuestionProgress />
      <div className="flex-1 w-full">{children}</div>
    </div>
  );
};

export default QuestionsLayout;
