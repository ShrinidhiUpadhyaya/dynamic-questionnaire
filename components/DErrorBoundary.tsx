import { ErrorBoundary } from "react-error-boundary";

const DErrorBoundary = ({ children }: { children: React.ReactNode }) => {
  return (
    <ErrorBoundary
      fallback={
        <div
          role="alert"
          className="h-svh flex flex-col gap-16 items-center justify-center p-4"
        >
          <h2 className="md:text-5xl sm:text-4xl text-2xl font-bold">
            Oops, something went wrong!
          </h2>
          <button
            type="button"
            className="bg-primary text-white px-4 py-2 rounded-md w-24"
          >
            Refresh
          </button>
        </div>
      }
    >
      {children}
    </ErrorBoundary>
  );
};

export default DErrorBoundary;
