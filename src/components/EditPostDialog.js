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

EditPostDialog.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
  post: PropTypes.object
};

export default function EditPostDialog(props) {
  const { onClose, open, post } = props;

  const [valuesText, setValuesText] = useState("");

  const { userConAuth, setUserConAuth } = useContext(UserContext);

  useEffect(() => {
    console.log(post);
    setValuesText(post.text);
  }, [open]);

  const handleChangeText = (event) => {
    setValuesText(event.target.value);
  };

  const handleClickCansel = () => {
    setValuesText("");
    onClose();
  };

  const handleEditPost = async () => {
    await fetch(variables.API_URL_EditPost, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem(variables.tokenKey)}`
      },
      body: JSON.stringify({
        PostId: post.id,
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
        <DialogTitle>Edit post</DialogTitle>
        <DialogContent>
          <Box
            sx={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <div>
              <TextField
                id="outlined-start-adornment"
                multiline
                minRows={4}
                value={valuesText}
                onChange={handleChangeText}
              />
            </div>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickCansel}>Cancel</Button>
          <Button onClick={handleEditPost}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
