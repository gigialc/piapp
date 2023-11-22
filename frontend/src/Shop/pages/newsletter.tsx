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
        
       <br></br>
        
               
    <div style={{ overflowY: 'auto', height: '150vh',marginLeft: '20px' }}>

{/* Add "blog posts" heading */}


<h2>Blog Posts</h2>
<div style={{ display: "flex", overflowX: "auto" }}>
{/* Scrollable container for text boxes */}
<div style={{ display: "flex", marginRight: "10px" }}>
{/* First text box content */}
<Paper style={{ display: 'flex', flexDirection: 'column', width: "200px", padding: "10px", marginRight: "10px", backgroundColor: "pink" }}>
<Typography variant="h6"> {/* Adjust the variant and style as needed for the title */}
  Body Image on Social Media
</Typography>
<Typography variant="body2"> {/* Adjust the variant and style as needed for the description */}
  Dive into the complex world of body image on social media! 📸💔 
</Typography>
<div style={{ marginTop: 'auto' }}> {/* Add this div for bottom alignment */}
  <Button variant="contained" color="secondary" size="small">
    Read Now
  </Button>
</div>
</Paper>

{/* Second text box content */}
<Paper style={{ display: 'flex', flexDirection: 'column', width: "200px", padding: "10px", marginRight: "10px", backgroundColor: "pink" }}>
<Typography variant="h6"> {/* Adjust the variant and style as needed for the title */}
  Body Image on Social Media
</Typography>
<Typography variant="body2"> {/* Adjust the variant and style as needed for the description */}
  Dive into the complex world of body image on social media! 📸💔 
</Typography>
<div style={{ marginTop: 'auto' }}> {/* Add this div for bottom alignment */}
  <Button variant="contained" color="secondary" size="small">
    Read Now
  </Button>
</div>
</Paper>

{/* Third text box content */}
<Paper style={{ display: 'flex', flexDirection: 'column', width: "200px", padding: "10px", marginRight: "10px", backgroundColor: "pink" }}>
<Typography variant="h6"> {/* Adjust the variant and style as needed for the title */}
  Body Image on Social Media
</Typography>
<Typography variant="body2"> {/* Adjust the variant and style as needed for the description */}
  Dive into the complex world of body image on social media! 📸💔 
</Typography>
<div style={{ marginTop: 'auto' }}> {/* Add this div for bottom alignment */}
  <Button variant="contained" color="secondary" size="small">
    Read Now
  </Button>
</div>
</Paper>

{/* Fourth text box content */}
<Paper style={{ display: 'flex', flexDirection: 'column', width: "200px", padding: "10px", marginRight: "10px", backgroundColor: "pink" }}>
<Typography variant="h6"> {/* Adjust the variant and style as needed for the title */}
  Body Image on Social Media
</Typography>
<Typography variant="body2"> {/* Adjust the variant and style as needed for the description */}
  Dive into the complex world of body image on social media! 📸💔 
</Typography>
<div style={{ marginTop: 'auto' }}> {/* Add this div for bottom alignment */}
  <Button variant="contained" color="secondary" size="small">
    Read Now
  </Button>
</div>
</Paper>
{/* Add more text boxes as needed */}
</div>
</div>


<div style={{ marginBottom: '20px' }}></div>

{/* Add "my communities" heading */}
<h2>My Communities</h2>
<div style={{ display: "flex", overflowX: "auto" }}>
{/* Scrollable container for text boxes */}
<div style={{ display: "flex", marginRight: "10px" }}>
{/* First text box content for "My Communities" */}
<Paper style={{ display: 'flex', flexDirection: 'column', width: "200px", padding: "10px", marginRight: "10px", backgroundColor: "pink" }}>
<Typography variant="h6"> {/* Adjust the variant and style as needed for the title */}
  Body Image on Social Media
</Typography>
<Typography variant="body2"> {/* Adjust the variant and style as needed for the description */}
  Dive into the complex world of body image on social media! 📸💔 
</Typography>
<div style={{ marginTop: 'auto' }}> {/* Add this div for bottom alignment */}
  <Button variant="contained" color="secondary" size="small">
    Read Now
  </Button>
</div>
</Paper>

{/* Second text box content for "My Communities" */}
<Paper style={{ display: 'flex', flexDirection: 'column', width: "200px", padding: "10px", marginRight: "10px", backgroundColor: "pink" }}>
<Typography variant="h6"> {/* Adjust the variant and style as needed for the title */}
  Body Image on Social Media
</Typography>
<Typography variant="body2"> {/* Adjust the variant and style as needed for the description */}
  Dive into the complex world of body image on social media! 📸💔 
</Typography>
<div style={{ marginTop: 'auto' }}> {/* Add this div for bottom alignment */}
  <Button variant="contained" color="secondary" size="small">
    Read Now
  </Button>
</div>
</Paper>
{/* Add more text boxes for "My Communities" as needed */}
</div>
</div>
</div>     
       { showModal && <SignIn onSignIn={saveUser} onModalClose={onModalClose} showModal={showModal}/> }

        <MuiBottomNavigation />
    </>
);

};