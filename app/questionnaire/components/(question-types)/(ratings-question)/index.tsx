import { ComponentRegistry } from "@/types/components";
import { QuestionComponent } from "../../QuestionComponent";
import { RatingsSubType } from "@/types/question";
import DSlider from "./DSlider";

const RATINGS_COMPONENTS: ComponentRegistry<RatingsSubType> = {
  [RatingsSubType.SLIDER]: DSlider,
};

export const RatingsQuestion = QuestionComponent({
  components: RATINGS_COMPONENTS,
});

export default RatingsQuestion;
