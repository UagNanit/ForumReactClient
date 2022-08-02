import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";
import Link from "@mui/material/Link";

export default function Footer() {
  return (
    <AppBar position="fixed" color="primary" sx={{ top: "auto", bottom: 0 }}>
      <Toolbar>
        <Box sx={{ flexGrow: 1 }} />
        <IconButton
          color="inherit"
          href="https://www.facebook.com/profile.php?id=100005133124611"
        >
          <FacebookIcon />
        </IconButton>
        <IconButton
          color="inherit"
          href="https://www.linkedin.com/in/%D0%BE%D0%BB%D0%B5%D0%B3-%D0%BA%D1%80%D0%B0%D0%B2%D1%87%D0%B5%D0%BD%D0%BA%D0%BE-667785203/"
        >
          <LinkedInIcon />
        </IconButton>
        <IconButton
          color="inherit"
          href="https://github.com/UagNanit"
          rel="noopener noreferrer"
        >
          <GitHubIcon />
        </IconButton>
      </Toolbar>
      <Typography variant="overline">
        &copy; {new Date().getFullYear()} Copyright:{" "}
        <Link href="/" underline="none" color="white">
          {"Oleg"}
        </Link>
      </Typography>
    </AppBar>
  );
}
