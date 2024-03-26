// Created by Georgina Alacaraz
import React, { useContext, useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from "./Auth";
import { PostType, UserContextType } from "./Types";
import { set } from "mongoose";
import { Box, Grid, Typography, Card, CardContent } from '@mui/material';
import ButtonBase from '@mui/material/ButtonBase';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/Comment';
import { PodcastsOutlined, PostAddOutlined } from "@mui/icons-material";
import CommentContent from "./CommentContent";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { CardMedia } from '@mui/material';
import { CardActionArea } from '@mui/material';
import HeartIcon from '@mui/icons-material/Favorite';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';

interface WindowWithEnv extends Window {
  __ENV?: {
    backendURL: string, // REACT_APP_BACKEND_URL environment variable
    sandbox: "true" | "false", // REACT_APP_SANDBOX_SDK environment variable - string, not boolean!
  }
}

const _window: WindowWithEnv = window;
const backendURL = _window.__ENV && _window.__ENV.backendURL;

const axiosClient = axios.create({ baseURL: `${backendURL}`, timeout: 20000, withCredentials: true });
const config = { headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } };

export default function PostContent({ communityId }: { communityId: string }) {
  const { user, saveUser, showModal, saveShowModal, onModalClose } = useContext(UserContext) as UserContextType;
  const navigate = useNavigate();
  const [posts, setPosts] = useState<PostType[]>([]);
  const [postLikes, setPostLikes] = useState(posts.map(() => 0));
  const [commentLikes, setCommentLikes] = useState<number[]>([]);

  const location = useLocation();
  const postId = location.state.postId;
  console.log(postId);
 
  // Fetch posts when component mounts
  useEffect(() => {
    console.log(posts);
  }, [setPosts]);

  const handleCommentLike = (index: number) => {
    const updatedLikes = [...commentLikes];
    updatedLikes[index] += 1;
    setCommentLikes(updatedLikes);
  }

  // Function to handle comment like
  const handlePostLike = () => {
    const updatedLikes = [...postLikes];
    updatedLikes[0] += 1;
    setPostLikes(updatedLikes);
  };
  
  // get the posts that have the same community id as the current session
  useEffect(() => {
      const fetchPosts = async () => {
          try {
              const response = await axiosClient.get(`/posts/posts1?community_id=${communityId}`);
              setPosts(response.data.posts || []);
          } catch (error) {
              console.error("Failed to fetch posts: ", error);
          }
      };
      fetchPosts();
  }, [communityId]);// Empty dependency array means this effect runs once on mount

  return (
    <Box sx={{ flexGrow: 1, margin: 2 }}>
  <Grid container spacing={2}>
    {Array.isArray(posts) && posts.length > 0 ? (
      posts.map((post, index) => (
        <Grid item xs={12} key={post._id}>
          <Card sx={{ flexDirection: 'column', minHeight: 100, width: "100%", backgroundColor:'#efc9e4' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom align="left">
                {post.title}
              </Typography>
              <Typography variant="body1" color="text.secondary" align="left">
                {post.description}
              </Typography>
            </CardContent>
            <CardActions sx={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between' }}>
              {/* Like button */}
              <IconButton
                onClick={() => handleCommentLike(index)}
                aria-label="like post"
                style={{ position: 'relative' }}
              >
                <HeartIcon style={{ fontSize: '16px', fill: 'white', stroke: 'black', strokeWidth: "2px" }} />
                <Typography variant="body2" style={{ color: 'gray', marginLeft: '4px' }}>{commentLikes[index]}</Typography>
              </IconButton>
              {/* Comment button */}
              <div> {/* Wrap comment icon and button in a div */}
                <IconButton aria-label="add a comment" onClick={() => navigate("/comments", { state: { postId: post._id } })}>
                  <ChatBubbleOutlineIcon style={{ fontSize: '16px', fill: 'white', stroke: 'black'}} />
                </IconButton>
                <Typography variant="body2" sx={{ color: "#9E4291", display: 'inline', marginLeft: '4px' }}>
                  {post.comments.length}
                </Typography>
              </div>
            </CardActions>
          </Card>
        </Grid>
      ))
    ) : (
      <Grid item xs={12}>
        <Typography variant="body1" textAlign="center">
          There are no posts in this community :(
        </Typography>
      </Grid>
    )}
  </Grid>
</Box>

  );

};