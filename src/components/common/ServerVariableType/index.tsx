import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useState } from "react";
import { VariableType, getVariableType } from "../../../models/SwaggerModels";

export interface ServerVariableTypeProps {
  itemIndex: number;
  initValue: VariableType;
  onChange: (type: VariableType) => void;
}

export default function ServerVariableType({
  itemIndex,
  initValue,
  onChange,
}: ServerVariableTypeProps) {
  const [currentValue, setCurrentValue] = useState<VariableType>(initValue);

  const handleOnChange = (value: string) => {
    const valueAsEnum = getVariableType(value);
    if (valueAsEnum) {
      setCurrentValue(valueAsEnum);
      onChange(valueAsEnum);
    }
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="variable-type-label">Type</InputLabel>
      <Select
        id={`var-type-${itemIndex}`}
        name={`var-type-${itemIndex}`}
        labelId="variable-type-label"
        size="small"
        label="Type"
        value={currentValue}
        onChange={(e) => handleOnChange(e.target.value as string)}
      >
        {Object.values(VariableType).map((item) => (
          <MenuItem key={`var-type-item-${item}`} value={item}>
            {item}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
