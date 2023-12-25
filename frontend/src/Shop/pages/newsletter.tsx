// Created by Georgina Alacaraz
import { UserContextType, MyPaymentMetadata } from "../components/Types";
import { onCancel, onError, onReadyForServerApproval, onReadyForServerCompletion } from "../components/Payments";
import SignIn from "../components/SignIn";
import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import Typography from "@mui/material/Typography";
import { UserContext } from "../components/Auth";
import React from "react";
import MuiBottomNavigation from "../../MuiBottomNavigation";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useNavigate } from 'react-router-dom';
/* DEVELOPER NOTE:
* this page facilitates the purchase of pies for pi. all of the callbacks
* can be found on the Payments.tsx file in components file. 
*/


export default function UserToAppPayments() {
  const { user, saveUser, showModal, saveShowModal, onModalClose } = React.useContext(UserContext) as UserContextType;

  const navigate = useNavigate();

  const handleClick = (page: string) => {
    navigate(page);
  }

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
        
       <br></br>
        
               
    <div style={{ overflowY: 'auto', height: '150vh',marginLeft: '20px' , marginRight:"20px"}}>

{/* Add "blog posts" heading */}


{/* Add text boxes as needed */}

<div style={{ display: 'flex', alignItems: 'flex-start' }}>
  {/* First set of content */}
  <div style={{ marginRight: '10px', color:"#9E4291"}}>
    <h2>Body Image</h2>
    <div style={{ display: 'flex', overflowX: 'auto' }}>
      {/* Scrollable container for text box */}
      <Paper style={{ display: 'flex', flexDirection: 'column', width: '200px', padding: '10px', marginRight: '10px', backgroundColor: '	#ffb6d3' }}>
        <Typography variant="h6" color="#9E4291">
          The Impact of Social Media on Body Image
        </Typography>
        <Typography variant="body2">
          Ever had doubts when posting your body on social media? Read this blog post to learn more about the negative side of social media and how we can avoid it.
        </Typography>
        <div style={{ marginTop: 'auto' }}>
          <Button variant="contained" color="secondary" sx={{ backgroundColor:'#9E4291"', marginBottom: '16px', width: '100%', color:"black" }} onClick={() => handleClick('/mybody')}>
            Read Now
          </Button>
        </div>
      </Paper>
    </div>
  </div>

  {/* Second set of content */}
  <div style={{ marginRight: '15px' , color:"#9E4291"}}>
    <h2>Sex Education</h2>
    <div style={{ display: 'flex', overflowX: 'auto' }}>
      {/* Scrollable container for text box */}
      <Paper style={{ display: 'flex', flexDirection: 'column', width: '200px', padding: '10px', marginRight: '10px',backgroundColor: '	#ffb6d3' }}>
        <Typography variant="h6" color="#9E4291">
          All you need to know about healthy relationships, hi
        </Typography>
        <Typography variant="body2">
          Embarking on a journey to prioritize your sexual health and empowering you through resources. Read on to learn more.
        </Typography>
        <div style={{ marginTop: 'auto'  }}>
          <Button variant="contained" color="secondary" sx={{ backgroundColor: '#9E4291"', marginBottom: '16px', width: '100%' , color:"black"}} onClick={() => handleClick('/sexed')}>
            Read Now
          </Button>
        </div>
      </Paper>
    </div>
  </div>
</div>

</div>     
       { showModal && <SignIn onSignIn={saveUser} onModalClose={onModalClose} showModal={showModal}/> }

        <MuiBottomNavigation />
    </>
);

};