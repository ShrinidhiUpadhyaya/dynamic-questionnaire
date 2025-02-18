import { ConditionalRule, Question, UserResponse } from "@/types/common";
import { useEffect, useState } from "react";

import { getResponse } from "../lib/response";

export const useConditionalLogic = (question: Question, response: UserResponse) => {
  const [shouldShow, setShouldShow] = useState(true);

  const evaluateCondition = async (condition: ConditionalRule): Promise<boolean> => {
    try {
      const previousResponse = await getResponse(condition.questionId);

      if (!previousResponse) {
        return false;
      }

      const { response } = previousResponse;

      const compareValues = (a: any, b: any): number => {
        if (a == null || b == null) {
          return 0;
        }

        const valueA = typeof a === "string" ? a.toLowerCase() : a;
        const valueB = typeof b === "string" ? b.toLowerCase() : b;

        if (valueA < valueB) return -1;
        if (valueA > valueB) return 1;
        return 0;
      };

      const arrayContains = (arr: any[], value: any): boolean => {
        if (!Array.isArray(arr)) return false;
        return arr.some((item) =>
          typeof item === "string" && typeof value === "string"
            ? item.toLowerCase() === value.toLowerCase()
            : item === value,
        );
      };

      switch (condition.operator) {
        case "equals":
          if (Array.isArray(response) && Array.isArray(condition.value)) {
            return (
              JSON.stringify(response.sort()) ===
              JSON.stringify((condition.value as string[]).sort())
            );
          }
          return typeof response === "string" && typeof condition.value === "string"
            ? response.toLowerCase() === condition.value.toLowerCase()
            : response === condition.value;

        case "notEquals":
          if (Array.isArray(response) && Array.isArray(condition.value)) {
            return (
              JSON.stringify(response.sort()) !==
              JSON.stringify((condition.value as string[]).sort())
            );
          }
          return typeof response === "string" && typeof condition.value === "string"
            ? response.toLowerCase() !== condition.value.toLowerCase()
            : response !== condition.value;

        case "contains":
          if (Array.isArray(response)) {
            return arrayContains(response, condition.value);
          }
          if (typeof response === "string" && typeof condition.value === "string") {
            return response.toLowerCase().includes(condition.value.toLowerCase());
          }
          return false;

        case "notContains":
          if (Array.isArray(response)) {
            return !arrayContains(response, condition.value);
          }
          if (typeof response === "string" && typeof condition.value === "string") {
            return !response.toLowerCase().includes(condition.value.toLowerCase());
          }
          return true;

        case "greaterThan":
          const numericResponse = Number(response);
          const numericValue = Number(condition.value);
          if (!isNaN(numericResponse) && !isNaN(numericValue)) {
            return numericResponse > numericValue;
          }
          return compareValues(response, condition.value) > 0;

        case "lessThan":
          const numA = Number(response);
          const numB = Number(condition.value);
          if (!isNaN(numA) && !isNaN(numB)) {
            return numA < numB;
          }
          return compareValues(response, condition.value) < 0;

        default:
          console.warn(`Unsupported operator: ${condition.operator}`);
          return false;
      }
    } catch (error) {
      console.error("Error evaluating condition:", error);
      return false;
    }
  };

  useEffect(() => {
    const evaluateShowQuestion = async () => {
      if (!question || !question.conditional) {
        setShouldShow(true);
        return;
      }

      try {
        if (Array.isArray(question.conditional)) {
          const results = await Promise.all(
            question.conditional.map((condition) => evaluateCondition(condition)),
          );

          setShouldShow(results.every((result) => result));
        } else {
          const result = await evaluateCondition(question.conditional);
          setShouldShow(result);
        }
      } catch (error) {
        console.error("Error in show question evaluation:", error);
        setShouldShow(false);
      }
    };

    evaluateShowQuestion();
  }, [question, response]);

  return shouldShow;
};
