// Created by Georgina Alacaraz
import { UserContextType, MyPaymentMetadata } from "../components/Types";
import { onCancel, onError, onReadyForServerApproval, onReadyForServerCompletion } from "../components/Payments";
import SignIn from "../components/SignIn";
import MuiBottomNavigation from "../../MuiBottomNavigation";
import Header from "../components/Header";
import Typography from "@mui/material/Typography";
import { UserContext } from "../components/Auth";
import React from "react";
import MuiForm from "../components/MuiForm";
import PostContent from "../components/PostContent";
import Posts from "../components/posts";
import { useLocation } from 'react-router-dom';

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
  <Header />
  <div style={{ padding: '20px', marginBottom: '80px' }}>
  <Typography variant="h6" style={{ fontWeight: 'bold', color: '#E69BD1', marginBottom: '10px' }}>
        Create your own community ✨
    </Typography>
    <Typography  margin={1}  color="black" style={{ } }>
     Create your own community and start earning pi 💸
    </Typography>
  <MuiForm />
  </div>


  {/* { showModal && <SignIn onSignIn={saveUser} onModalClose={onModalClose} showModal={showModal}/> } */}
</>
);

};
// Created by Georgina Alacaraz