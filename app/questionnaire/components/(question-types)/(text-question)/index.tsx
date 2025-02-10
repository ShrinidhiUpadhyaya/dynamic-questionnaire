import { TextSubType } from "@/types/question";
import ShortText from "./ShortText";
import LongText from "./LongText";
import Number from "./Number";
import { ComponentRegistry } from "@/types/components";
import { QuestionComponent } from "../../QuestionComponent";

const TEXT_COMPONENTS: ComponentRegistry<TextSubType> = {
  [TextSubType.SHORT_TEXT]: ShortText,
  [TextSubType.LONG_TEXT]: LongText,
  [TextSubType.NUMBER]: Number,
};

export const TextQuestion = QuestionComponent({
  components: TEXT_COMPONENTS,
});

export default TextQuestion;
