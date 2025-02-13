import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";

import { QuestionCardFooter } from "./QuestionCard";

interface InvalidComponentProps {
  type: string;
  supportedTypes: string[];
  isFirstQuestion?: boolean;
  isLastQuestion?: boolean;
  onPrevious?: () => void;
  onNext?: () => void;
}

const InvalidComponent = ({
  type,
  supportedTypes,
  isFirstQuestion,
  isLastQuestion,
  onPrevious,
  onNext,
}: InvalidComponentProps) => {
  const [showDetails, setShowDetails] = useState(false);
  return (
    <Card className="flex h-full w-full flex-col justify-between rounded-lg border border-red-500 bg-red-100 text-red-700">
      <CardContent>
        <p className="text-2xl">
          Oops, something went wrong!
          <Button
            variant="link"
            className="text-primary-foreground"
            onClick={() => setShowDetails(!showDetails)}>
            {showDetails ? "Hide Details" : "Show Details"}
          </Button>
        </p>

        {showDetails && (
          <>
            <p>Error: Unsupported question type</p>
            <p>
              The provided question type <strong className="text-red-600">{type}</strong> is not
              valid.
            </p>
            <p>
              Supported types: <strong>{supportedTypes.join(", ") || "None"}</strong>
            </p>
          </>
        )}
      </CardContent>
      <QuestionCardFooter
        isFirstQuestion={isFirstQuestion}
        isLastQuestion={isLastQuestion}
        goToPrevious={onPrevious || (() => {})}
        goToNext={onNext || (() => {})}
      />
    </Card>
  );
};

export default InvalidComponent;
