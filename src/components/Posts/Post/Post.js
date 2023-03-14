import {
  Button,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import moment from "moment";
import {
  Delete,
  Edit,
  MoreHoriz,
  ThumbUpAlt,
  ThumbUpAltOutlined,
} from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { deletePost, likePost } from "../../../actions/posts";
import { StyledCard } from "./styles";

function Post({ post, setCurrentId }) {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));

  // const Likes = () => {
  //   if (post.likes.length > 0) {
  //     return post.likes.find((like) => like === user.result._id) ? (
  //       <>
  //         <ThumbUpAlt fontSize="small" />
  //         {post.likes.length > 2
  //           ? `You and ${post.likes.length - 1} others`
  //           : `${post.likes.length > 1 ? "s" : ""}`}
  //       </>
  //     ) : (
  //       <>
  //         <ThumbUpAltOutlined fontSize="small" />
  //         {post.likes.length} {post.likes.length === 1 ? "Like" : "Likes"}
  //       </>
  //     );
  //   }
  //   return (
  //     <>
  //       <ThumbUpAltOutlined fontSize="small" />
  //       Like
  //     </>
  //   );
  // };
  return (
    <>
      <StyledCard>
        <CardMedia
          image={post?.selectedFile}
          title={post?.title}
          sx={{
            height: 0,
            paddingTop: "56.25%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            backgroundBlendMode: "darken",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: "20px",
            left: "20px",
            color: "white",
          }}
        >
          <Typography variant="h6">{post?.name}</Typography>
          <Typography variant="body2">
            {moment(post?.createdAt).fromNow()}
          </Typography>
        </Box>
        <Box
          sx={{
            position: "absolute",
            top: "20px",
            right: "0px",
            color: "white",
          }}
        ></Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            margin: "20px",
          }}
        >
          <Typography variant="body2" color="textSecondary" component="h2">
            {post?.tags.map((tag) => `#${tag} `)}
          </Typography>
        </Box>
        <Typography
          gutterBottom
          variant="h5"
          component="h2"
          sx={{
            padding: "0 16px",
          }}
        >
          {post?.title}
        </Typography>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {post?.message}
          </Typography>
        </CardContent>
        <CardActions
          sx={{
            padding: "0 16px 8px 0px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* <Button
            size="small"
            onClick={() => dispatch(likePost(post._id))}
            disabled={!user?.result}
          >
            <Likes />
          </Button> */}
          {user?.result._id === post.creator && (
            <>
              <Button size="small" onClick={() => setCurrentId(post?._id)}>
                <Edit fontSize="default" color="primary" />
                Edit
              </Button>
              <Button
                size="small"
                color="secondary"
                onClick={() => dispatch(deletePost(post._id))}
              >
                <Delete fontSize="small" />
                Delete
              </Button>
            </>
          )}
        </CardActions>
      </StyledCard>
    </>
  );
}

export default Post;
