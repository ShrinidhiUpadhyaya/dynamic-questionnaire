import { ConditionalRule, Question } from "@/types/question";
import { useResponse } from "./useResponse";

export const useConditionalLogic = (question: Question) => {
  const answer = useResponse(question?.conditional?.questionId);

  if (!question) return true;

  const evaluateCondition = (rule: ConditionalRule): boolean => {
    switch (rule.operator) {
      case "equals":
        return answer === rule.value;
      case "notEquals":
        return answer !== rule.value;
      case "contains":
        return Array.isArray(answer) && Array.isArray(rule.value)
          ? rule.value.some((v) => answer.includes(v))
          : Array.isArray(answer) && answer.includes(rule.value as string);
      case "notContains":
        return Array.isArray(answer) && Array.isArray(rule.value)
          ? !rule.value.some((v) => answer.includes(v))
          : Array.isArray(answer) && !answer.includes(rule.value as string);
      case "greaterThan":
        return Number(answer) > Number(rule.value);
      case "lessThan":
        return Number(answer) < Number(rule.value);
      default:
        return true;
    }
  };

  const evaluateNestedConditions = (rule: ConditionalRule): boolean => {
    if (!rule.conditions) {
      return evaluateCondition(rule);
    }

    const results = rule.conditions.map(evaluateNestedConditions);
    return rule.logic === "or" ? results.some(Boolean) : results.every(Boolean);
  };

  const showQuestion = (): boolean => {
    if (!question.conditional) return true;
    return evaluateNestedConditions(question.conditional);
  };

  return { showQuestion };
};
