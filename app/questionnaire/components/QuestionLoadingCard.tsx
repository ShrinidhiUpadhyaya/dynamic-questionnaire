import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const QuestionLoadingCard = () => {
  return (
    <Card className="w-full" data-testid="question-loading-card">
      <CardHeaderSkeleton />
      <CardContentSkeleton />
      <CardFooterSkeleton />
    </Card>
  );
};

const CardHeaderSkeleton = () => {
  return (
    <CardHeader>
      <Skeleton className="h-10 w-full" />
    </CardHeader>
  );
};

const CardContentSkeleton = () => {
  return (
    <CardContent>
      <div className="flex flex-col items-center justify-center space-y-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} className="h-10 w-full" />
        ))}
      </div>
    </CardContent>
  );
};

const CardFooterSkeleton = () => {
  return (
    <CardFooter className="justify-between">
      {Array.from({ length: 2 }).map((_, index) => (
        <Skeleton key={index} className="h-10 w-24" />
      ))}
    </CardFooter>
  );
};

export default QuestionLoadingCard;
