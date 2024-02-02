// Created by Georgina Alacaraz
import React, { useContext, useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from "./Auth";
import { PostType, UserContextType } from "./Types";
import { set } from "mongoose";
import { Box, Grid, Typography, Card, CardContent } from '@mui/material';

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
      <Box sx={{ flexGrow: 1, margin: 3}}> {/* Adjusted for overall spacing */}
        <Grid container spacing={2} justifyContent="center">
          {Array.isArray(posts) && posts.map((post) => (
            <Grid item xs={12} md={8} key={post._id}> {/* Adjust grid sizing as needed */}
              <Card variant="outlined" sx={{ backgroundColor: '#ffe6ff', marginY: 2 }}>
                <CardContent>
                  <Typography variant="h6" component="div" style={{ fontWeight: 'bold', color: '#333' }}>
                    {post.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {post.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    );
    
}
