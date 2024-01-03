import { AddCircle, RemoveCircle } from "@mui/icons-material";
import {
  IconButton,
  Table,
  TableBody,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { VariableType } from "../../models/SwaggerModels";
import DefaultServerVariable from "./DefaultServerVariable";
import {
  deleteVariable,
  updateDefaultValue,
  updateNameForVariable,
  updateSelectedVaribleType,
} from "../../mappers/ServerMapper";
import ServerVariableType from "../common/ServerVariableType";
import CustomTooltip from "../common/CustomTooltip";
import ServerUrlVariableName from "./ServerUrlVariableName";
import { useEffect, useState } from "react";
import { parseUrl } from "../../utils/UrlParser";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export class CsvString {
  private value: string;

  constructor(value: string) {
    this.value = value;
  }

  public toArray() {
    return this.value.split(",");
  }
}

export interface SimpleServerVariable {
  name: string;
  default: string;
  type: VariableType;
  description: string;
  values?: CsvString;
}

const initVar = {
  name: "",
  type: VariableType.ENUM,
  description: "",
  default: "",
};

export interface ServerURLVariablesProps {
  variables: SimpleServerVariable[];
  setVariables: React.Dispatch<React.SetStateAction<SimpleServerVariable[]>>;
  testID: string;
  disableVarAdd: boolean;
  serverUrl: string;
}

export default function ServerURLVariables({
  testID,
  variables,
  setVariables,
  disableVarAdd,
  serverUrl,
}: ServerURLVariablesProps) {
  const [definedVarNames, setDefinedVarNames] = useState<string[]>([]);
  const [variableNames, setVariableNames] = useState<string[]>([]);
  const [allVarsAreDefined, setAllVarsAreDefined] = useState(false);

  useEffect(() => {
    if (serverUrl) {
      const parsedParams = parseUrl(serverUrl);
      setVariableNames(parsedParams);
    }
  }, [serverUrl]);

  useEffect(() => {
    setAllVarsAreDefined(variableNames.length === definedVarNames.length);
  }, [definedVarNames, variableNames]);

  function addNewVar() {
    setVariables([...variables, { ...initVar }]);
  }

  const handleOnNameChange = (index: number, value: string) => {
    const updated = updateNameForVariable(variables, index, value);
    setVariables(updated);
    const updatedVars = [...definedVarNames, value];
    setDefinedVarNames(updatedVars);
  };

  const handleOnVariableTypeSelection = (
    index: number,
    value: VariableType
  ) => {
    const updated = updateSelectedVaribleType(variables, index, value);
    setVariables(updated);
  };

  const handleOnDefaultValueChange = (
    index: number,
    type: VariableType,
    value: string
  ) => {
    const updated = updateDefaultValue(variables, index, type, value);
    setVariables(updated);
  };

  const handleOnDelete = (index: number) => {
    const updated = deleteVariable(variables, index);
    setVariables(updated);
  };

  return (
    <div data-testid={testID}>
      <Typography textAlign="left" variant="h6">
        URL Variables
        <CustomTooltip
          title={
            disableVarAdd
              ? "Please define server URL to contain a placeholder variables"
              : allVarsAreDefined
              ? "All variables are defined in the table below"
              : "Add a variable"
          }
        >
          <IconButton
            disabled={disableVarAdd || allVarsAreDefined}
            data-testid="add-new-var-btn"
            onClick={addNewVar}
            color="primary"
          >
            <AddCircle fontSize="small" />
          </IconButton>
        </CustomTooltip>
      </Typography>

      <Table>
        <TableHead>
          <StyledTableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell>Type</StyledTableCell>
            <StyledTableCell>Default</StyledTableCell>
            <StyledTableCell></StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {variables.map((item, index) => (
            <StyledTableRow data-testid="var-row" key={`var-row-${index}`}>
              <StyledTableCell component="th" scope="row" sx={{ width: "30%" }}>
                <ServerUrlVariableName
                  definedVarNames={definedVarNames}
                  variableNames={variableNames}
                  index={index}
                  onChange={(e) => handleOnNameChange(index, e)}
                />
              </StyledTableCell>
              <StyledTableCell sx={{ width: "30%" }}>
                <ServerVariableType
                  key={index}
                  itemIndex={index}
                  initValue={item.type}
                  onChange={(e) => handleOnVariableTypeSelection(index, e)}
                />
              </StyledTableCell>
              <StyledTableCell sx={{ width: "30%" }}>
                <DefaultServerVariable
                  itemIndex={index}
                  initValue={item.default}
                  key={`default-var-${index}`}
                  onChange={(e) =>
                    handleOnDefaultValueChange(index, item.type, e)
                  }
                  type={item.type}
                />
              </StyledTableCell>
              <StyledTableCell>
                <IconButton
                  data-testid={`var-del-btn-${index}`}
                  color="error"
                  onClick={() => handleOnDelete(index)}
                >
                  <RemoveCircle />
                </IconButton>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
