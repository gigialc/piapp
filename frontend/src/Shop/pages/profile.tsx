// Created by Georgina Alacaraz
import { UserContextType, MyPaymentMetadata , CommunityType} from "../components/Types";
import { onCancel, onError, onReadyForServerApproval, onReadyForServerCompletion } from "../components/Payments";
import SignIn from "../components/SignIn";
import Header from "../components/Header";
import Typography from "@mui/material/Typography";
import { UserContext } from "../components/Auth";
import React, { useEffect, useState } from "react";
import MuiBottomNavigation from "../../MuiBottomNavigation";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Bloodtype } from "@mui/icons-material";
import { Button, Divider } from "@mui/material";
import {UserData } from "../components/Types";
import Dialog from '@mui/material/Dialog'; // Import Dialog component
import MuiForm from "../components/MuiForm";
import { Fab } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

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
  console.log("User Data :" , userData);
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
  const handleCommunityClick = (community: CommunityType) => {
    // get the community id and make it a current session
    console.log(community._id);
    navigate("/ChatCreator", { state: { communityId: community._id } });
  };

  const handleCommunityClick1 = (community: CommunityType) => {
   
    console.log(community._id);
    navigate("/Chat", { state: { communityId: community._id } });
  };

   // Function to open the modal
   const handleOpenFormModal = () => {
    setOpenFormModal(true);
  };

  // Function to close the modal
  const handleCloseFormModal = () => {
    setOpenFormModal(false);
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
        {/* Profile Section */}
        <div>
          <Typography variant="h6" style={{ fontWeight: 'bold', color: '#E69BD1', marginBottom: '16px' }}>
           Welcome to your profile, {user.username}!  
          </Typography>
        </div>
        {/* Your Communities Section */}
        <div>
          <Typography style={{ marginBottom: '16px', fontWeight: "bold" }}>
            my communities
          </Typography>
          <Fab
                aria-label="add"
                size="small"
                style={{
                    backgroundColor: "#ffe6ff",
                    color: "black",
                    position: 'absolute',
                    right: '20px',
                    top: '150px',
                    boxShadow: 'none',
                }}
                onClick={handleOpenFormModal}
            >
                <AddIcon />
            </Fab>

            <Dialog open={openFormModal} onClose={handleCloseFormModal} maxWidth="sm" fullWidth>
            <MuiForm/>  
           </Dialog>  
           <List>
                {createCommunityData ? (
                  createCommunityData.map((community) => (
                    <ListItem key={community._id}  onClick={() => handleCommunityClick(community)} style={{ backgroundColor: 'white', marginBottom: '10px', borderRadius: '4px', boxShadow: '0 2px 4px rgba(255, 182, 193, 0.2), 0 2px 4px rgba(0,0,0,0.1)'
                  }}>
                      <ListItemText primary={community.name} secondary={community.description}  />
                    </ListItem>
                  ))
                ) : (
                  <Typography variant="body1">No community data available</Typography>
                )}
              </List>
            </div>

            {/* Joined Communities Section */}
            <div>
              <Typography style={{ marginBottom: '16px', fontWeight: "bold"}}>
                subscribed communities
              </Typography>
              <List>
                {selectedCommunity ? (
                  selectedCommunity.map((community) => (
                    <ListItem key={community._id} button onClick={() => handleCommunityClick1(community)} style={{ backgroundColor: 'white', marginBottom: '10px', borderRadius: '4px',boxShadow: '0 2px 4px rgba(255, 182, 193, 0.2), 0 2px 4px rgba(0,0,0,0.1)'
                  }}>
                      <ListItemText primary={community.name} secondary={community.description}/>
                    </ListItem>
                  ))
                ) : (
                  <Typography variant="body1">No community data available</Typography>
                )}
              </List>
            </div>
        </div>
  
      {/* SignIn Modal */}
      {showModal && <SignIn onSignIn={saveUser} onModalClose={onModalClose} showModal={showModal} />}
  
      {/* Bottom Navigation */}
      <MuiBottomNavigation />
    </>
  );
}