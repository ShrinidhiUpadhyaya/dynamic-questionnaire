import { t } from "@/app/locales/translation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { QuestionTypeValues } from "@/types/common";
import { useParams, useRouter } from "next/navigation";
import { useCallback } from "react";

import { useQuestionContext } from "../context/question-context";
import InvalidComponent from "./InvalidComponent";
import SubmitAlert from "./SubmitAlert";
import MultipleChoiceQuestion from "./question-types/multiple-choice-question";
import SingleChoiceQuestion from "./question-types/single-choice-question";
import TextQuestion from "./question-types/text-question";

const QUESTION_COMPONENTS: Record<QuestionTypeValues, React.FC<any>> = {
  text: TextQuestion,
  single_choice: SingleChoiceQuestion,
  multiple_choice: MultipleChoiceQuestion,
};

const QuestionCard = () => {
  const {
    currentQuestion,
    response,
    showQuestion,
    saveResponse,
    goToNext,
    goToPrevious,
    isFirstQuestion,
    isLastQuestion,
  } = useQuestionContext();

  const handleChange = useCallback(
    (value: string | string[]) => {
      if (saveResponse) {
        saveResponse(value);
      }
    },
    [saveResponse],
  );

  const QuestionComponent = QUESTION_COMPONENTS[currentQuestion.type];

  if (!currentQuestion) {
    return <div>No question found</div>;
  }

  if (!QuestionComponent) {
    return (
      <InvalidComponent
        type={currentQuestion?.type}
        supportedTypes={Object.keys(QUESTION_COMPONENTS)}
        isFirstQuestion={isFirstQuestion}
        isLastQuestion={isLastQuestion}
        onPrevious={goToPrevious}
        onNext={goToNext}
      />
    );
  }

  return (
    <Card className="flex h-full w-full flex-col justify-between">
      <QuestionCardHeader title={currentQuestion.question} />
      <CardContent className={`${!showQuestion && "pointer-events-none opacity-50"}`}>
        <QuestionComponent question={currentQuestion} response={response} onChange={handleChange} />
      </CardContent>
      <QuestionCardFooter
        isFirstQuestion={isFirstQuestion}
        isLastQuestion={isLastQuestion}
        goToPrevious={goToPrevious}
        goToNext={goToNext}
      />
    </Card>
  );
};

type QuestionCardHeaderProps = {
  title: string;
};

const QuestionCardHeader = ({ title }: QuestionCardHeaderProps) => {
  return (
    <CardHeader className="h-1/4">
      <CardTitle className="text-2xl font-extrabold text-primary-foreground sm:text-3xl">
        {title}
      </CardTitle>
    </CardHeader>
  );
};

interface QuestionCardFooterProps {
  isFirstQuestion?: boolean;
  isLastQuestion?: boolean;
  goToPrevious?: () => void;
  goToNext?: () => void;
}

export const QuestionCardFooter = ({
  isFirstQuestion,
  isLastQuestion,
  goToPrevious,
  goToNext,
}: QuestionCardFooterProps) => {
  const { id } = useParams();
  const router = useRouter();

  const handleSubmit = () => {
    router.push(`/response/${id}`);
  };

  return (
    <CardFooter className={`h-1/4 items-end justify-between ${isFirstQuestion && "justify-end"}`}>
      {!isFirstQuestion && (
        <Button variant="outline" onClick={goToPrevious} className="w-24">
          {t("previous")}
        </Button>
      )}
      {!isLastQuestion ? (
        <Button onClick={goToNext} className="w-24">
          {t("next")}
        </Button>
      ) : (
        <SubmitAlert onSubmit={handleSubmit} />
      )}
    </CardFooter>
  );
};

export default QuestionCard;
