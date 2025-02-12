import { ComponentRegistry } from "@/types/components";
import { SingleChoiceSubType } from "@/types/question";

import { QuestionComponent } from "../../QuestionComponent";
import CustomSelect from "./CustomSelect";
import RadioButtons from "./RadioButtons";

const SINGLE_CHOICE_COMPONENTS: ComponentRegistry<SingleChoiceSubType> = {
  [SingleChoiceSubType.RADIO]: RadioButtons,
  [SingleChoiceSubType.SELECT]: CustomSelect,
};

export const SingleChoiceQuestion = QuestionComponent({
  components: SINGLE_CHOICE_COMPONENTS,
});

export default SingleChoiceQuestion;
