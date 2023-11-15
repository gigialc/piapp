// Created by Georgina Alacaraz
import MuiBottomNavigation from "../MuiBottomNavigation";
import Header from "./components/Header";
import { Box, Grid, Typography } from "@mui/material";
import { UserContextType, MyPaymentMetadata } from "./components/Types";
import { onCancel, onError, onReadyForServerApproval, onReadyForServerCompletion } from "./components/Payments";
import SignIn from "./components/SignIn";
import ProductCard from "./components/ProductCard";
import { UserContext } from "./components/Auth";
import React from "react";


export default function HomePage() {
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
    
    <Typography variant="h4" margin={3} color="hotpink"> 
        </Typography>
        <ProductCard
        name="What is menstruation?"
        description="A community dedicated to educate on menstruation."
        price={3}
        onClickBuy={() => orderProduct("Join", 3, { productId: 'apple_pie_1' })}
        />

        <ProductCard
        name="Lemon Meringue Pie"
        description="Non-contractual picture. We might have used oranges because we had no lemons. Order at your own risk."
        price={5}
        onClickBuy={() => orderProduct("Order Lemon Meringue Pie", 5, { productId: 'lemon_pie_1' })}
        /> 
                    
       { showModal && <SignIn onSignIn={saveUser} onModalClose={onModalClose} showModal={showModal}/> }

    <MuiBottomNavigation/>
    </>
);

};