import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Button,
  TableFooter,
  TablePagination,
  TableHead,
  Snackbar,
  Box,
} from "@mui/material";
import { useState, useContext } from "react";
import { SelectedUserContext } from "../../context/selectedUserContext";
import UserContext from "../../context/userCountContext";
import useTableData from "../../hooks/useTableData";

export const UsersTable = ({ searchTerm }: { searchTerm: string }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [showSnack, setShowSnack] = useState(false);
  const userContext = useContext(UserContext);
  const { userCount } = userContext || {};

  const { setSelectedUserId } = useContext(SelectedUserContext);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleCopyId = (id: string) => {
    navigator.clipboard.writeText(id);
    setShowSnack(true);
  };

  const closeSnack = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setShowSnack(false);
  };

  const users = useTableData(searchTerm, page, rowsPerPage, userCount);

  return (
    <Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>User ID</TableCell>
              <TableCell>First name</TableCell>
              <TableCell>Last name</TableCell>
              <TableCell>Account creation date</TableCell>
              <TableCell>Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(({ _id, ...user }) => (
              <TableRow key={_id + Math.floor(Math.random() * 100)}>
                <TableCell component="th" scope="row">
                  <Button
                    onClick={() => handleCopyId(_id)}
                    sx={{ color: "black" }}
                  >
                    Copy ID
                  </Button>
                </TableCell>
                <TableCell
                  key={user.firstName + Math.floor(Math.random() * 100)}
                >
                  {user.firstName}
                </TableCell>
                <TableCell
                  key={user.lastName + Math.floor(Math.random() * 100)}
                >
                  {user.lastName}
                </TableCell>
                <TableCell
                  key={user.createDateTime + Math.floor(Math.random() * 100)}
                >
                  {new Date(user.createDateTime).getFullYear() +
                    "-" +
                    (
                      "0" +
                      (new Date(user.createDateTime).getMonth() + 1)
                    ).slice(-2) +
                    "-" +
                    ("0" + new Date(user.createDateTime).getDate()).slice(-2)}
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#42270c",
                      "&:hover": {
                        backgroundColor: "#c78d44",
                      },
                    }}
                    onClick={() => setSelectedUserId(_id)}
                  >
                    Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10]}
                colSpan={3}
                count={userCount ?? -1}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: { "aria-label": "rows per page" },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
      <Snackbar
        open={showSnack}
        autoHideDuration={2000}
        onClose={closeSnack}
        message="ID Copied"
      />
    </Box>
  );
};
