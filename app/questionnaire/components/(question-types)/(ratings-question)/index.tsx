import { ComponentRegistry } from "@/types/common";

import { QuestionComponent } from "../../QuestionComponent";
import CustomSlider from "./CustomSlider";
import { RatingsSubType, RatingsSubTypeValues } from "./types";

const RATINGS_COMPONENTS: ComponentRegistry<RatingsSubTypeValues> = {
  [RatingsSubType.SLIDER]: CustomSlider,
};

export const RatingsQuestion = QuestionComponent({
  components: RATINGS_COMPONENTS,
});

export default RatingsQuestion;
