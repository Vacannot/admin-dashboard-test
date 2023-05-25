import React, { useState, useEffect, createContext, ReactNode } from "react";

interface UserContextType {
  userCount: number;
  fetchUserCount: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [userCount, setUserCount] = useState<number>(0);

  const fetchUserCount = async () => {
    try {
      const response = await fetch("http://localhost:5000/users/count");
      const data = await response.json();

      if (data && data.count !== null) {
        setUserCount(data.count);
      } else {
        console.error("Failed to fetch user count: Invalid response data");
      }
    } catch (error) {
      console.error("Failed to fetch user count:", error);
    }
  };

  useEffect(() => {
    fetchUserCount();
  }, []);

  return (
    <UserContext.Provider value={{ userCount, fetchUserCount }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
