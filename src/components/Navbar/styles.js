// import { makeStyles } from "@material-ui/core/styles";
// import { deepPurple } from "@material-ui/core/colors";
import { AppBar, styled, Typography } from "@mui/material";

export const StyledAppBar = styled(AppBar)(() => ({
  borderRadius: 15,
  margin: "30px 0",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "10px 50px",
}));

export const StyledTextHeader = styled(Typography)(() => ({
  color: "rgba(0,183,255, 1)",
}));

export const StyledImage = styled("img")(() => ({
  marginLeft: "15px",
}));
