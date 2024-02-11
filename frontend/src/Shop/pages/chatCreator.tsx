import { UserContextType, MyPaymentMetadata } from "../components/Types";
import { onCancel, onError, onReadyForServerApproval, onReadyForServerCompletion } from "../components/Payments";
import Header from "../components/Header";
import { UserContext } from "../components/Auth";
import React from "react";
import Typography from "@mui/material/Typography";
import Posts from "../components/posts";
import PostContent from "../components/PostContent";
import { useLocation } from 'react-router-dom';
import Comments from "../components/comments";
import SignIn from "../components/SignIn";


export default function ChatCreator() {
  const { user, saveUser, showModal, saveShowModal, onModalClose } = React.useContext(UserContext) as UserContextType;
  const location = useLocation();
  const communityId = location.state.communityId;
  console.log(communityId);

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
        <Typography variant="h5" margin={2}  color="#9E4291" style={{ fontWeight: 'bold' } }>
        {communityId && (
          <Typography variant="h5" margin={2} color="#9E4291" style={{ fontWeight: 'bold' }}>
            {communityId.name || "Welcome!"}
          </Typography>
        )}
        </Typography>
        <PostContent communityId={communityId}/>
        <Posts communityId={communityId} />

        { showModal && <SignIn onSignIn={saveUser} onModalClose={onModalClose} showModal={showModal}/> }
    </>
);

};
// Created by Georgina Alacaraz
