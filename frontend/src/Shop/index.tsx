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
  const { user, saveUser, showModal, saveShowModal, onModalClose } = React.useContext(UserContext) as UserContextType;

  const [createCommunityData, setCreateCommunityData] = useState<CommunityType[] | null>(null);


  const orderProduct = async (memo: string, amount: number, paymentMetadata: MyPaymentMetadata) => {
    if(user.uid === "") {
      return saveShowModal(true);

    }

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
    
    <Header/>
    
    <Typography variant="h5" margin={2} color="#9E4291" >
            Communities
        </Typography>
      

      { createCommunityData ?
      createCommunityData.map((order) =>{    
        console.log(order);
        return <ProductCard 
          name={order.name}
          description={order.description}
          price={order.price}
          onClickBuy={() => orderProduct("Community", order.price, { community_id: order._id, user_id: user.uid })}
        />
      })
      :
      <ProductCard
        name="Loading.. ."
        description="Loading..."
        price={0}
        onClickBuy={() => console.log('Buy clicked')} // Pass the createCommunityData prop here
      />
     /* :
      community.length === 0 ?
      <ProductCard
        name="None"
        description="No new communities"
        price={0}
        onClickBuy={() => console.log('Buy clicked')} // Pass the createCommunityData prop here
      /> */

 }

{ showModal && <SignIn onSignIn={saveUser} onModalClose={onModalClose} showModal={showModal}/> }

<MuiBottomNavigation/>
</>
);
};
