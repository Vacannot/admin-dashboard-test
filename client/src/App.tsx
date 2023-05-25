import Box from "@mui/material/Box";
import { Outlet } from "react-router-dom";
import { Dashboard } from "./components/dashboard/Dashboard";
import { NavBar } from "./components/navBar/NavBar";
import { SearchTermContext } from "./context/searchTermContext";
import { useState } from "react";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <Box sx={{ flexGrow: 1 }}>
      <SearchTermContext.Provider value={{ searchTerm, setSearchTerm }}>
        <NavBar />
        <Dashboard />
      </SearchTermContext.Provider>
      <Outlet />
    </Box>
  );
}

export default App;
