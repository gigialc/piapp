import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, Typography } from '@mui/material';
import Header from "../components/Header";
import PostContent from "../components/PostContent";
import { UserContext } from "../components/Auth";
import { UserContextType } from "../components/Types";
import { CommunityType } from "../components/Types";

const _window: Window & typeof globalThis & { __ENV?: { backendURL: string, sandbox: "true" | "false" } } = window;
const backendURL = _window.__ENV?.backendURL;

const axiosClient = axios.create({ baseURL: `${backendURL}`, timeout: 20000, withCredentials: true });

interface Props {
  name: string,
  description: string,
  // price: number,
  community: CommunityType,
}

export default function Chat() {
  const { user, saveUser, showModal, saveShowModal, onModalClose } = useContext(UserContext) as UserContextType;
  const [community, setCommunity] = useState<any>(null);
  const [createCommunityData, setCreateCommunityData] = useState<CommunityType[] | null>(null);;
  const [selectedCommunity, setSelectedCommunity] = useState<CommunityType | null>(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const communityId = location.state?.communityId;

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
      axiosClient.post("/users/joined", { communityId: communityId })
        .then((response) => {
          console.log(response);
          setIsFollowing(false);
        })
        .catch((error) => {
          console.error(error);
        });

      return;
    }
  
    // Ensure this matches what your backend expects
    const data = {
      userId: user.uid, // Assuming user.uid is the unique identifier for the user
      communityId: communityId, // The ID of the community to follow
    };
  
    axiosClient.post('/user/addUser', data)
      .then((response) => {
        console.log('Response:', response);
        setIsFollowing(true); // Update following state based on response
        // Optionally, refresh or update the community data to reflect the new state
      })
      .catch((error) => {
        console.error('Error:', error);
      });

  //   //check if user is already subscribed to the community
  //   useEffect(() => {
  //     axiosClient.get(`/user/joined/${communityId}`, { params: { userId: user.uid } })
  //       .then((response) => {
  //         setIsFollowing(response.data.isFollowing);
  //         setIsFollowing(true);
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //         setIsFollowing(false);
  //       });
  //   }, [communityId, user]);
  }


  return (
    <>
      <Header />
      {community?.name && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: 2, paddingTop: 20 }}>
          <Typography variant="h5" color="black" style={{ fontWeight: 'Bold', marginLeft:15 }}>
            🩷 {community.name}
          </Typography>
          <Button
            variant="contained"
            style={{ marginRight: 20, backgroundColor: '#9E4291', color: 'white' , borderRadius: 20, display: 'inline-flex', height: '25px', textTransform: 'none'}}
            onClick= {handleFollow}
          >
            {isFollowing ? 'Subscribed' : 'Subscribe'}
          </Button>
        </div>
      )}
      {community?.description && (
        <Typography variant="body1" style={{ color: '#9E4291', marginLeft: 20,marginTop:15 }}>
          {community.description}
        </Typography>
      )}
      <PostContent communityId={communityId} />
    </>
  );
}
