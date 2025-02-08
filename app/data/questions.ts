import { TextSubType } from "../types/text-types";
import { SingleChoiceSubType } from "../types/single-choice-types";
import { QuestionType, Questionnaire } from "../types/question-types";

export const INITIAL_QUESTIONS: Questionnaire = {
  id: "compliance-questionnaire",
  title: "Organizational Compliance Assessment",
  questions: [
    {
      id: "f4c1e8b6-d39f-4b26-bb3f-91fba87a54f4",
      type: QuestionType.TEXT,
      sub_type: TextSubType.NUMBER,
      title: "1?",
      min: 1,
      max: 10,
    },
    {
      id: "96c30c3b-d478-4d01-932e-c3f5a7c975e5",
      type: QuestionType.TEXT,
      sub_type: TextSubType.SHORT_TEXT,
      title: "short text?",
      minLength: 2,
      maxLength: 10,
    },
    {
      id: "ec52892e-5b2f-4f4f-8a13-519ab94b2c09",
      type: QuestionType.TEXT,
      sub_type: TextSubType.LONG_TEXT,
      title: "long text?",
      minLength: 10,
      maxLength: 100,
    },
    {
      id: "d728e9f5-f8e2-4f31-94bb-3e10f31554a5",
      type: QuestionType.SINGLE_CHOICE,
      sub_type: SingleChoiceSubType.RADIO,
      title: "radio?",
      options: [
        {
          id: "1",
          label: "Option 1",
          value: "option1",
        },
        {
          id: "2",
          label: "Option 2",
          value: "option2",
        },
        {
          id: "3",
          label: "Option 3",
          value: "option3",
        },
      ],
    },
    {
      id: "b2fe8be5-2a79-43f6-b04c-7fd4bb478cbf",
      type: QuestionType.SINGLE_CHOICE,
      sub_type: SingleChoiceSubType.CHECKBOX,
      title: "checkbox?",
      options: [
        {
          id: "1",
          label: "Option 1",
          value: "option1",
        },
        {
          id: "2",
          label: "Option 2",
          value: "option2",
        },
        {
          id: "3",
          label: "Option 3",
          value: "option3",
        },
      ],
    },
  ],
};
