import { useState, useEffect } from "react";
import { iUser } from "../components/userDetails/UserDetails";

const useFetchUser = (id: string): iUser | null => {
  const [user, setUser] = useState<iUser | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:5000/users/${id}`);
        const userData = await response.json();

        if (isMounted) {
          setUser(userData);
        }
      } catch (error) {
        console.error(error);
        if (isMounted) {
          setUser(null);
        }
      }
    };

    fetchUser();
    return () => {
      isMounted = false;
    };
  }, [id]);

  return user;
};

export default useFetchUser;
