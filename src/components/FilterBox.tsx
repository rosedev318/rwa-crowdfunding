import { FloatingLabel } from "flowbite-react";

export interface FilterOption {
  search: string;
  min: number;
  max: number;
}

export interface FilterBoxProps {
  option: FilterOption;
  handleChange: (option: FilterOption) => void;
}

export default function FilterBox({option, handleChange}: FilterBoxProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChange({
      ...option,
      [e.target.name]: e.target.value
    });
  }

  return (
    <div className="flex gap-4">
      <FloatingLabel variant="outlined" label="Search By" name="search" value={option.search} onChange={handleInputChange} />
      <FloatingLabel variant="outlined" type="number" step={100} label="Max" name="min" value={option.min} onChange={handleInputChange} />
      <FloatingLabel variant="outlined" type="number" step={100} label="Min" name="max" value={option.max} onChange={handleInputChange} />
    </div>
  );
}
