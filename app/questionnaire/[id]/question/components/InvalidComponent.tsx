import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface InvalidComponentProps {
  type: string;
  supportedTypes: string[];
  onPrevious?: () => void;
  onNext?: () => void;
}

const InvalidComponent: React.FC<InvalidComponentProps> = ({
  type,
  supportedTypes,
  onPrevious,
  onNext,
}) => {
  return (
    <Card className="w-full h-full bg-red-100 border border-red-500 text-red-700 rounded-lg">
      <CardHeader>
        <CardTitle>Error: Unsupported question type</CardTitle>
      </CardHeader>
      <CardContent>
        <p>
          The provided question type{" "}
          <strong className="text-red-600">{type}</strong> is not valid.
        </p>
        <p>
          Supported types:{" "}
          <strong>{supportedTypes.join(", ") || "None"}</strong>
        </p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          variant="outline"
          onClick={onPrevious}
          aria-label="Go to the previous question"
        >
          Previous
        </Button>
        <Button
          variant="outline"
          onClick={onNext}
          aria-label="Go to the next question"
        >
          Next
        </Button>
      </CardFooter>
    </Card>
  );
};

export default InvalidComponent;
