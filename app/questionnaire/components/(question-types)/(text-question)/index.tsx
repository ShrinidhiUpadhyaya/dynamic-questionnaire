import { ComponentRegistry } from "@/types/components";
import { TextSubType } from "@/types/question";

import { QuestionComponent } from "../../QuestionComponent";
import LongText from "./LongText";
import NumberText from "./NumberText";
import ShortText from "./ShortText";

const TEXT_COMPONENTS: ComponentRegistry<TextSubType> = {
  [TextSubType.SHORT_TEXT]: ShortText,
  [TextSubType.LONG_TEXT]: LongText,
  [TextSubType.NUMBER_TEXT]: NumberText,
};

export const TextQuestion = QuestionComponent({
  components: TEXT_COMPONENTS,
});

export default TextQuestion;
