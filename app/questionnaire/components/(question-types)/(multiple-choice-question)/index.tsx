import { MultipleChoiceSubType } from "@/types/question";
import DCheckbox from "./DCheckbox";
import { ComponentRegistry } from "@/types/components";
import { QuestionComponent } from "../../QuestionComponent";

const MULTI_CHOICE_COMPONENTS: ComponentRegistry<MultipleChoiceSubType> = {
  [MultipleChoiceSubType.CHECKBOX]: DCheckbox,
};

export const MultipleChoiceQuestion = QuestionComponent({
  components: MULTI_CHOICE_COMPONENTS,
});

export default MultipleChoiceQuestion;
