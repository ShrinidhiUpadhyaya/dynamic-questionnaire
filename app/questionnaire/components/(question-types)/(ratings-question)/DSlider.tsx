import { Slider } from "@/components/ui/slider";
import { DSliderProps } from "./types";

const DSlider = ({
  min = 0,
  max = 10,
  step = 1,
  defaultValue = 4,
}: DSliderProps) => {
  return (
    <Slider
      min={min}
      max={max}
      step={step}
      defaultValue={[defaultValue]}
      className="h-8"
    />
  );
};

export default DSlider;
