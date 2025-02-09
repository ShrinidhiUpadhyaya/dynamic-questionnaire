"use client";
import { useEffect } from "react";

const useUnsavedChanges = (shouldWarn: boolean, questionId: string) => {
  useEffect(() => {
    const clearResponses = async () => {
      if (questionId) {
        try {
          await fetch(`/api/response?questionId=${questionId}&refresh=true`, {
            method: "GET",
          });
        } catch (error) {
          console.error("Failed to clear responses:", error);
        }
      }
    };

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (shouldWarn) {
        event.preventDefault();
        event.returnValue =
          "Are you sure you want to leave? Changes may not be saved.";
        return event.returnValue;
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [shouldWarn]);
};

export default useUnsavedChanges;
