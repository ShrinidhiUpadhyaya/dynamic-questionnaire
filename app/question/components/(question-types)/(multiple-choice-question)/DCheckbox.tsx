import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

interface DCheckboxProps {
  label: string;
  onChange: (value: boolean) => void;
}

const DCheckbox = ({ label, onChange }: DCheckboxProps) => {
  return (
    <div className="flex items-center gap-2">
      <Checkbox id="checkbox" onCheckedChange={onChange} />
      <Label htmlFor="checkbox">{label}</Label>
    </div>
  );
};

export default DCheckbox;
