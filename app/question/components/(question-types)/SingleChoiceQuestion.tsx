import { SingleChoiceQuestionSubType } from "@/app/types/single-choice-types";
import RadioButtons from "./(single-choice-question)/RadioButtons";
import DSelect from "./(single-choice-question)/DSelect";
import { Question } from "@/app/types/question-types";

const SINGLE_CHOICE_QUESTION_COMPONENTS: Record<
  SingleChoiceQuestionSubType,
  React.FC<any>
> = {
  radio: RadioButtons,
  select: DSelect,
};

const SingleChoiceQuestion = ({
  question,
}: {
  question: Question & { sub_type: SingleChoiceQuestionSubType };
}) => {
  const Component = SINGLE_CHOICE_QUESTION_COMPONENTS[question.sub_type];

  return (
    <Component
      options={question.options}
      onChange={() => console.log("Single Choice Component Value Changed")}
    />
  );
};

export default SingleChoiceQuestion;
