import { FC, useContext, useEffect, useState } from "react";
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
import { useSearchTerm } from "../../context/searchTermContext";
import { SelectedUserContext } from "../../context/selectedUserContext";

export interface iUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  createDateTime: number;
}

interface UserDetailsProps {
  id: string;
}

export const UserDetails: FC<UserDetailsProps> = ({ id }) => {
  const [user, setUser] = useState<iUser | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const userContext = useContext(UserContext);
  const { userCount, fetchUserCount } = userContext || {};
  const { setSelectedUserId } = useContext(SelectedUserContext);
  const { searchTerm } = useSearchTerm();

  useEffect(() => {
    fetch(`http://localhost:5000/users/${id}`)
      .then((res) => res.json())
      .then(setUser)
      .catch((err) => {
        console.error(err);
        setUser(null);
      });
  }, [id]);

  const handleDelete = () => {
    if (user) {
      fetch(`http://localhost:5000/users/${user._id}`, {
        method: "DELETE",
      })
        .then((res) => {
          if (res.ok) {
            console.log("User Deleted");
            fetchUserCount?.();
            setOpenDialog(false);
            setSelectedUserId(null);
          } else {
            console.error("Failed to delete user");
          }
        })
        .catch((err) => {
          console.error("Error:", err);
        });
    }
  };

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
            onClick={handleOpenDialog} // change this to open the dialog
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
