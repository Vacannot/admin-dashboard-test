import {
  Button,
  Grid,
  Card,
  Typography,
  Snackbar,
  Alert,
  TextField,
} from "@mui/material";
import React, { useState, FormEvent, useContext } from "react";
import UserContext from "../../context/userCountContext";
import useCreateUser from "../../hooks/useCreateUser";
import { iDisplayUser } from "../../interfaces/interface";

export const CreateUser = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const userContext = useContext(UserContext);
  const { userCount, fetchUserCount } = userContext || {};
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<
    "success" | "info" | "warning" | "error"
  >("success");
  const { createUser, isLoading } = useCreateUser();

  const validateEmail = (email: string) => {
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return regex.test(email);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    console.log(userCount);

    if (!validateEmail(email)) {
      setSnackbarMessage("Invalid Email");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      setEmail("");
      return;
    }

    const user: iDisplayUser = {
      firstName,
      lastName,
      email,
    };

    const response = await createUser(user);
    if (response.success) {
      setSnackbarMessage(
        `User created with name: ${
          response.user?.firstName + " " + response.user?.lastName
        }`
      );
      setSnackbarSeverity("success");
      fetchUserCount?.();
    } else {
      setSnackbarMessage(`Failed to create user: ${response.message}`);
      setSnackbarSeverity("error");
    }
    setSnackbarOpen(true);

    setFirstName("");
    setLastName("");
    setEmail("");
  };

  return (
    <>
      <Card
        sx={{
          padding: 1,
          width: "25vw",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "23rem",
          minWidth: "300px",
          maxWidth: "250px",
        }}
      >
        <form onSubmit={handleSubmit}>
          <Grid
            container
            spacing={2}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 2,
              flexDirection: "column",
            }}
          >
            <Typography variant="h4" sx={{ fontSize: "22px" }}>
              Create new user
            </Typography>
            <TextField
              required
              label="First Name"
              variant="outlined"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />

            <TextField
              required
              label="Last Name"
              variant="outlined"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />

            <TextField
              required
              label="Email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: "#42270c",
                "&:hover": {
                  backgroundColor: "#c78d44",
                },
              }}
            >
              Create User
            </Button>
          </Grid>
        </form>
      </Card>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};
