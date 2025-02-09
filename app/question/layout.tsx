import React from "react";
import { Progress } from "@/components/ui/progress";

const QuestionsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-svh flex flex-col p-16 space-y-16">
      <div>
        <Progress value={50} className="h-6" />
      </div>
      <div className="flex-1 w-full">{children}</div>
    </div>
  );
};

export default QuestionsLayout;
