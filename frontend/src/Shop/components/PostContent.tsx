// Created by Georgina Alacaraz
import React, { useContext, useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from "./Auth";
import { PostType, UserContextType } from "./Types";
import { set } from "mongoose";

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

export default function PostContent() {
  const { user, saveUser, showModal, saveShowModal, onModalClose } = useContext(UserContext) as UserContextType;
  const navigate = useNavigate();
  const [posts, setPosts] = useState<PostType[]>([]);

  // Fetch posts when component mounts
  useEffect(() => {
    console.log(posts);
  }, [setPosts]);
  
  // get the posts that have the same community id as the current session
  useEffect(() => {
    // Make an API call to fetch the create community data
    axiosClient.get('/posts/posts1')
            .then((response) => {
            console.log(response);
            setPosts(response.data.posts || []);
            })
            .catch((error) => {
            console.log(error);
            });
        }
    , []); // Empty dependency array means this effect runs once on mount

    return (
      <Box>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h5" margin={2} color="#ef9a9a" style={{ fontWeight: 'bold' }}>
              {Array.isArray(posts) && posts.map((post) => (
                <React.Fragment key={post._id}>
                  <Typography variant="h6" color="black" style={{ fontWeight: 'bold' }}>
                    {post.title}
                  </Typography>
                  <Typography variant="body1" color="black">
                    {post.description}
                  </Typography>
                </React.Fragment>
              ))}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    );
    
}
