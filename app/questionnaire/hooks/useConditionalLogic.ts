import { ConditionalRule, Question } from "@/types/question";
import { useEffect, useState } from "react";

import { useQuestionContext } from "../context/question-context";
import { getResponse } from "../lib/response";

export const useConditionalLogic = (question?: Question) => {
  const [shouldShow, setShouldShow] = useState(true);
  const { answer } = useQuestionContext();

  const evaluateCondition = async (condition: ConditionalRule): Promise<boolean> => {
    try {
      const previousAnswer = await getResponse(condition.questionId);

      if (!previousAnswer) {
        return false;
      }

      const { answer } = previousAnswer;

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
          if (Array.isArray(answer) && Array.isArray(condition.value)) {
            return (
              JSON.stringify(answer.sort()) === JSON.stringify((condition.value as string[]).sort())
            );
          }
          return typeof answer === "string" && typeof condition.value === "string"
            ? answer.toLowerCase() === condition.value.toLowerCase()
            : answer === condition.value;

        case "notEquals":
          if (Array.isArray(answer) && Array.isArray(condition.value)) {
            return (
              JSON.stringify(answer.sort()) !== JSON.stringify((condition.value as string[]).sort())
            );
          }
          return typeof answer === "string" && typeof condition.value === "string"
            ? answer.toLowerCase() !== condition.value.toLowerCase()
            : answer !== condition.value;

        case "contains":
          if (Array.isArray(answer)) {
            return arrayContains(answer, condition.value);
          }
          if (typeof answer === "string" && typeof condition.value === "string") {
            return answer.toLowerCase().includes(condition.value.toLowerCase());
          }
          return false;

        case "notContains":
          if (Array.isArray(answer)) {
            return !arrayContains(answer, condition.value);
          }
          if (typeof answer === "string" && typeof condition.value === "string") {
            return !answer.toLowerCase().includes(condition.value.toLowerCase());
          }
          return true;

        case "greaterThan":
          const numericAnswer = Number(answer);
          const numericValue = Number(condition.value);
          if (!isNaN(numericAnswer) && !isNaN(numericValue)) {
            return numericAnswer > numericValue;
          }
          return compareValues(answer, condition.value) > 0;

        case "lessThan":
          const numA = Number(answer);
          const numB = Number(condition.value);
          if (!isNaN(numA) && !isNaN(numB)) {
            return numA < numB;
          }
          return compareValues(answer, condition.value) < 0;

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
  }, [question, answer]);

  return shouldShow;
};
