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
      <Header/>
      <div style={{ marginBottom: 80}} >
      <Typography variant="h5" margin={2}  color="#9E4291" style={{ fontWeight: 'bold'}}>
        Profile
      </Typography>

      <Typography fontSize={17} margin={1} style={{ fontWeight: 'bold'}}>
        {getGreeting()}👋  
        All of your communities in a single page
      </Typography>
{/* Add your user information rendering logic here */}
  {/* Horizontal Line */}
  <hr style={{ margin: '20px 0' }} />
      <Typography variant="h6" margin={2} >
      Your Communities 
      </Typography >
      {createCommunityData ? (
      createCommunityData.map((community) =>{ 
        console.log(community);
      return(
        <div key={community._id}>
          <button onClick={() => handleCommunityClick(community)} 
           style={{
            backgroundColor: '#ffe6ff', // Background color
            color: 'black', // Text color
            padding: 12, // Some padding
            margin: 12, 
          
          }}
        >
            {community.name}
          </button> 
          {/* 
          <ProfileCard
          key={community._id}
         name={community.name} _id={""} description={""}    /> 
      */}
          </div>

          
        );
  }) 
  ) : (
  <p>No community data available</p>
)}

 {/* Title for Joined Communities */}
 <Typography variant="h6" margin={2} >
      Joined Communities
    </Typography>
    {selectedCommunity ? (
      selectedCommunity.map((community) =>{ 
        console.log(community);
      return(
        <div key={community._id}>
          <button onClick={() => handleCommunityClick1(community)} 
           style={{
            backgroundColor: '#ffe6ff', // Background color
            color: 'black', // Text color
            padding: 12, // Some padding
            margin: 12, 
          }}
        >
            {community.name}
          </button> 
          {/* 
          <ProfileCard
          key={community._id}
         name={community.name} _id={""} description={""}    /> 
      */}
          </div>         
        );
  })
  ) : (
  <p>No community data available</p>
)}
</div>

{showModal && <SignIn onSignIn={saveUser} onModalClose={onModalClose} showModal={showModal}/>}
<MuiBottomNavigation />
</>
);
}