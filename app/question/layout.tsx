import React from "react";
import QuestionsStatusCard from "./components/QuestionsStatusCard";
import TimerCard from "./components/TimerCard";

const QuestionsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <div className="flex gap-16 h-full">
        <QuestionsStatusCard />
        {children}
        <TimerCard />
      </div>
    </div>
  );
};

export default QuestionsLayout;
