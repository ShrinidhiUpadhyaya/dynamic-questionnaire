import { ComponentRegistry } from "@/types/common";

import { QuestionComponent } from "../../QuestionComponent";
import DSlider from "./DSlider";
import { RatingsSubType, RatingsSubTypeValues } from "./types";

const RATINGS_COMPONENTS: ComponentRegistry<RatingsSubTypeValues> = {
  [RatingsSubType.SLIDER]: DSlider,
};

export const RatingsQuestion = QuestionComponent({
  components: RATINGS_COMPONENTS,
});

export default RatingsQuestion;
