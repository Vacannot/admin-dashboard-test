import InputBase from "@mui/material/InputBase";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import { useSearchTerm } from "../../context/searchTermContext";
import { useEffect, useState } from "react";
import { Box, Button, Snackbar } from "@mui/material";

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const UserSearch: React.FC = () => {
  const { setSearchTerm, searchTerm } = useSearchTerm();
  const [showSnack, setShowSnack] = useState(false);

  const handleSearchTermChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchTerm(event.target.value);
  };

  const handleResetSearch = (id: string) => {
    navigator.clipboard.writeText(id);
    setShowSnack(true);
  };

  const closeSnack = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setShowSnack(false);
  };

  return (
    <Box sx={{ display: "flex", gap: 2 }}>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Find user"
          inputProps={{ "aria-label": "search" }}
          onChange={handleSearchTermChange}
          value={searchTerm}
        />
      </Search>
      <Button
        onClick={() => {
          setSearchTerm(""), setShowSnack(true);
        }}
        sx={{
          color: "white",
          backgroundColor: "rgba(199,141,68,0)",
          "&:hover": {
            backgroundColor: "#201407",
          },
        }}
      >
        Reset
      </Button>
      <Snackbar
        open={showSnack}
        autoHideDuration={2000}
        onClose={closeSnack}
        message="Search Cleared"
      />
    </Box>
  );
};

export default UserSearch;
