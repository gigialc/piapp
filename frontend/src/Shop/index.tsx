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



export default function HomePage() {
  const { user, saveUser, showModal, saveShowModal, onModalClose, community } = React.useContext(UserContext) as UserContextType;

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
    fetch('/hi')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(communitiesArray => {
        // Set the fetched data to state
        setCreateCommunityData(communitiesArray);
      })
      .catch(error => {
        // Handle any errors
        console.error('There has been a problem with your fetch operation:', error);
      });
  }, []);

return(
    <>
    <Header/>
    
    <Typography variant="h4" margin={3} color="hotpink"> 
        </Typography>
      <h1>Create Community</h1>

      {createCommunityData === null ?
      <ProductCard
        name="Loading..."
        description="Loading..."
        price={0}
        onClickBuy={() => console.log('Buy clicked')} // Pass the createCommunityData prop here
      />
      :
      community.length === 0 ?
      <ProductCard
        name="None"
        description="No new communities"
        price={0}
        onClickBuy={() => console.log('Buy clicked')} // Pass the createCommunityData prop here
      />
      :
      createCommunityData.map((order: CommunityType) =>{    
        <ProductCard
          name={order.name}
          description={order.description}
          price={order.price}
          onClickBuy={() => orderProduct("Community", order.price, { community_id: order._id })}
        />
      })
    }
           
       { showModal && <SignIn onSignIn={saveUser} onModalClose={onModalClose} showModal={showModal}/> }

    <MuiBottomNavigation/>
    </>
);

};

