import { TextSubType } from "../types/text-types";
import { SingleChoiceSubType } from "../types/single-choice-types";
import { QuestionType, Questionnaire } from "../types/question-types";
import { MultipleChoiceSubType } from "../types/multiple-choice-types";

export const INITIAL_QUESTIONS: Questionnaire = {
  id: "compliance-questionnaire",
  title: "Organizational Compliance Assessment",
  questions: [
    {
      id: "f4c1e8b6-d39f-4b26-bb3f-91fba87a54f4",
      type: QuestionType.TEXT,
      sub_type: TextSubType.NUMBER,
      title: "Enter a number (1-10):",
      min: 1,
      max: 10,
    },
    {
      id: "96c30c3b-d478-4d01-932e-c3f5a7c975e5",
      type: QuestionType.TEXT,
      sub_type: TextSubType.SHORT_TEXT,
      title: "Enter a short text (2-10 characters):",
      minLength: 2,
      maxLength: 10,
    },
    {
      id: "ec52892e-5b2f-4f4f-8a13-519ab94b2c09",
      type: QuestionType.TEXT,
      sub_type: TextSubType.LONG_TEXT,
      title: "Enter a long text (10-100 characters):",
      minLength: 10,
      maxLength: 100,
    },
    {
      id: "d728e9f5-f8e2-4f31-94bb-3e10f31554a5",
      type: QuestionType.SINGLE_CHOICE,
      sub_type: SingleChoiceSubType.RADIO,
      title: "Select an option (radio):",
      options: [
        { id: "1", label: "Option 1", value: "option1" },
        { id: "2", label: "Option 2", value: "option2" },
        { id: "3", label: "Option 3", value: "option3" },
      ],
    },
    {
      id: "b2fe8be5-2a79-43f6-b04c-7fd4bb478cbf",
      type: QuestionType.SINGLE_CHOICE,
      sub_type: SingleChoiceSubType.SELECT,
      title: "Select an option (dropdown):",
      options: [
        { id: "1", label: "Option 1", value: "option1" },
        { id: "2", label: "Option 2", value: "option2" },
        { id: "3", label: "Option 3", value: "option3" },
      ],
    },
    {
      id: "c3d8e4f2-7a91-4a3f-9c7d-5b8a7e6f1234",
      type: QuestionType.MULTIPLE_CHOICE,
      sub_type: MultipleChoiceSubType.CHECKBOX,
      title: "Select multiple options (checkbox):",
      options: [
        { id: "1", label: "Option 1", value: "option1" },
        { id: "2", label: "Option 2", value: "option2" },
        { id: "3", label: "Option 3", value: "option3" },
      ],
    },
  ],
};
