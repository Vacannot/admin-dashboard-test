import { FC, useContext, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import UserContext from "../../context/userCountContext";
import { SelectedUserContext } from "../../context/selectedUserContext";
import useDeleteUser from "../../hooks/useDeleteUser";
import useFetchUser from "../../hooks/useFetchUser";

export const UserDetails: FC<{ id: string }> = ({ id }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const userContext = useContext(UserContext);
  const { userCount, fetchUserCount } = userContext || {};
  const { setSelectedUserId } = useContext(SelectedUserContext);

  const user = useFetchUser(id);

  if (!fetchUserCount) {
    return <Typography>Loading...</Typography>;
  }

  const handleDelete = useDeleteUser({
    userId: user?._id || null,
    fetchUserCount,
    setOpenDialog,
    setSelectedUserId,
  });

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return user ? (
    <>
      <Card
        sx={{
          padding: 1,
          height: "17rem",
          width: "25vw",
          minWidth: "300px",
          maxWidth: "300px",
        }}
      >
        <CardHeader
          title={`${user.firstName} ${user.lastName}`}
          subheader={`User ID: ${user._id}`}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            Email: {user.email}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Account Created: {new Date(user.createDateTime).toLocaleString()}
          </Typography>
          <Button
            onClick={handleOpenDialog}
            variant="outlined"
            color="error"
            sx={{ mt: 3 }}
          >
            Delete User
          </Button>
        </CardContent>
      </Card>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{"Delete User?"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this user?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            No
          </Button>
          <Button onClick={handleDelete} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  ) : (
    <Typography>Loading...</Typography>
  );
};
