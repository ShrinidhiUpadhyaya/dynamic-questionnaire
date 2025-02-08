import {
  MultipleChoiceSubType,
  MultipleChoiceQuestionType,
} from "@/app/types/multiple-choice-types";
import DCheckbox from "./(multiple-choice-question)/DCheckbox";
import InvalidComponent from "../InvalidComponent";

const MULTI_CHOICE_QUESTION_COMPONENTS: Record<
  MultipleChoiceSubType,
  React.FC<any>
> = {
  [MultipleChoiceSubType.CHECKBOX]: DCheckbox,
};

interface MultipleChoiceQuestionProps {
  question: MultipleChoiceQuestionType;
  onChange: (value: string) => void;
}

const SUPPORTED_TYPES = Object.values(MultipleChoiceSubType);

const MultipleChoiceQuestion = ({
  question,
  onChange,
}: MultipleChoiceQuestionProps) => {
  const Component = MULTI_CHOICE_QUESTION_COMPONENTS[question.sub_type];

  if (!Component) {
    return (
      <InvalidComponent
        subType={question.sub_type}
        supportedTypes={SUPPORTED_TYPES}
      />
    );
  }
  return <Component label={question.title} onChange={onChange} />;
};

export default MultipleChoiceQuestion;
