import RadioButtons from "./(single-choice-question)/RadioButtons";
import DSelect from "./(single-choice-question)/DSelect";
import { SingleChoiceQuestionType } from "@/app/types/single-choice-types";
import InvalidComponent from "../InvalidComponent";
import { SingleChoiceSubType } from "@/app/types/single-choice-types";

const SINGLE_CHOICE_QUESTION_COMPONENTS: Record<
  SingleChoiceSubType,
  React.FC<any>
> = {
  [SingleChoiceSubType.RADIO]: RadioButtons,
  [SingleChoiceSubType.SELECT]: DSelect,
};

interface SingleChoiceQuestionProps {
  question: SingleChoiceQuestionType;
  onChange: (value: string) => void;
}

const SUPPORTED_TYPES = Object.values(SingleChoiceSubType);

const SingleChoiceQuestion = ({
  question,
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

  return <Component options={question.options} onChange={onChange} />;
};

export default SingleChoiceQuestion;
