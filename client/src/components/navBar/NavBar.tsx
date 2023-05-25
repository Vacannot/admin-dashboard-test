import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import UserSearch from "../search/UserSearch";
import SurikatLogo from "../../assets/logo_surikat.png";
import { Box } from "@mui/material";
export const NavBar = () => {
  return (
    <AppBar position="static">
      <Toolbar
        sx={{
          background: "rgb(66,39,12)",
          backgroundImage:
            "linear-gradient(90deg, rgba(66,39,12,1) 20%, rgba(199,141,68,1) 100%)",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Box sx={{ mr: "10px" }}>
          <img src={SurikatLogo} alt="Surikat Logo" height="50" />
        </Box>
        <UserSearch />
      </Toolbar>
    </AppBar>
  );
};
