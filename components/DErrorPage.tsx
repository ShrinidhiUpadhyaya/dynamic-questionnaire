import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { CustomError } from "@/types/common";

import DErrorMessage from "./DErrorMessage";
import { Button } from "./ui/button";

interface DErrorPageProps {
  error: CustomError;
  className?: string;
}
const DErrorPage = ({ error, className }: DErrorPageProps) => {
  return (
    <div className={cn("flex w-svw flex-col items-center justify-center", className)}>
      <Label className="text-center text-7xl">{error?.status}</Label>
      <DErrorMessage message={error?.message} />
      <Button className="mt-8" onClick={() => window.location.reload()}>
        Refresh
      </Button>
    </div>
  );
};

export default DErrorPage;
