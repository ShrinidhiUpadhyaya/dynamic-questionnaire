"use client";

import { Button } from "@/components/ui/button";
import { ErrorBoundary } from "react-error-boundary";

const DErrorBoundary = ({ children }: { children: React.ReactNode }) => {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <ErrorBoundary
      fallback={
        <div role="alert" className="flex h-svh flex-col items-center justify-center gap-16 p-4">
          <h2 className="text-2xl font-bold sm:text-4xl md:text-5xl">
            Oops, something went wrong!
          </h2>
          <Button
            type="button"
            className="w-24 rounded-md bg-primary px-4 py-2 text-white"
            onClick={() => handleRefresh()}>
            Refresh
          </Button>
        </div>
      }>
      {children}
    </ErrorBoundary>
  );
};

export default DErrorBoundary;
