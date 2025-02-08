"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const QuestionsStatusCard = () => {
  return (
    <Card className="w-1/5">
      <CardHeader>
        <CardTitle>Questions</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-3 gap-2"></CardContent>
    </Card>
  );
};

export default QuestionsStatusCard;
