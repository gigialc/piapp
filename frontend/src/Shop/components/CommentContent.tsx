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
import CommentContent from './CommentContent';
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

export default function ProductCard() {
  const { user, saveUser, showModal, saveShowModal, onModalClose } = React.useContext(UserContext) as UserContextType;
  const [comment, setComment] = useState (null);
  const location = useLocation();
  const postId = location.state.postId;
  console.log(postId);

  const orderProduct = async (memo: string, amount: number, paymentMetadata: MyPaymentMetadata) => {
    if(user.uid === "") {
      return saveShowModal(true);

    }

    const paymentData = { amount, memo, metadata: paymentMetadata };
    const callbacks = {
      onReadyForServerApproval,
      onReadyForServerCompletion,
      //onCancel,
      //onError

    }


  // Fetch posts when component mounts
    useEffect(() => {
      console.log(comment);
    }, [setComment]);

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
    }, [postId]);// Empty dependency array means this effect runs once on mount


  return (
    <Grid container style={{ margin: 16, paddingBottom: 16, borderBottom: '1px solid pink' }}>
      <Grid container style={{ display: 'flex', flexDirection: 'row' }}>
        <Grid container style={{ width: "33%", marginRight: 8 }}>
        </Grid>
        <Grid item style={{ width: "90%" }}>

          <p>{ }</p>  
      </Grid>
      </Grid>
      <Grid item style={{textAlign: 'center', marginBottom: 5}}>
      </Grid>
    </Grid>
  )
}}