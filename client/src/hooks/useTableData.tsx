import { useEffect, useState } from "react";
import { iUser } from "../interfaces/interface";

const useTableData = (
  searchTerm: string,
  page: number,
  rowsPerPage: number,
  userCount: number | undefined
) => {
  const [users, setUsers] = useState<Array<iUser>>([]);

  useEffect(() => {
    const url = searchTerm
      ? `http://localhost:5000/users/search?q=${searchTerm}`
      : `http://localhost:5000/users?skip=${
          page * rowsPerPage
        }&limit=${rowsPerPage}`;

    fetch(url)
      .then((res) => res.json())
      .then(setUsers)
      .catch((err) => {
        console.error(err);
        setUsers([]);
      });
  }, [searchTerm, page, rowsPerPage, userCount]);

  return users;
};

export default useTableData;
