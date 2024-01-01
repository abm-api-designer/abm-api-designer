import { TextField } from "@mui/material";
import { VariableType, getVariableType } from "../../models/SwaggerModels";
import { useState } from "react";

interface DefaultServerVariableProps {
  itemIndex: number;
  initValue: string;
  type: VariableType;
  onChange: (newValue: string) => void;
}

export default function DefaultServerVariable({
  itemIndex,
  initValue,
  type,
  onChange,
}: DefaultServerVariableProps) {
  const [value, setValue] = useState(initValue);

  const handleOnChange = (newValue: string) => {
    onChange(newValue);
    setValue(newValue);
  };

  let renderedComponent;
  switch (type) {
    case VariableType.ENUM:
      renderedComponent = (
        <TextField
          id={`var-type-enum-default-${itemIndex}`}
          name={`var-type-enum-default-${itemIndex}`}
          size="small"
          placeholder="1,2,3"
          value={value}
          onChange={(e) => handleOnChange(e.currentTarget.value)}
        />
      );
      break;
    case VariableType.STRING:
      renderedComponent = (
        <TextField
          id={`var-type-str-default-${itemIndex}`}
          name={`var-type-str-default-${itemIndex}`}
          size="small"
          placeholder="8080"
          value={value}
          onChange={(e) => handleOnChange(e.currentTarget.value)}
        />
      );
      break;
    default:
      renderedComponent = (
        <TextField
          id={`var-type-unknown-default-${itemIndex}`}
          name={`var-type-unknown-default-${itemIndex}`}
          size="small"
          placeholder=""
          value={value}
          onChange={(e) => handleOnChange(e.currentTarget.value)}
        />
      );
  }

  return renderedComponent;
}
