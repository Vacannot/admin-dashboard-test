import { Dispatch, SetStateAction } from "react";

interface UseDeleteUserProps {
  userId: string | null;
  fetchUserCount: () => void;
  setOpenDialog: Dispatch<SetStateAction<boolean>>;
  setSelectedUserId: Dispatch<SetStateAction<string | null>>;
}

const useDeleteUser = ({
  userId,
  fetchUserCount,
  setOpenDialog,
  setSelectedUserId,
}: UseDeleteUserProps) => {
  return async () => {
    try {
      const response = await fetch(`http://localhost:5000/users/${userId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        fetchUserCount();
        setOpenDialog(false);
        setSelectedUserId(null);
      } else {
        console.log("Failed to delete user");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
};

export default useDeleteUser;
