import {
  SingleChoiceSubType,
  SingleChoiceSubTypeValues,
} from "@/app/questionnaire/components/(question-types)/(single-choice-question)/types";
import { ComponentRegistry } from "@/types/common";

import { QuestionComponent } from "../../QuestionComponent";
import CustomSelect from "./CustomSelect";
import RadioButtons from "./RadioButtons";

const SINGLE_CHOICE_COMPONENTS: ComponentRegistry<SingleChoiceSubTypeValues> = {
  [SingleChoiceSubType.RADIO]: RadioButtons,
  [SingleChoiceSubType.SELECT]: CustomSelect,
};

export const SingleChoiceQuestion = QuestionComponent({
  components: SINGLE_CHOICE_COMPONENTS,
});

export default SingleChoiceQuestion;
