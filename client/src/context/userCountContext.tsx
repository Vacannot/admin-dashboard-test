import React, { useState, useEffect, createContext, ReactNode } from "react";

interface UserContextType {
  userCount: number;
  fetchUserCount: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [userCount, setUserCount] = useState<number>(0);

  const fetchUserCount = async () => {
    try {
      const response = await fetch("http://localhost:5000/users/count");
      const data = await response.json();
      console.log(data); // Check the value of data.count
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
