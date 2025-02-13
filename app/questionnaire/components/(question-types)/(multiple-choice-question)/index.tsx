import { ComponentRegistry } from "@/types/common";

import { QuestionComponent } from "../../QuestionComponent";
import CheckboxList from "./CheckboxList";
import { MultipleChoiceSubType, MultipleChoiceSubTypeValues } from "./types";

const MULTI_CHOICE_COMPONENTS: ComponentRegistry<MultipleChoiceSubTypeValues> = {
  [MultipleChoiceSubType.CHECKBOX]: CheckboxList,
};

export const MultipleChoiceQuestion = QuestionComponent({
  components: MULTI_CHOICE_COMPONENTS,
});

export default MultipleChoiceQuestion;
