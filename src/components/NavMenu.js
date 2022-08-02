import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "./context";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { useHistory } from "react-router-dom";
import { variables } from "./variables";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import AlternateEmailSharpIcon from "@mui/icons-material/AlternateEmailSharp";
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";
import AlertTitle from "@mui/material/AlertTitle";
import PropTypes from "prop-types";
import RegisterDialog from "./RegisterDialog";

export default function NavMenu() {
  const pages = [
    { name: "Home", href: "/" },
    { name: "About us", href: "/about-us" }
  ];

  const { userConAuth, setUserConAuth } = useContext(UserContext);
  const [openLogin, setOpenLogin] = useState(false);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  let history = useHistory();

  useEffect(() => {
    IsAuth();
  }, []);

  const handleClickOpenLogin = () => {
    setOpenLogin(true);
  };

  const handleCloseLogin = () => {
    setOpenLogin(false);
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleClickNavMenu = (event, value) => {
    history.push(value);
    setAnchorElNav(null);
    event.preventDefault();
  };

  const handleClickLogout = () => {
    console.log("Logout");
    sessionStorage.removeItem(variables.tokenKey);
    sessionStorage.removeItem(variables.userId);

    setUserConAuth(null);
    setAnchorElUser(null);
  };
  const handleClickProfile = () => {
    console.log("Profile");

    setAnchorElUser(null);
  };

  async function IsAuth() {
    if (sessionStorage.getItem(variables.tokenKey) == null) {
      setUserConAuth(null);
      return;
    }

    const userId = sessionStorage.getItem(variables.userId);
    await fetch(variables.API_URL_Auth + `/${userId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem(variables.tokenKey)}`
        //mode: "cors",
        //credentials: "include"
      }
    })
      .then((response) => {
        if (response.ok) {
          response.json().then(function (data) {
            setUserConAuth(data);
          });
        } else {
          response.json().then(function (data) {
            console.log(data);
          });

          sessionStorage.removeItem(variables.tokenKey);
          sessionStorage.removeItem(variables.userId);
          setUserConAuth(null);
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("catch error Code: " + errorCode);
        console.log("catch error Message: " + errorMessage);
      });
  }

  return (
    <div>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none"
              }}
            >
              Forum
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left"
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left"
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" }
                }}
              >
                {pages.map((page) => (
                  <MenuItem
                    key={page.name}
                    onClick={(event) => handleClickNavMenu(event, page.href)}
                  >
                    <Typography textAlign="center">{page.name}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none"
              }}
            >
              Forum
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page.name}
                  onClick={(event) => handleClickNavMenu(event, page.href)}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page.name}
                </Button>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              {userConAuth === null ? (
                <div>
                  <Button onClick={handleClickOpenLogin} color="inherit">
                    Login
                  </Button>
                  <LoginDialog open={openLogin} onClose={handleCloseLogin} />
                </div>
              ) : (
                <div>
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar
                        alt={userConAuth.name}
                        src="/static/images/avatar/2.jpg"
                      />
                    </IconButton>
                  </Tooltip>

                  <Menu
                    sx={{ mt: "45px" }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right"
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right"
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    <MenuItem onClick={handleClickProfile}>
                      <Typography textAlign="center">Profile</Typography>
                    </MenuItem>
                    <MenuItem onClick={handleClickLogout}>
                      <Typography textAlign="center">Logout</Typography>
                    </MenuItem>
                  </Menu>
                </div>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}

LoginDialog.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool
};

function LoginDialog(props) {
  const { onClose, open } = props;

  const [valuesLogin, setValuesLogin] = useState({
    email: "",
    password: "",
    showPassword: false
  });

  const { userConAuth, setUserConAuth } = useContext(UserContext);
  const [openErrMsg, setOpenErrMsg] = useState(false);
  const [openRegisterDialog, setOpenRegisterDialog] = useState(false);

  const handleOnCloseRegisterDialog = () => {
    setOpenRegisterDialog(false);
  };

  const handleOnOpenRegisterDialog = () => {
    setOpenRegisterDialog(true);
    onClose();
  };

  const handleChange = (prop) => (event) => {
    setValuesLogin({ ...valuesLogin, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValuesLogin({
      ...valuesLogin,
      showPassword: !valuesLogin.showPassword
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClickCansel = () => {
    setValuesLogin({
      email: "",
      password: "",
      showPassword: false
    });
    onClose();
  };

  const handleLogin = async () => {
    console.log(valuesLogin.email + " " + valuesLogin.password);
    await fetch(variables.API_URL_Login, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        Email: valuesLogin.email,
        Password: valuesLogin.password
      })
    })
      .then(function (response) {
        if (response.status !== 200) {
          response.json().then(function (data) {
            console.log(data);
          });

          console.log(
            "Looks like there was a problem. Status Code: " + response.status
          );
          setOpenErrMsg(true);
          return;
        }
        response.json().then(function (data) {
          console.log(data);
          sessionStorage.setItem(variables.tokenKey, data.token);
          sessionStorage.setItem(variables.userId, data.id);
          setUserConAuth(data);

          setValuesLogin({
            email: "",
            password: "",
            showPassword: false
          });

          onClose();
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("catch error Code: " + errorCode);
        console.log("catch error Message: " + errorMessage);
        onClose();
      });
  };

  return (
    <div>
      <RegisterDialog
        open={openRegisterDialog}
        onClose={handleOnCloseRegisterDialog}
      />
      <Dialog open={open} onClose={onClose}>
        <Collapse in={openErrMsg}>
          <Alert
            severity="error"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setOpenErrMsg(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            sx={{ mb: 0, fontWeight: "bold" }}
          >
            <AlertTitle>Error</AlertTitle>
            Incorrect Email or Password!
          </Alert>
        </Collapse>
        <div>mail: admin@gmail.com / pas: 123456</div>
        <div>mail: user@gmail.com / pas: 654321</div>
        {/* Тестовые данные для авторизации */}

        <DialogTitle>Sign In</DialogTitle>
        <DialogContent>
          <DialogContentText style={{ fontWeight: "bold" }}>
            Enter email address and password
          </DialogContentText>
          <Box sx={{ display: "flex", flexWrap: "wrap" }}>
            <div>
              <TextField
                required
                label="Email"
                id="outlined-start-adornment"
                sx={{ m: 1, width: "25ch" }}
                value={valuesLogin.mail}
                onChange={handleChange("email")}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      {" "}
                      <AlternateEmailSharpIcon />
                    </InputAdornment>
                  )
                }}
              />

              <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  required
                  id="outlined-adornment-password"
                  type={valuesLogin.showPassword ? "text" : "password"}
                  value={valuesLogin.password}
                  onChange={handleChange("password")}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {valuesLogin.showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>
            </div>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleOnOpenRegisterDialog}>Registration</Button>
          <Button onClick={handleClickCansel}>Cancel</Button>
          <Button onClick={handleLogin}>Login</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
