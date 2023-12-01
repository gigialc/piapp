

// Created by Georgina Alacaraz
import { UserContextType, MyPaymentMetadata } from "../components/Types";
import { onCancel, onError, onReadyForServerApproval, onReadyForServerCompletion } from "../components/Payments";
import MuiBottomNavigation from "../../MuiBottomNavigation";
import SignIn from "../components/SignIn";
import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import Typography from "@mui/material/Typography";
import { UserContext } from "../components/Auth";
import React from "react";
import Mybodycard from "../components/mybodycard";

/* DEVELOPER NOTE:
* this page facilitates the purchase of pies for pi. all of the callbacks
* can be found on the Payments.tsx file in components file. 
*/
export default function UserToAppPayments() {
  const { user, saveUser, showModal, saveShowModal, onModalClose } = React.useContext(UserContext) as UserContextType;

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


return(
    <>
        <Header/>
        
        <Typography variant="h5" margin={2} color="pink">
              Birth Control Methods 
        </Typography>
        <Mybodycard
            description="Why are so many people on social media so perfect?"
            price={10.99}
            onClickBuy={() => {
                // Handle buy button click
            }}
        />
        <Mybodycard
            description="How do I become more confident in my own skin?"
            price={10.99}
            onClickBuy={() => {
                // Handle buy button click
            }}
        />
        <Mybodycard
            description="Why are so many people on social media so perfect?"
            price={10.99}
            onClickBuy={() => {
                // Handle buy button click
            }}
        />
        
            
        
       { showModal && <SignIn onSignIn={saveUser} onModalClose={onModalClose} showModal={showModal}/> }

      <MuiBottomNavigation/>
    </>
);

};