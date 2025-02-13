import { ComponentRegistry } from "@/types/common";

import { QuestionComponent } from "../../QuestionComponent";
import LongText from "./LongText";
import NumberText from "./NumberText";
import ShortText from "./ShortText";
import { TextSubType, TextSubTypeValues } from "./types";

const TEXT_COMPONENTS: ComponentRegistry<TextSubTypeValues> = {
  [TextSubType.SHORT]: ShortText,
  [TextSubType.LONG]: LongText,
  [TextSubType.NUMBER]: NumberText,
};

export const TextQuestion = QuestionComponent({
  components: TEXT_COMPONENTS,
});

export default TextQuestion;
