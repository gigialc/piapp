import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, Typography } from '@mui/material';
import Header from "../components/Header";
import Posts from "../components/posts";
import PostContent from "../components/PostContent";
import SignIn from "../components/SignIn";
import { UserContext } from "../components/Auth";
import { UserContextType } from "../components/Types";


interface WindowWithEnv extends Window {
  __ENV?: {
    backendURL: string,
    sandbox: "true" | "false",
  }
}

const _window: WindowWithEnv = window;
const backendURL = _window.__ENV && _window.__ENV.backendURL;

const axiosClient = axios.create({ baseURL: `${backendURL}`, timeout: 20000, withCredentials: true });

const config = { headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } };

export default function ChatCreator() {
  const { user, saveUser, showModal, saveShowModal, onModalClose } = useContext(UserContext) as UserContextType;
  const [community, setCommunity] = useState<any>(null);
  const [isFollowing, setIsFollowing] = useState<boolean>(false); // New state to track following status
  const navigate = useNavigate(); // Hook from react-router-dom to navigate programmatically
  const location = useLocation();
  const communityId = location.state.communityId;

  useEffect(() => {
    if (!communityId) return;
    axiosClient.get(`/community/community/${communityId}`)
      .then((response) => {
        setCommunity(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [communityId]);

  const handleFollow = () => {
    if (isFollowing) {
      // If already following, possibly implement "unfollow" logic here
      return;
    }
    // Assuming paymentMetadata needs to be defined or fetched before this call
    const paymentMetadata = {}; // Define or update this according to your actual data structure
    axiosClient.post('/user/addUser', paymentMetadata, config)
      .then((response) => {
        console.log(response);
        setIsFollowing(true); // Update follow status
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
  <Header />
  <div style={{ paddingTop: '20px', marginLeft: 20 }}> {/* Add padding here */}
    {community?.name && (
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: 2 }}>
        <Typography variant="h5" color="black" style={{ fontWeight: 'Bold' }}>
          🩷 {community.name}
        </Typography>
        <Button
          variant="contained"
          style={{ marginRight: 20, backgroundColor: '#9E4291', color: 'white' , borderRadius: 20}}
          onClick={handleFollow}
        >
          {isFollowing ? 'Following' : 'Follow'}
        </Button>
      </div>
    )}
    {community?.description && (
      <Typography variant="body1" style={{ color: '#9E4291', fontWeight: 'bold', marginLeft: 20 }}>
        {community.description}
      </Typography>
    )}
    <PostContent communityId={communityId} />
    <Posts communityId={communityId} />

    {showModal && <SignIn onSignIn={saveUser} onModalClose={onModalClose} showModal={showModal} />}
  </div>
</>

  );
}
