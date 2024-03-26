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
import { IconButton } from '@mui/material';
import HeartIcon from '@mui/icons-material/Favorite';
import Box from '@mui/material/Box';
import { TextField } from '@mui/material';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { useNavigate } from 'react-router-dom';
import navigate from 'react-router-dom';
import Posts from './posts';

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
  const [post, setPost] = useState<any>(null);
  const [postLikes, setPostLikes] = useState(0);
  const [commentLikes, setCommentLikes] = useState<number[]>([]);
  const [index, setIndex] = useState<number>(0);
  const navigate = useNavigate();
  
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
  }, [postId]);

  // Function to handle post like
 
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
 
  const handleNavigatePublicProfile = (userId: string) => {
    navigate(`/publicProfile/${userId}`);
  }
  
  useEffect(() => {
    if (!postId) return; // Add a guard clause if communityId is not set
  console.log(postId);
    axiosClient.get(`/posts/post/${postId}`) // Use template literals to inject communityId
      .then((response) => {
        console.log(response.data);
        setPost(response.data); // Assuming you want to set the entire response object
      })
      .catch((error) => {
        console.error(error);
      });
  }, [postId]);
  
  return (
    <div style={{ maxWidth: '600px', margin: '1', textAlign: 'left' }}>
      {post?.title && (
        <>
          <Typography variant="h5" margin={1} style={{ color: '#9E4291', fontWeight: 'bold' }}>
            {post.title}
          </Typography>
        </>
      )}
      {post?.description && (
        <Typography variant="body1" margin={1} style={{ color: 'black' }}>
          {post.description}
        </Typography>
      )}
      {/* Like button for the post */}
      <IconButton aria-label="like comment" onClick={() => handleCommentLike(index)} style={{ marginLeft: '8px' }}>
              <HeartIcon style={{ fontSize: '16px', fill: 'white', stroke: 'black', strokeWidth: '2px' }} />
              <Typography variant="body2" style={{ color: 'gray', marginLeft: '4px' }}>{commentLikes[index]}</Typography>
        </IconButton>
      <br />
      <br />
      {/* Comments */}
      {comment.length > 0 ? (
        comment.map((comment, index) => (
          <Paper
            key={index}
            elevation={3}
            sx={{
              backgroundColor: 'transparent', // Set background color to transparent
              marginBottom: '8px',
              padding: '12px',
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
            }}
          >

              <Typography variant="body1" sx={{ color: 'black', flex: '1', fontWeight: '400', lineHeight: '1.4' }}>
              <Button
                  onClick={() => handleNavigatePublicProfile(comment.user.username)} 
                  style={{ fontWeight: 'bold', color: '#9E4291', textTransform: 'none' }}
                >
                  {comment.user.username|| 'Anonymous'}:
                </Button>
                {comment.content}
              </Typography>
            {/* Like button for the comment */}
            <IconButton aria-label="like comment" onClick={() => handleCommentLike(index)} style={{ marginLeft: '8px' }}>
              <HeartIcon style={{ fontSize: '16px', fill: 'white', stroke: 'black', strokeWidth: '2px' }} />
              <Typography variant="body2" style={{ color: 'gray', marginLeft: '4px' }}>{commentLikes[index]}</Typography>
            </IconButton>
          </Paper>
        ))
      ) : (
        // Display a message if there are no comments
        <Typography variant="subtitle2" style={{ marginTop: '5px', fontStyle: "italic", color: '#9E4291' }}>
          There are no comments, be the first :)
        </Typography>
      )}
    </div>
  );
};

  

