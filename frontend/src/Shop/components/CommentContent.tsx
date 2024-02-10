//Created by Georgina Alacaraz

import { Button, Grid } from '@mui/material';
import { StringDecoder } from 'string_decoder';
import { UserContextType } from './Types';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { UserContext } from './Auth';
import { Paper } from '@mui/material';
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
  const [comment, setComment] = useState<{ content: string, user: { username: string } }[]>([]);
  const location = useLocation();
  const postId = location.state.postId;
  console.log(postId);

    // get the posts that have the same community id as the current session
    useEffect(() => {
      const fetchComments = async () => {
          try {
              const response = await axiosClient.get(`/comments/commentsByPostId?post_id=${postId}`);
              setComment(response.data.comments || []);
          } catch (error) {
              console.error("Failed to fetch comments: ", error);
          }
      };
      if (postId) { // Only fetch comments if postId is available
          fetchComments();
      }
  }, [postId]);// Empty dependency array means this effect runs once on mount

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', textAlign: 'center' }}>
      {comment.length > 0 ? (
        comment.map((comment, index) => (
          <Paper
            key={index}
            elevation={3}
            sx={{
              backgroundColor: 'white',
              marginY: 2,
              padding: 2,
              borderRadius: '40px',
              display: 'flex',
              justifyContent: 'flex-start',
              marginLeft: 'auto',
              marginRight: '0',
            }}
          >
            {/* Combine the username and comment content */}
            <Typography variant="body1" component="div" sx={{ wordBreak: 'break-word' }}>
              <span style={{ fontWeight: 'bold', marginRight: '8px' }}>
                {comment.user.username || 'Anonymous'}:
              </span>
              {comment.content}
            </Typography>
          </Paper>
        ))
      ) : (
        // Display a message if there are no comments
        <Typography variant="subtitle1" style={{ marginTop: '5px' }}>
          There are no comments, be the first :)
        </Typography>
      )}
    </div>
  );
};

  

