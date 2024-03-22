// Created by Georgina Alacaraz
import { UserContextType, MyPaymentMetadata , CommunityType} from "../components/Types";
import { onCancel, onError, onReadyForServerApproval, onReadyForServerCompletion } from "../components/Payments";
import Header from "../components/Header";
import Typography from "@mui/material/Typography";
import { UserContext } from "../components/Auth";
import React, { useEffect, useState,SyntheticEvent } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {UserData } from "../components/Types";
import { Tabs, Tab, Box } from "@mui/material";
import MyList from "../components/mylist";
import Subscribed from "../components/subscribed";
import { TextField, Button } from '@mui/material';
import EditProfile from "../components/editProfile";
import { useLocation } from 'react-router-dom';
import { Paper, Grid, Avatar, Link } from '@mui/material';

// Make TS accept the existence of our window.__ENV object - defined in index.html:
interface WindowWithEnv extends Window {
  __ENV?: {
    backendURL: string, // REACT_APP_BACKEND_URL environment variable
    sandbox: "true" | "false", // REACT_APP_SANDBOX_SDK environment variable - string, not boolean!
  }
}

const _window: WindowWithEnv = window;
const backendURL = _window.__ENV && _window.__ENV.backendURL;

const axiosClient = axios.create({ baseURL: `${backendURL}`, timeout: 20000, withCredentials: true});

const config = {headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'}};

export default function  PublicProfile() {
  const { user, saveUser, showModal, saveShowModal, onModalClose } = React.useContext(UserContext) as UserContextType;
  const [createCommunityData, setCreateCommunityData] = useState<CommunityType[] | null>(null);
  const [selectedCommunity, setSelectedCommunity] = useState<CommunityType[] | null>(null); // Moved here
  const [community, setCommunity] = useState<any>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [username, setUsername] = useState(user.username || "anonymous");
  const [bio, setBio] = useState(user.bio || "No bio yet");
  const [coins, setCoins] = useState(user.coinbalance || 0);
  const location = useLocation();
  const communityId = location.state?.communityId;
  const navigate = useNavigate();

  const orderProduct = async (memo: string, amount: number, paymentMetadata: MyPaymentMetadata) => {
    if (user.uid === "") {
      return saveShowModal(true);
    }
  

    // Define a state to track the selected community

    const paymentData = { amount, memo, metadata: paymentMetadata };
    const callbacks = {
      onReadyForServerApproval,
      onReadyForServerCompletion,
      onCancel,
      onError
    }
    const payment = await window.Pi.createPayment(paymentData, callbacks);
    console.log(payment);
  }

    useEffect(() => {
      if (!communityId) return;
      axiosClient.get(`/community/community/${communityId}`)
        .then((response) => {
          setCommunity(response.data);
          setUserData(response.data);

        })
        .catch((error) => {
          console.error(error);
        });
    }, [communityId]);


  
    return (
      <>
  <Header />
  <Paper style={{ padding: 16, margin: '16px auto', maxWidth: 600, boxShadow: 'none' }}>
    <Grid container direction="column" alignItems="center" justifyContent="center" spacing={2}>
      {community?.user && (
        <>
          <Grid item>
            <Avatar
              alt={community.user.username}
              // src={community.user.avatarUrl} // Uncomment and use the actual path to the avatar image
              sx={{ width: 100, height: 100 }} // Adjust size as needed
            />
          </Grid>
          <Grid item>
            <Typography variant="h5" component="h1" color="black" gutterBottom>
              @{community.user.username}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body1" color="textSecondary">
              {community.user.coinbalance} 💎
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body1">
              {community.user.bio || 'Bio not available.'}
            </Typography>
          </Grid>
        </>
      )}
    </Grid>
  </Paper>
</>

    );
  }
  
