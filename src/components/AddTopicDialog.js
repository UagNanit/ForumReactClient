import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "./context";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { variables } from "./variables";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import PropTypes from "prop-types";

AddTopicDialog.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool
};

export default function AddTopicDialog(props) {
  const { onClose, open, post } = props;

  const [valuesText, setValuesText] = useState("");
  const [valuesName, setValuesName] = useState("");

  const { userConAuth, setUserConAuth } = useContext(UserContext);

  const handleChangeText = (event) => {
    setValuesText(event.target.value);
  };
  const handleChangeName = (event) => {
    setValuesName(event.target.value);
  };

  const handleClickCansel = () => {
    setValuesText("");
    setValuesName("");
    onClose();
  };

  const handleAddTopic = async () => {
    await fetch(variables.API_URL_AddTopic, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem(variables.tokenKey)}`
      },
      body: JSON.stringify({
        Name: valuesName,
        Text: valuesText,
        UserId: userConAuth.id
      })
    })
      .then(function (response) {
        if (response.status !== 200) {
          console.log(
            "Looks like there was a problem. Status Code: " + response.status
          );
        }

        onClose();
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
      <Dialog fullWidth open={open} onClose={onClose}>
        <DialogTitle>Add post</DialogTitle>
        <DialogContent>
          <Box
            sx={{
              margin: "5%",
              width: "90%",
              display: "flex",
              justifyContent: "center",
              flexDirection: "column"
            }}
          >
            <TextField
              margin="normal"
              id="nameTopic"
              label="Topic name"
              multiline
              minRows={2}
              value={valuesName}
              onChange={handleChangeName}
            />
            <TextField
              id="textTopic"
              label="Topic text"
              multiline
              minRows={4}
              value={valuesText}
              onChange={handleChangeText}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickCansel}>Cancel</Button>
          <Button onClick={handleAddTopic}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
