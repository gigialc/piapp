// Created by Georgina Alacaraz
import React, { useContext, useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from "./Auth";
import { PostType, UserContextType } from "./Types";
import { set } from "mongoose";
import { Box, Grid, Typography, Card, CardContent } from '@mui/material';
import CommentContent from "./CommentContent";
import Comments from "./comments";
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/Comment';


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

  const handlePostClick = () => {

  };
 
  // Fetch posts when component mounts
  useEffect(() => {
    console.log(posts);
  }, [setPosts]);
  
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
      <Box sx={{ flexGrow: 1, margin: 3 }}>
      <Grid container spacing={2} justifyContent="center">
        {Array.isArray(posts) && posts.map((post) => (
          <Grid item xs={12} md={8} key={post._id}>
            <Card variant="outlined" sx={{ backgroundColor: '#ffe6ff', marginY: 2 }} onClick={() => handlePostClick()}>
              <CardContent>
                <Typography variant="h6" component="div" style={{ fontWeight: 'bold', color: '#333' }}>
                  {post.title}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {post.description}
                </Typography>
              </CardContent>
              <Comments/>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

