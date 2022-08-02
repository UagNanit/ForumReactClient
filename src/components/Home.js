import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "./context";
import { useHistory } from "react-router-dom";
import { variables } from "./variables";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AddIcon from "@mui/icons-material/Add";
import Divider from "@mui/material/Divider";
import TopicIcon from "@mui/icons-material/Topic";
import Button from "@mui/material/Button";
import AddTopicDialog from "./AddTopicDialog";

export default function Home() {
  const { userConAuth, setUserConAuth } = useContext(UserContext);
  const [dataTopics, setDataTopics] = useState([]);
  const [openAddPostDialog, setOpenAddPostDialog] = useState(false);
  let history = useHistory();

  useEffect(() => {
    getTopics();
  }, []);

  const handleClickOpenAddTopic = () => {
    setOpenAddPostDialog(true);
  };

  const handleCloseAddTopic = () => {
    setOpenAddPostDialog(false);
    getTopics();
  };

  const handleClickTopic = (event, value) => {
    history.push("/topic/" + value);
  };

  async function getTopics() {
    await fetch(variables.API_URL_Topics, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem(variables.tokenKey)}`
      }
    })
      .then(function (response) {
        if (response.status !== 200) {
          response.json().then(function (data) {
            console.log(data);
            console.log(
              "Looks like there was a problem. Status Code: " + response.status
            );
          });
        }
        response.json().then(function (data) {
          setDataTopics(data);
          console.log(data);
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("catch error Code: " + errorCode);
        console.log("catch error Message: " + errorMessage);
      });
  }

  return (
    <Box>
      <AddTopicDialog open={openAddPostDialog} onClose={handleCloseAddTopic} />
      <nav aria-label="main box folders">
        <List>
          {dataTopics.map((data) => (
            <div key={data.id}>
              <ListItem disablePadding>
                <ListItemButton
                  onClick={(event) => handleClickTopic(event, data.id)}
                >
                  <ListItemIcon>
                    <TopicIcon />
                  </ListItemIcon>
                  <ListItemText primary={data.name} />
                </ListItemButton>
              </ListItem>
              <Divider />
            </div>
          ))}
        </List>
        <br />
        {userConAuth !== null && (
          <Button
            onClick={handleClickOpenAddTopic}
            size="small"
            variant="outlined"
            startIcon={<AddIcon />}
          >
            Add topic
          </Button>
        )}
      </nav>
    </Box>
  );
}
