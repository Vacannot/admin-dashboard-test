import { useState } from "react";
import { iDisplayUser } from "../interfaces/interface";

interface UserCreationResponse {
  success: boolean;
  message: string;
  user?: iDisplayUser;
}

const useCreateUser = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const createUser = async (
    user: iDisplayUser
  ): Promise<UserCreationResponse> => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:5000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const data = await response.json();

      setIsLoading(false);

      if (response.ok) {
        return {
          success: true,
          message: "User created successfully.",
          user: data,
        };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error: any) {
      setIsLoading(false);
      console.error("Error:", error);
      return { success: false, message: `Error occurred: ${error.message}` };
    }
  };

  return { createUser, isLoading };
};

export default useCreateUser;
