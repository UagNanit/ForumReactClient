import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "./context";
import { useHistory } from "react-router-dom";
import { variables } from "./variables";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import EditPostDialog from "./EditPostDialog";

export default function Topic(props) {
  const { userConAuth, setUserConAuth } = useContext(UserContext);
  const [dataPosts, setDataPosts] = useState([]);
  const [valuePost, setValuePost] = useState({});
  const [openEdit, setOpenEdit] = useState(false);
  const [valueTextPost, setValueTextPost] = useState("");

  const handleClickOpenEdit = (event, value) => {
    setValuePost(value);
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
    getPosts();
  };

  let history = useHistory();

  useEffect(() => {
    getPosts();
  }, []);

  console.log(variables.API_URL_Posts + `/${props.match.params.id}`);
  async function getPosts() {
    await fetch(variables.API_URL_Posts + `/${props.match.params.id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(function (response) {
        if (response.status !== 200) {
          console.log(
            "Looks like there was a problem. Status Code: " + response.status
          );
        }

        response.json().then(function (data) {
          console.log(data);
          setDataPosts(data);
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("catch error Code: " + errorCode);
        console.log("catch error Message: " + errorMessage);
      });
  }

  const handleChangeText = (event) => {
    setValueTextPost(event.target.value);
  };

  const handleClickCreatePost = async () => {
    await fetch(variables.API_URL_AddPost, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem(variables.tokenKey)}`
      },
      body: JSON.stringify({
        Text: valueTextPost,
        UserId: userConAuth.id,
        TopicId: props.match.params.id
      })
    })
      .then(function (response) {
        if (response.status !== 200) {
          console.log(
            "Looks like there was a problem. Status Code: " + response.status
          );
        } else {
          setValueTextPost("");
          getPosts();
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("catch error Code: " + errorCode);
        console.log("catch error Message: " + errorMessage);
      });
  };

  return (
    <Box>
      <EditPostDialog
        open={openEdit}
        onClose={handleCloseEdit}
        post={valuePost}
      />
      <nav aria-label="main box folders">
        <List
          sx={{
            width: "100%",
            maxWidth: "80%",
            bgcolor: "background.paper",
            margin: "1%"
          }}
        >
          {dataPosts.map((data) => (
            <div key={data.id}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar
                    alt={data.userName}
                    src="/static/images/avatar/1.jpg"
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={data.userName}
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {new Date(data.dateCreation).toLocaleDateString()}
                        <br />
                      </Typography>
                      {data.text}
                      <br />
                      {(userConAuth?.isAdmin === true ||
                        userConAuth?.id === data.userId) && (
                        <Button
                          onClick={(event) => handleClickOpenEdit(event, data)}
                          size="small"
                          variant="outlined"
                          startIcon={<EditIcon />}
                        >
                          Edit
                        </Button>
                      )}
                    </React.Fragment>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
            </div>
          ))}
        </List>
        {userConAuth !== null && (
          <div>
            <TextField
              style={{
                display: "flex",
                height: "100%",
                width: "100%"
              }}
              id="outlined-multiline-static-Text"
              label="Post text"
              multiline
              minRows={2}
              value={valueTextPost}
              onChange={handleChangeText}
              name="Text"
            />
            <Button
              style={{
                display: "flex",
                height: "100%",
                alignItems: "start",
                width: "100%",
                justifyContent: "end"
              }}
              onClick={handleClickCreatePost}
            >
              create post
            </Button>
          </div>
        )}{" "}
      </nav>
    </Box>
  );
}
