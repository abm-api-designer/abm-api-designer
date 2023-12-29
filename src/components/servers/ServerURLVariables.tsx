import { AddCircle, RemoveCircle } from "@mui/icons-material";
import {
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { ServerVariableItem } from "../../models/SwaggerModels";

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

export enum VariableType {
  ENUM,
  STRING,
}

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
  type: VariableType.STRING,
  description: "",
  default: "",
};

export interface ServerURLVariablesProps {
  variables: SimpleServerVariable[];
  setVariables: React.Dispatch<React.SetStateAction<SimpleServerVariable[]>>;
  testID: string;
}

export default function ServerURLVariables({
  testID,
  variables,
  setVariables,
}: ServerURLVariablesProps) {
  function addNewVar() {
    setVariables([...variables, initVar]);
  }

  function mapToDisplay(variables: ServerVariableItem) {
    var mappedVars = [] as SimpleServerVariable[];
    Object.keys(variables).forEach((key) => {
      mappedVars.push({
        default: variables[key].default,
        name: key,
        type: VariableType.STRING,
        description: variables[key].description,
      });
    });
    return mappedVars;
  }

  const handleOnVariableTypeSelection = (index: number, value: string) => {
    console.log(`Value : ${value}`);
    console.log(`Index : ${index}`);
  };

  return (
    <div data-testid={testID}>
      <Typography textAlign="left" variant="h6">
        URL Variables{" "}
        <IconButton
          data-testid="add-new-var-btn"
          onClick={addNewVar}
          color="primary"
        >
          <AddCircle fontSize="small" />
        </IconButton>
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
                <TextField
                  data-testid={`var-name-${index}`}
                  size="small"
                  placeholder="Name"
                />
              </StyledTableCell>
              <StyledTableCell sx={{ width: "25%" }}>
                <FormControl fullWidth>
                  <InputLabel id="variable-type-label">Type</InputLabel>
                  <Select
                    data-testid={`var-type-${index}`}
                    labelId="variable-type-label"
                    size="small"
                    label="Type"
                    value={item.type}
                    onChange={(e) =>
                      handleOnVariableTypeSelection(
                        index,
                        e.target.value as string
                      )
                    }
                  >
                    <MenuItem
                      data-testid={`var-type-${index}-ENUM`}
                      value="ENUM"
                    >
                      Enum
                    </MenuItem>
                    <MenuItem
                      data-testid={`var-type-${index}-STRING`}
                      value="STRING"
                    >
                      String
                    </MenuItem>
                  </Select>
                </FormControl>
              </StyledTableCell>
              <StyledTableCell>
                <TextField
                  data-testid={`var-default-${index}`}
                  size="small"
                  placeholder="Default Val"
                />
              </StyledTableCell>
              <StyledTableCell sx={{ width: "1%" }}>
                <IconButton data-testid={`var-del-btn-${index}`} color="error">
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
