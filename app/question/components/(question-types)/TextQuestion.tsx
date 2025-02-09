import ShortText from "./(text-question)/ShortText";
import LongText from "./(text-question)/LongText";
import Number from "./(text-question)/Number";
import InvalidComponent from "../InvalidComponent";
import { TextSubType, type TextQuestion } from "@/app/types/text-types";

const TEXT_QUESTION_COMPONENTS: Record<TextSubType, React.FC<any>> = {
  [TextSubType.SHORT_TEXT]: ShortText,
  [TextSubType.LONG_TEXT]: LongText,
  [TextSubType.NUMBER]: Number,
};

const SUPPORTED_TYPES = Object.values(TextSubType);

interface TextQuestionProps {
  question: TextQuestion;
  onChange: (value: string) => void;
}

const TextQuestion = ({ question, onChange }: TextQuestionProps) => {
  const Component = TEXT_QUESTION_COMPONENTS[question.sub_type];

  if (!Component) {
    return (
      <InvalidComponent
        type={question.sub_type}
        supportedTypes={SUPPORTED_TYPES}
      />
    );
  }

  return <Component onChange={onChange} />;
};

export default TextQuestion;
