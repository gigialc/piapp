//Created by Georgina Alacaraz

import { Button, Grid } from '@mui/material';
import { StringDecoder } from 'string_decoder';
import { UserContextType } from './Types';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { UserContext } from './Auth';
import { MyPaymentMetadata } from './Types';
import { onReadyForServerApproval, onReadyForServerCompletion } from './Payments';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/Comment';
import { Card, CardContent, Typography } from '@mui/material';
//for community page

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

export default function CommentContent() {
  const { user, saveUser, showModal, saveShowModal, onModalClose } = React.useContext(UserContext) as UserContextType;
  const [comment, setComment] = useState (null);
  const location = useLocation();
  const postId = location.state.postId;
  console.log(postId);


    // get the posts that have the same community id as the current session
    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await axiosClient.get(`/posts/comments?post_id=${[postId]}`);
                setComment(response.data.posts || []);
            } catch (error) {
                console.error("Failed to fetch posts: ", error);
            }
        };
        fetchComments();
    }, [ ]);// Empty dependency array means this effect runs once on mount

  return (
    <div>
    <Grid container spacing={2} justifyContent="center">
        {Array.isArray(postId) && postId.map((post) => (
        
            <Card variant="outlined" sx={{ backgroundColor: '#ffe6ff', marginY: 2 }}>
              <CardContent>
                <Typography variant="h6" component="div" style={{ fontWeight: 'bold', color: '#333' }}>
                  {post.content}
                </Typography>
              </CardContent>
            </Card>
        
        ))}
      </Grid>
    </div>
  );
}
