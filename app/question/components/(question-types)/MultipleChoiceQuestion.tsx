import {
  MultipleChoiceSubType,
  MultipleChoiceQuestionType,
} from "@/app/types/multiple-choice-types";
import DCheckbox from "./(multiple-choice-question)/DCheckbox";
import InvalidComponent from "../InvalidComponent";
import { MultipleChoiceQuestionProps } from "@/app/types/multiple-choice-types";
const MULTI_CHOICE_QUESTION_COMPONENTS: Record<
  MultipleChoiceSubType,
  React.FC<any>
> = {
  [MultipleChoiceSubType.CHECKBOX]: DCheckbox,
};

const SUPPORTED_TYPES = Object.values(MultipleChoiceSubType);

const MultipleChoiceQuestion = ({
  question,
  answer,
  onChange,
}: MultipleChoiceQuestionProps) => {
  const Component = MULTI_CHOICE_QUESTION_COMPONENTS[question.sub_type];

  if (!Component) {
    return (
      <InvalidComponent
        type={question.sub_type}
        supportedTypes={SUPPORTED_TYPES}
      />
    );
  }
  return (
    <Component
      options={question.options}
      defaultValues={answer}
      onChange={onChange}
    />
  );
};

export default MultipleChoiceQuestion;
