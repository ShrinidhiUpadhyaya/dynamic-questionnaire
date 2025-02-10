import { SingleChoiceSubType } from "@/app/questionnaire/[id]/question/types/single-choice-types";
import RadioButtons from "./RadioButtons";
import DSelect from "./DSelect";
import { ComponentRegistry } from "@/app/questionnaire/[id]/question/types/component-types";
import { QuestionComponent } from "../../QuestionComponent";

const SINGLE_CHOICE_COMPONENTS: ComponentRegistry<SingleChoiceSubType> = {
  [SingleChoiceSubType.RADIO]: RadioButtons,
  [SingleChoiceSubType.SELECT]: DSelect,
};

export const SingleChoiceQuestion = QuestionComponent({
  components: SINGLE_CHOICE_COMPONENTS,
});

export default SingleChoiceQuestion;
