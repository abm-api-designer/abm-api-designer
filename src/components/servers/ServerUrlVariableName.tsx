import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useState } from "react";

export interface ServerUrlVariableNameProps {
  index: number;
  onChange: (value: string) => void;
  variableNames: string[];
}

export default function ServerUrlVariableName({
  variableNames,
  index,
  onChange,
}: ServerUrlVariableNameProps) {
  const [currentValue, setCurrentValue] = useState<string>("");

  const handleOnChange = (value: string) => {
    setCurrentValue(value);
    onChange(value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="variable-name-label">Name</InputLabel>
      <Select
        id={`var-name-${index}`}
        name={`var-name-${index}`}
        labelId="variable-name-label"
        size="small"
        label="Name"
        value={currentValue}
        onChange={(e) => handleOnChange(e.target.value)}
      >
        {variableNames.map((item) => (
          <MenuItem key={`var-name-item-${item}`} value={item}>
            {item}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
