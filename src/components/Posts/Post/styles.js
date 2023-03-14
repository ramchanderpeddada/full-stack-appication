import { Card, styled } from "@mui/material";

export const StyledImage = styled("img")(() => ({
  marginLeft: "15px",
}));

export const StyledCard = styled(Card)(() => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  borderRadius: "15px",
  height: "100%",
  position: "relative",
}));
