// Created by Georgina Alacaraz
import { UserContextType, MyPaymentMetadata , CommunityType} from "../components/Types";
import { onCancel, onError, onReadyForServerApproval, onReadyForServerCompletion } from "../components/Payments";
import SignIn from "../components/SignIn";
import Header from "../components/Header";
import Typography from "@mui/material/Typography";
import { UserContext } from "../components/Auth";
import React, { useEffect, useState } from "react";
import MuiBottomNavigation from "../../MuiBottomNavigation";
import ProfileCard from "../components/ProfileCard";
import axios from 'axios';


/* DEVELOPER NOTE:
* this page facilitates the purchase of pies for pi. all of the callbacks
* can be found on the Payments.tsx file in components file. 
*/

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
  const [selectedCommunity, setSelectedCommunity] = useState<CommunityType | null>(null); // Moved here

  const handleCommunityClick = (community: CommunityType) => {
    // You can do whatever you need with the selected community here
    // For example, update the state to store the selected community
    setSelectedCommunity(community);
    // Or you can perform some navigation or other actions
    // depending on your application's logic
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
        console.log(response);
        setCreateCommunityData(response.data);
      })  
      .catch((error) => {
        console.log(error);
      });
    }
  , []);

  return ( 
    <>
      <Header/>
      
      <Typography variant="h5" margin={2}  color="#9E4291" style={{ fontWeight: 'bold' } }>
        Profile
      </Typography>
      <Typography variant="h6" margin={2} style={{ fontWeight: 'bold' } }>
      Your Communities 
      </Typography >
      {createCommunityData ? (
      createCommunityData.map((community) =>{ 
        console.log(community);
      return(
        <div key={community._id}>
          <button onClick={() => handleCommunityClick(community)} 
           style={{
            backgroundColor: 'pink', // Background color
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
      {showModal && <SignIn onSignIn={saveUser} onModalClose={onModalClose} showModal={showModal}/>}

      <MuiBottomNavigation />
    </>
  );
}