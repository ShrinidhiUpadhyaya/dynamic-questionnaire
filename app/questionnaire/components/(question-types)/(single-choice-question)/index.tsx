import { ComponentRegistry } from "@/types/components";
import { SingleChoiceSubType } from "@/types/question";
import { QuestionComponent } from "../../QuestionComponent";
import DSelect from "./DSelect";
import RadioButtons from "./RadioButtons";

const SINGLE_CHOICE_COMPONENTS: ComponentRegistry<SingleChoiceSubType> = {
  [SingleChoiceSubType.RADIO]: RadioButtons,
  [SingleChoiceSubType.SELECT]: DSelect,
};

export const SingleChoiceQuestion = QuestionComponent({
  components: SINGLE_CHOICE_COMPONENTS,
});

export default SingleChoiceQuestion;
