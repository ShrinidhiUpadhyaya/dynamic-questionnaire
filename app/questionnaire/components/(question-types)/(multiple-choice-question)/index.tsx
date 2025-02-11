import { ComponentRegistry } from "@/types/components";
import { MultipleChoiceSubType } from "@/types/question";
import { QuestionComponent } from "../../QuestionComponent";
import CheckboxList from "./CheckboxList";

const MULTI_CHOICE_COMPONENTS: ComponentRegistry<MultipleChoiceSubType> = {
  [MultipleChoiceSubType.CHECKBOX]: CheckboxList,
};

export const MultipleChoiceQuestion = QuestionComponent({
  components: MULTI_CHOICE_COMPONENTS,
});

export default MultipleChoiceQuestion;
