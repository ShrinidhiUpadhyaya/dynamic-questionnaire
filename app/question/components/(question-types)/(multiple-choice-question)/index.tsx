import { MultipleChoiceSubType } from "@/app/question/types/multiple-choice-types";
import DCheckbox from "./DCheckbox";
import { ComponentRegistry } from "@/app/question/types/component-types";
import { QuestionComponent } from "../../QuestionComponent";

const MULTI_CHOICE_COMPONENTS: ComponentRegistry<MultipleChoiceSubType> = {
  [MultipleChoiceSubType.CHECKBOX]: DCheckbox,
};

export const MultipleChoiceQuestion = QuestionComponent({
  components: MULTI_CHOICE_COMPONENTS,
});

export default MultipleChoiceQuestion;
