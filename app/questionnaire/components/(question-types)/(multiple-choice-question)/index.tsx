import { MultipleChoiceSubType } from "@/types/question";
import DCheckbox from "./DCheckbox";
import { ComponentRegistry } from "@/types/components";
import { QuestionComponent } from "../../QuestionComponent";
import ToggleButton from "./ToggleButton";

const MULTI_CHOICE_COMPONENTS: ComponentRegistry<MultipleChoiceSubType> = {
  [MultipleChoiceSubType.CHECKBOX]: DCheckbox,
  [MultipleChoiceSubType.TOGGLE]: ToggleButton,
};

export const MultipleChoiceQuestion = QuestionComponent({
  components: MULTI_CHOICE_COMPONENTS,
});

export default MultipleChoiceQuestion;
