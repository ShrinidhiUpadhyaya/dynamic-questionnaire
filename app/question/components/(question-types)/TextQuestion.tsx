import ShortText from "./(text-question)/ShortText";
import LongText from "./(text-question)/LongText";
import Number from "./(text-question)/Number";
import { TextQuestionSubType } from "@/app/types/question-types";
import type { Question } from "@/app/types/question-types";

const TEXT_QUESTION_COMPONENTS: Record<TextQuestionSubType, React.FC<any>> = {
  shortText: ShortText,
  longText: LongText,
  number: Number,
};

const TextQuestion = ({
  question,
}: {
  question: Question & { sub_type: TextQuestionSubType };
}) => {
  const Component = TEXT_QUESTION_COMPONENTS[question.sub_type];

  return (
    <Component onChange={() => console.log("Text Component Value Changed")} />
  );
};

export default TextQuestion;
