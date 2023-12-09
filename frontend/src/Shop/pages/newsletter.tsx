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
        
               
    <div style={{ overflowY: 'auto', height: '150vh',marginLeft: '20px' }}>

{/* Add "blog posts" heading */}


<h2>Body Image</h2>
<div style={{ display: "flex", overflowX: "auto" }}>
{/* Scrollable container for text boxes */}
<div style={{ display: "flex", marginRight: "10px" }}>
{/* First text box content */}
<Paper style={{ display: 'flex', flexDirection: 'column', width: "200px", padding: "10px", marginRight: "10px", backgroundColor: "pink" }}>
<Typography variant="h6"> {/* Adjust the variant and style as needed for the title */}
  The Impact of Social Media on Body Image
</Typography>
<Typography variant="body2"> 
  Ever had doubts when posting your body on social media? Read this blog post to learn more about the negative side of social media and how we can avoid it.
</Typography>
<div style={{ marginTop: 'auto' }}> {/* Add this div for bottom alignment */}
<Button variant='contained' color='secondary'sx={{ backgroundColor: 'pink', marginBottom: '16px', width: '100%'}} onClick={() => handleClick('/mybody')}>
    Read Now
  </Button>
</div>
</Paper>

{/* Add "my communities" heading */}
<h2>Sex Education</h2>
<div style={{ display: "flex", overflowX: "auto" }}>
{/* Scrollable container for text boxes */}
<div style={{ display: "flex", marginRight: "10px" }}>
{/* First text box content for "My Communities" */}
<Paper style={{ display: 'flex', flexDirection: 'column', width: "200px", padding: "10px", marginRight: "10px", backgroundColor: "pink" }}>
<Typography variant="h6"> {/* Adjust the variant and style as needed for the title */}
All you need to know about healthy relationships</Typography>
<Typography variant="body2"> {/* Adjust the variant and style as needed for the description */}
Embarking on a journey to prioritize your sexual health and empowering you through resources. Read on to learn more</Typography>
<div style={{ marginTop: 'auto' }}> {/* Add this div for bottom alignment */}
<Button variant='contained' color='secondary'sx={{ backgroundColor: 'pink', marginBottom: '16px', width: '100%'}} onClick={() => handleClick('/sexed')}>
    Read Now
  </Button>
</div>
</Paper>

{/* Add more text boxes as needed */}
</div>
</div>



{/* Add more text boxes for "My Communities" as needed */}
</div>
</div>
<h2>3</h2>
<div style={{ display: "flex", overflowX: "auto" }}>
{/* Scrollable container for text boxes */}
<div style={{ display: "flex", marginRight: "10px" }}>
{/* First text box content */}
<Paper style={{ display: 'flex', flexDirection: 'column', width: "200px", padding: "10px", marginRight: "10px", backgroundColor: "pink" }}>
<Typography variant="h6"> {/* Adjust the variant and style as needed for the title */}
  The Impact of Social Media on Body Image
</Typography>
<Typography variant="body2"> 
  Ever had doubts when posting your body on social media? Read this blog post to learn more about the negative side of social media and how we can avoid it.
</Typography>
<div style={{ marginTop: 'auto' }}> {/* Add this div for bottom alignment */}
<Button variant='contained' color='secondary'sx={{ backgroundColor: 'pink', marginBottom: '16px', width: '100%'}} onClick={() => handleClick('/mybody')}>
    Read Now
  </Button>
</div>
</Paper>

{/* Add more text boxes as needed */}
</div>
</div>
<h2>4</h2>
<div style={{ display: "flex", overflowX: "auto" }}>
{/* Scrollable container for text boxes */}
<div style={{ display: "flex", marginRight: "10px" }}>
{/* First text box content */}
<Paper style={{ display: 'flex', flexDirection: 'column', width: "200px", padding: "10px", marginRight: "10px", backgroundColor: "pink" }}>
<Typography variant="h6"> {/* Adjust the variant and style as needed for the title */}
  The Impact of Social Media on Body Image
</Typography>
<Typography variant="body2"> 
  Ever had doubts when posting your body on social media? Read this blog post to learn more about the negative side of social media and how we can avoid it.
</Typography>
<div style={{ marginTop: 'auto' }}> {/* Add this div for bottom alignment */}
<Button variant='contained' color='secondary'sx={{ backgroundColor: 'pink', marginBottom: '16px', width: '100%'}} onClick={() => handleClick('/mybody')}>
    Read Now
  </Button>
</div>
</Paper>

{/* Add more text boxes as needed */}
</div>
</div>

</div>     
       { showModal && <SignIn onSignIn={saveUser} onModalClose={onModalClose} showModal={showModal}/> }

        <MuiBottomNavigation />
    </>
);

};