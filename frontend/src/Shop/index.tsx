// Created by Georgina Alacaraz
import MuiBottomNavigation from "../MuiBottomNavigation";
import Header from "./components/Header";
import { Box, Grid, Typography } from "@mui/material";
import { UserContextType, MyPaymentMetadata , CommunityType} from "./components/Types";
import { onCancel, onError, onReadyForServerApproval, onReadyForServerCompletion } from "./components/Payments";
import SignIn from "./components/SignIn";
import ProductCard from "./components/ProductCard";
import { UserContext } from "./components/Auth";
import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

// testing to link blog posts to blog pages

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

export default function HomePage() {
  const { user, saveUser, showModal, saveShowModal, onModalClose } = React.useContext(UserContext) as UserContextType; // also added this!!!!!!
  const [createCommunityData, setCreateCommunityData] = useState<CommunityType[] | null>(null);;
  const [selectedCommunity, setSelectedCommunity] = useState<CommunityType | null>(null);
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
    //make a payment
    //const payment = await window.Pi.createPayment(paymentData, callbacks);

    // Make an API call to add person to the community if the payment was successful
    //if (payment.paymentCompleted === true){
      console.log("Payment was successful");
        axiosClient.post('/user/addUser', paymentMetadata)
            .then((response) => {
            console.log(response);
             // Redirect to the chat page
              navigate("/Chat", { state: { communityId: selectedCommunity?._id } });
            })
            .catch((error) => {
            console.log(error);
            });
         //}
  }

  useEffect(() => {
    console.log(createCommunityData);
  }, [createCommunityData]);
  

  useEffect(() => {
    // Make an API call to fetch the create community data
    axiosClient.get('/community/hi')
            .then((response) => {
            console.log(response);
            setCreateCommunityData(response.data);
            })
            .catch((error) => {
            console.log(error);
            });
        }
    
    , []);


return(
  <>
  <Header />
  <Typography variant="h5" margin={2} style={{ color: '#9E4291', fontWeight: 'bold' }}>
    Communities
  </Typography>

  {createCommunityData ? (
    createCommunityData.map((community) => {
      console.log(community);
      return (
        <ProductCard 
          key={community._id} // Make sure to include a unique key prop for each element in the array
          name={community.name}
          description={community.description}
          price={community.price}
          community={community}
        />
      );
    })
  ) : (
    <Typography variant="body1" style={{ color: '#ff69b4' }}>No community data available</Typography>
  )}

{ showModal && <SignIn onSignIn={saveUser} onModalClose={onModalClose} showModal={showModal}/> }

<MuiBottomNavigation/>
</>
);
}

