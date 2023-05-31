import { Box, Grid } from "@mui/material";
import { useState } from "react";
import { SelectedUserContext } from "../../context/selectedUserContext";
import { UserProvider } from "../../context/userCountContext";
import { UsersTable } from "../usersTable/UsersTable";
import { CreateUser } from "../createUser/CreateUser";
import { UserDetails } from "../userDetails/UserDetails";
import { useSearchTerm } from "../../context/searchTermContext";

export const Dashboard = () => {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const { searchTerm } = useSearchTerm();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "90vh",
        padding: 3,
        mt: 2,
      }}
    >
      <SelectedUserContext.Provider
        value={{ selectedUserId, setSelectedUserId }}
      >
        <UserProvider>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12} lg={8}>
              <UsersTable searchTerm={searchTerm} />
            </Grid>
            <Grid item xs={12} sm={6} md={12} lg={4}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={6} lg={12}>
                  <CreateUser />
                </Grid>
                <Grid item xs={12} md={6} lg={12}>
                  {selectedUserId && <UserDetails id={selectedUserId} />}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </UserProvider>
      </SelectedUserContext.Provider>
    </Box>
  );
};
