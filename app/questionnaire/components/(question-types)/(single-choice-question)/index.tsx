import { SingleChoiceSubType } from "@/types/question";
import RadioButtons from "./RadioButtons";
import DSelect from "./DSelect";
import { ComponentRegistry } from "@/types/components";
import { QuestionComponent } from "../../QuestionComponent";

const SINGLE_CHOICE_COMPONENTS: ComponentRegistry<SingleChoiceSubType> = {
  [SingleChoiceSubType.RADIO]: RadioButtons,
  [SingleChoiceSubType.SELECT]: DSelect,
};

export const SingleChoiceQuestion = QuestionComponent({
  components: SINGLE_CHOICE_COMPONENTS,
});

export default SingleChoiceQuestion;
