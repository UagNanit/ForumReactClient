import React from "react";
import Container from "@mui/material/Container";
import NavMenu from "./NavMenu";
import Footer from "./Footer";
import List from "@mui/material/List";

export default function Layout(props) {
  return (
    <List>
      <NavMenu />
      <Container>{props.children}</Container>
    </List>
  );
}
