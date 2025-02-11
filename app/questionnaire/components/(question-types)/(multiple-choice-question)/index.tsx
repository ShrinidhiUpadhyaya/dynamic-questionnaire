import { ComponentRegistry } from "@/types/components";
import { MultipleChoiceSubType } from "@/types/question";
import { QuestionComponent } from "../../QuestionComponent";
import DCheckbox from "./DCheckbox";

const MULTI_CHOICE_COMPONENTS: ComponentRegistry<MultipleChoiceSubType> = {
  [MultipleChoiceSubType.CHECKBOX]: DCheckbox,
};

export const MultipleChoiceQuestion = QuestionComponent({
  components: MULTI_CHOICE_COMPONENTS,
});

export default MultipleChoiceQuestion;
