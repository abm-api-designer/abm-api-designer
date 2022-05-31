import { styled } from "@mui/material/styles";
import { AddCircle, RemoveCircle } from "@mui/icons-material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import {
  Button,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function Servers() {
  return (
    <Paper sx={{ padding: "5%", marginTop: "5%", width: "100%" }}>
      <Typography variant="h5" color="#1976d2">
        Add Server
      </Typography>
      <form>
        <Stack spacing={2}>
          <Stack direction="row" spacing={2}>
            <TextField
              sx={{ width: "40%" }}
              size="small"
              variant="outlined"
              label="Description"
              placeholder="Development"
            />
            <TextField
              size="small"
              fullWidth
              label="URL"
              placeholder="http://dev.swagger.io"
            ></TextField>
          </Stack>
          <Typography textAlign="left" variant="h6">
            URL Variables{" "}
            <IconButton color="primary">
              <AddCircle fontSize="small" />
            </IconButton>
          </Typography>
          <Table>
            <TableHead>
              <StyledTableRow>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell>Type</StyledTableCell>
                <StyledTableCell>Default</StyledTableCell>
                <StyledTableCell width={1}></StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              <StyledTableRow>
                <StyledTableCell component="th" scope="row">
                  Id
                </StyledTableCell>
                <StyledTableCell>Text</StyledTableCell>
                <StyledTableCell>123</StyledTableCell>
                <StyledTableCell>
                  <IconButton color="error">
                    <RemoveCircle />
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            </TableBody>
          </Table>
          <Stack direction="row" spacing={12}>
            <Button sx={{ width: "40%" }} variant="contained">
              EDIT
            </Button>
            <Button sx={{ width: "40%" }} variant="contained">
              SAVE
            </Button>
          </Stack>
        </Stack>
      </form>
    </Paper>
  );
}
