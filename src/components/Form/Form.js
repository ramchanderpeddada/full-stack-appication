import {
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../../actions/posts";
import { useNavigate } from "react-router-dom";

function Form({ currentId, setCurrentId }) {
  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });

  const clear = () => {
    setCurrentId(0);
    setPostData({
      title: "",
      message: "",
      tags: [],
      selectedFile: "",
    });
  };

  const post = useSelector((s) =>
    currentId ? s.posts.find((p) => p._id === currentId) : null
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("profile"));

  useEffect(() => {
    if (!post?.title) clear();
    if (post) setPostData(post);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentId === 0) {
      dispatch(createPost({ ...postData, name: user?.result?.name }, navigate));
      clear();
    } else {
      dispatch(
        updatePost(currentId, { ...postData, name: user?.result?.name })
      );
      clear();
    }
  };

  if (!user?.result?.name) {
    return (
      <Paper>
        <Typography variant="h6" align="center">
          Please Sign In to create your own memories
        </Typography>
      </Paper>
    );
  }

  return (
    <>
      <Paper
        sx={{
          padding: "20px",
          borderRadius: "15px",
        }}
      >
        <form
          autoComplete="off"
          noValidate
          onSubmit={handleSubmit}
          style={{
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <Stack spacing={3} sx={{ width: "100%" }}>
            <Typography variant="h6" sx={{ textAlign: "center" }}>
              {currentId ? `Editing "${post.title}"` : "Creating a Memory"}
            </Typography>

            <TextField
              name="title"
              variant="outlined"
              label="Title"
              fullWidth
              value={postData.title}
              onChange={(e) =>
                setPostData({ ...postData, title: e.target.value })
              }
            />
            <TextField
              name="message"
              variant="outlined"
              label="Message"
              multiline
              rows={3}
              fullWidth
              value={postData.message}
              onChange={(e) =>
                setPostData({ ...postData, message: e.target.value })
              }
            />
            <TextField
              name="tags"
              variant="outlined"
              label="Tags (Comma separated)"
              fullWidth
              value={postData.tags}
              onChange={(e) =>
                setPostData({ ...postData, tags: e.target.value.split(",") })
              }
            />
            <Box>
              <FileBase
                type="file"
                multiple={false}
                onDone={({ base64 }) =>
                  setPostData({ ...postData, selectedFile: base64 })
                }
              />
            </Box>
          </Stack>
          <Box mt={2}>
            <Button variant="contained" color="primary" type="submit" fullWidth>
              {currentId ? "Update" : "Create"}
            </Button>
          </Box>
          <Box mt={1}>
            <Button
              variant="contained"
              color="secondary"
              onClick={clear}
              fullWidth
            >
              Clear
            </Button>
          </Box>
        </form>
      </Paper>
    </>
  );
}

export default Form;
