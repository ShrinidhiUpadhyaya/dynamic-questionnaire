"use client";

import React from "react";
import QuestionProgress from "./components/QuestionProgress";

const QuestionsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-svh flex flex-col items-center p-16 space-y-16">
      <QuestionProgress />
      <div className="flex flex-1 justify-center items-center w-full">
        {children}
      </div>
    </div>
  );
};

export default QuestionsLayout;
