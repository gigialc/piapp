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

export default function  UserToAppPayments() {
  const { user, saveUser, showModal, saveShowModal, onModalClose } = React.useContext(UserContext) as UserContextType;
  const [createCommunityData, setCreateCommunityData] = useState<CommunityType[] | null>(null);
  const [selectedCommunity, setSelectedCommunity] = useState<CommunityType[] | null>(null); // Moved here
  const [userData, setUserData] = useState<UserData | null>(null);
  const [openFormModal, setOpenFormModal] = useState(false);
  const [username, setUsername] = useState(user.username || "anonymous");
  const [inputValue, setInputValue] = useState("");
  const [tabValue, setTabValue] = useState(0); // Default to the first tab
  const [showUpdate, setShowUpdate] = useState(false);
  const [bio, setBio] = useState(user.bio || "No bio yet");
  const [occupation, setOccupation] = useState(user.occupation || "No occupation yet");
  const [coins, setCoins] = useState(0);


  console.log("User Data :" , userData);
  console.log("User: ", user);
  console.log("User Data: ", user.username);
  console.log("User Data: ", user.bio);
  console.log("User Data: ", user.occupation);
  const navigate = useNavigate();
  
  const getGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour >= 0 && currentHour < 12) {
      return "Good Morning";
    } else if (currentHour >= 12 && currentHour < 18) {
      return "Good Afternoon";
    } else {
      return "Good Night";
    }
  };

   const handleUsernameChange = (event: any) => {
    setInputValue(event.target.value);
  };

  const updateUsername = () => {
    axiosClient.post('/user/update', { username: inputValue , bio: bio, occupation: occupation, coinbalance: coins})
      .then((response) => {
        console.log('Response data for /user/update:', response.data);
        setUsername(inputValue);
        setBio(bio);
      })
      .catch((error) => {
        console.error('Error updating username:', error);
      });
    console.log('Updating username to: ', inputValue);
    setShowUpdate(false);
  };

  const handleTabChange = (event: SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };
  
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
    };
    const payment = await window.Pi.createPayment(paymentData, callbacks);
    console.log(payment);
  }
  useEffect(() => {
    console.log(user);
  }
  , [user]);

  useEffect(() => {
    axiosClient.get('/user/me')
      .then((response) => {
        console.log('Response data for /user/me:', response.data);
        // If response.data is an array, we can use forEach
        if (Array.isArray(response.data)) {
          response.data.forEach((community: CommunityType) => {
            if (!community._id) {
              console.error('Community does not have _id:', community);
            }
          });
          setCreateCommunityData(response.data);
        } else {
          console.error('Expected an array for /user/me response data, but got:', response.data);
        }
      })  
      .catch((error) => {
        console.error('Error fetching /user/me:', error);
      });
    }
  , []);
  

  useEffect(() => {
    axiosClient.get('/user/joined')
      .then((response) => {
        console.log('Joined communities:', response.data);
        setSelectedCommunity(response.data);
      })  
      .catch((error) => {
        console.error('Error fetching joined communities:', error);
      });
  }, []);

  
  return (
    <>
      <Header />
      <div style={{ padding: '20px', marginBottom: '80px' }}>
        <Typography variant="h6" style={{ fontWeight: 'bold', color: '#E69BD1', marginBottom: '0px' }}>
          Welcome to your profile, {user.username} !
        </Typography>
        <EditProfile />
        <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          TabIndicatorProps={{style: {background:'pink'}}}
        >
            <Tab label="my communities"  style={{ textTransform: 'none' , fontSize: 15, color:"black"}}/>
            <Tab label="subscribed"style={{ textTransform: 'none' , fontSize: 15, color:"black"}} />
          </Tabs>
        </Box>
        {tabValue === 0 && <MyList />}
        {tabValue === 1 && <Subscribed />}
      </div>
      {/* Additional components like SignIn Modal and Bottom Navigation */}
    </>
  );
}