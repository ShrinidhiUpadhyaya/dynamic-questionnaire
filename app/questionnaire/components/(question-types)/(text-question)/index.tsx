import { TextSubType } from "@/types/question";
import ShortText from "./ShortText";
import LongText from "./LongText";
import NumberText from "./NumberText";
import { ComponentRegistry } from "@/types/components";
import { QuestionComponent } from "../../QuestionComponent";

const TEXT_COMPONENTS: ComponentRegistry<TextSubType> = {
  [TextSubType.SHORT_TEXT]: ShortText,
  [TextSubType.LONG_TEXT]: LongText,
  [TextSubType.NUMBER_TEXT]: NumberText,
};

export const TextQuestion = QuestionComponent({
  components: TEXT_COMPONENTS,
});

export default TextQuestion;
