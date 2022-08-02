import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "./context";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
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
import BadgeIcon from "@mui/icons-material/Badge";
import PropTypes from "prop-types";

RegisterDialog.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool
};

export default function RegisterDialog(props) {
  const { onClose, open } = props;

  const [valuesRegister, setValuesRegister] = useState({
    username: "",
    email: "",
    password: "",
    showPassword: false
  });

  const { userConAuth, setUserConAuth } = useContext(UserContext);
  const [openErrMsg, setOpenErrMsg] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const handleChange = (prop) => (event) => {
    setValuesRegister({ ...valuesRegister, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValuesRegister({
      ...valuesRegister,
      showPassword: !valuesRegister.showPassword
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClickCansel = () => {
    setValuesRegister({
      username: "",
      email: "",
      password: "",
      showPassword: false
    });
    onClose();
  };

  const handleRegister = async () => {
    console.log(valuesRegister.email + " " + valuesRegister.password);
    await fetch(variables.API_URL_Register, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        Username: valuesRegister.username,
        Email: valuesRegister.email,
        Password: valuesRegister.password
      })
    })
      .then(function (response) {
        if (response.status !== 200) {
          response.json().then(function (data) {
            const msg =
              data?.email !== undefined ? data?.email : data?.username;
            setErrMsg(msg);
          });

          console.log(
            "Looks like there was a problem. Status Code: " + response.status
          );
          setOpenErrMsg(true);
          return;
        }
        response.json().then(function (data) {
          sessionStorage.setItem(variables.tokenKey, data.token);
          sessionStorage.setItem(variables.userId, data.id);
          setUserConAuth(data);
          setValuesRegister({
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
        setValuesRegister({
          email: "",
          password: "",
          showPassword: false
        });
        onClose();
      });
  };

  return (
    <div>
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
            {errMsg}
          </Alert>
        </Collapse>

        <DialogTitle>Registration</DialogTitle>
        <DialogContent>
          <DialogContentText style={{ fontWeight: "bold" }}>
            Enter user name, email address and password
          </DialogContentText>
          <Box sx={{ display: "flex", flexWrap: "wrap" }}>
            <div>
              <TextField
                required
                label="Name"
                id="outlined-start-adornment"
                sx={{ m: 1, width: "25ch" }}
                value={valuesRegister.username}
                onChange={handleChange("username")}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      {" "}
                      <BadgeIcon />
                    </InputAdornment>
                  )
                }}
              />
              <TextField
                required
                label="Email"
                id="outlined-start-adornment"
                sx={{ m: 1, width: "25ch" }}
                value={valuesRegister.mail}
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
                  type={valuesRegister.showPassword ? "text" : "password"}
                  value={valuesRegister.password}
                  onChange={handleChange("password")}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {valuesRegister.showPassword ? (
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
          <Button onClick={handleClickCansel}>Cancel</Button>
          <Button onClick={handleRegister}>Registration</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
