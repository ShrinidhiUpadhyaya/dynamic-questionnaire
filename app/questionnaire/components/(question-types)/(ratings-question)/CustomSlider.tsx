import { Slider } from "@/components/ui/slider";
import { CustomSliderProps } from "./types";

const CustomSlider = ({ min = 0, max = 10, step = 1, defaultValue = 4 }: CustomSliderProps) => {
  return <Slider min={min} max={max} step={step} defaultValue={[defaultValue]} className="h-8" />;
};

export default CustomSlider;
