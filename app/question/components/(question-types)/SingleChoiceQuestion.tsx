import RadioButtons from "./(single-choice-question)/RadioButtons";
import DSelect from "./(single-choice-question)/DSelect";
import InvalidComponent from "../InvalidComponent";
import {
  SingleChoiceSubType,
  SingleChoiceQuestionProps,
} from "@/app/types/single-choice-types";

const SINGLE_CHOICE_QUESTION_COMPONENTS: Record<
  SingleChoiceSubType,
  React.FC<any>
> = {
  [SingleChoiceSubType.RADIO]: RadioButtons,
  [SingleChoiceSubType.SELECT]: DSelect,
};

const SUPPORTED_TYPES = Object.values(SingleChoiceSubType);

const SingleChoiceQuestion = ({
  question,
  answer,
  onChange,
}: SingleChoiceQuestionProps) => {
  const Component = SINGLE_CHOICE_QUESTION_COMPONENTS[question.sub_type];

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
      defaultValue={answer}
      onChange={onChange}
    />
  );
};

export default SingleChoiceQuestion;
