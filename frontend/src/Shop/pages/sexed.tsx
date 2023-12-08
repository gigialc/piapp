
// Created by Paula Lopez Burgos and Beren Donmez
import { UserContextType, MyPaymentMetadata } from "../components/Types";
import { onCancel, onError, onReadyForServerApproval, onReadyForServerCompletion } from "../components/Payments";
import MuiBottomNavigation from "../../MuiBottomNavigation";
import SignIn from "../components/SignIn";
import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import Typography from "@mui/material/Typography";
import { UserContext } from "../components/Auth";
import React from "react";
import { useNavigate } from 'react-router-dom';
import { Button, Grid } from '@mui/material';

export default function UserToAppPayments() {

  const navigate = useNavigate();

  const handleClick = (page: string) => {
    navigate(page);
  }

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
        <Header />

    <Typography variant="h5" margin={2} color="pink">
      Sex Education
    </Typography>

    {/* Replace Mybodycard components with buttons */}
    <Button variant='contained' color='secondary'sx={{ backgroundColor: 'pink', marginBottom: '16px', width: '100%' }} onClick={() => handleClick('/socialmediaBlog')}>
    Sex Education
    </Button>

    <Button variant='contained' color='secondary'sx={{ backgroundColor: 'pink', marginBottom: '16px', width: '100%' }} onClick={() => handleClick('/BodyImage')}>
    Sex Education
    </Button>

    <Button variant='contained' color='secondary'sx={{ backgroundColor: 'pink', marginBottom: '16px', width: '100%'}} onClick={() => handleClick('/Blogilates')}>
    Sex Education
    </Button>

    <Button variant='contained' color='secondary'sx={{ backgroundColor: 'pink', marginBottom: '16px', width: '100%'}} onClick={() => handleClick('/Eatingdisorders')}>
    Sex Education
    </Button>
    {/* Remove the Mybodycard components */}

    {showModal && <SignIn onSignIn={saveUser} onModalClose={onModalClose} showModal={showModal} />}

    <MuiBottomNavigation />
    </>
  );
}