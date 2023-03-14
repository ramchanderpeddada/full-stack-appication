import { Avatar, Box, Button, Toolbar, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import memories from "../../images/memories.png";
import { StyledAppBar, StyledImage, StyledTextHeader } from "./styles";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as actionType from "../../constants/actionTypes";
import decode from "jwt-decode";

const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    dispatch({ type: actionType.LOGOUT });
    navigate("/auth");
    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);
  return (
    <>
      <StyledAppBar position="static" color="inherit">
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <StyledTextHeader variant="h2" component={Link} to="/">
            Memories
          </StyledTextHeader>
          <StyledImage src={memories} alt="memories" height="60" />
        </Box>
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            width: "400px",
          }}
        >
          {user?.result ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "400px",
              }}
            >
              <Avatar
                src={user?.result.imageUrl}
                alt={user?.result.name}
                sx={{ background: "blue" }}
              >
                {user?.result.name.charAt(0)}
              </Avatar>
              <Typography
                variant="h6"
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {user?.result.name}
              </Typography>
              <Button variant="contained" color="secondary" onClick={logout}>
                Logout
              </Button>
            </Box>
          ) : (
            <Button
              component={Link}
              to="/auth"
              variant="contained"
              color="primary"
            >
              Sign In
            </Button>
          )}
        </Toolbar>
      </StyledAppBar>
    </>
  );
};

export default Navbar;
