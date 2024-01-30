import { UserContextType, MyPaymentMetadata } from "../components/Types";
import { onCancel, onError, onReadyForServerApproval, onReadyForServerCompletion } from "../components/Payments";
import MuiBottomNavigation from "../../MuiBottomNavigation";
import Header from "../components/Header";
import { UserContext } from "../components/Auth";
import React from "react";
import Typography from "@mui/material/Typography";
import Comments from "../components/comments";
import Posts from "../components/posts";
import PostContent from "../components/PostContent";

/* DEVELOPER NOTE:
* this page facilitates the purchase of pies for pi. all of the callbacks
* can be found on the Payments.tsx file in components file. 
*/
export default function ChatCreator() {
  const { user, saveUser, showModal, saveShowModal, onModalClose } = React.useContext(UserContext) as UserContextType;

  const orderProduct = async (memo: string, amount: number, paymentMetadata: MyPaymentMetadata) => {
    if(user.uid === "") {
      return saveShowModal(true);
    }
    const paymentData = { amount, memo, metadata: { ...paymentMetadata, user_id: user.uid } };

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
        <Typography variant="h5" margin={2}  color="#ef9a9a" style={{ fontWeight: 'bold' } }>
        Welcome!
        </Typography>
        <PostContent name="Community Name" description="Community Description" />
        <Posts/>
        
    </>
);

};
// Created by Georgina Alacaraz
