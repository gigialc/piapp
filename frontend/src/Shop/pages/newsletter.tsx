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
    
<h2 style={{ color: '#ef9a9a', fontFamily: 'comic-sans' }}>Body Image</h2>
<div style={{ display: "flex", overflowX: "auto" }}>
{/* Scrollable container for text boxes */}
<div style={{ display: "flex", marginRight: "10px" }}>
{/* First text box content */}
<Paper style={{ display: 'flex', flexDirection: 'column', width: "200px", padding: "10px", marginRight: "10px", backgroundColor: "pink",border: '2px solid #ef9a9a'}}>
<Typography variant="h6" style={{ fontFamily: 'Your Chosen Font', fontSize: '20px', marginBottom: '8px' }}>
  Why Do People on Social Media Seem So Perfect?
</Typography>
<Typography variant="body2"> 

</Typography>
<div style={{ marginTop: 'auto' }}> {/* Add this div for bottom alignment */}
<Button variant='contained' color='secondary'sx={{ backgroundColor: 'pink', marginBottom: '16px', width: '100%'}} onClick={() => handleClick('/SocialMediaBlog')}>
  Read More
</Button>
</div>
</Paper>

<div style={{ display: "flex", overflowX: "auto" }}>
{/* Scrollable container for text boxes */}
<div style={{ display: "flex", marginRight: "10px" }}>
{/* First text box content */}
<Paper style={{ display: 'flex', flexDirection: 'column', width: "200px", padding: "10px", marginRight: "10px", backgroundColor: "pink",border: '2px solid #ef9a9a'}}>
<Typography variant="h6" style={{ fontFamily: 'Your Chosen Font', fontSize: '20px', marginBottom: '8px' }}>
  Blogilates on Body Image
</Typography>
<Typography variant="body2"> 

</Typography>
<div style={{ marginTop: 'auto' }}> {/* Add this div for bottom alignment */}
<Button variant='contained' color='secondary'sx={{ backgroundColor: 'pink', marginBottom: '16px', width: '100%'}} onClick={() => handleClick('/Blogilates')}>
  Read More
</Button>
</div>
</Paper>

<div style={{ display: "flex", overflowX: "auto" }}>
{/* Scrollable container for text boxes */}
<div style={{ display: "flex", marginRight: "10px" }}>
{/* First text box content */}
<Paper style={{ display: 'flex', flexDirection: 'column', width: "200px", padding: "10px", marginRight: "10px",backgroundColor: "pink",border: '2px solid #ef9a9a'}}>
<Typography variant="h6" style={{ fontFamily: 'Your Chosen Font', fontSize: '20px', marginBottom: '8px' }}>
  "Perfect" Body Image Stereotypes in Society
</Typography>
<Typography variant="body2"> 

</Typography>
<div style={{ marginTop: 'auto' }}> {/* Add this div for bottom alignment */}
<Button variant='contained' color='secondary'sx={{ backgroundColor: 'pink', marginBottom: '16px', width: '100%'}} onClick={() => handleClick('/BodyImage')}>
  Read More
</Button>
</div>
</Paper>

<div style={{ display: "flex", overflowX: "auto" }}>
{/* Scrollable container for text boxes */}
<div style={{ display: "flex", marginRight: "10px" }}>
{/* First text box content */}
<Paper style={{ display: 'flex', flexDirection: 'column', width: "200px", padding: "10px", marginRight: "10px", backgroundColor: "pink",border: '2px solid #ef9a9a'}}>
<Typography variant="h6" style={{ fontFamily: 'Your Chosen Font', fontSize: '20px', marginBottom: '8px' }}>
  Social Media Use and Body Image Disorders
</Typography>
<Typography variant="body2"> 

</Typography>
<div style={{ marginTop: 'auto' }}> {/* Add this div for bottom alignment */}
<Button variant='contained' color='secondary'sx={{ backgroundColor: 'pink', marginBottom: '16px', width: '100%'}} onClick={() => handleClick('/Eatingdisorders')}>
  Read More
</Button>
</div>
</Paper>

</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div> 

<br />

<h2 style={{ color: '#ef9a9a', fontFamily: 'comic-sans' }}>Sex Education</h2>
<div style={{ display: "flex", overflowX: "auto" }}>
{/* Scrollable container for text boxes */}
<div style={{ display: "flex", marginRight: "10px" }}>
{/* First text box content */}
<Paper style={{ display: 'flex', flexDirection: 'column', width: "200px", padding: "10px", marginRight: "10px", backgroundColor: "pink",border: '2px solid #ef9a9a'}}>
<Typography variant="h6" style={{ fontFamily: 'Your Chosen Font', fontSize: '20px', marginBottom: '8px' }}>
  Contraception Methods and their Importance
</Typography>
<Typography variant="body2"> 

</Typography>
<div style={{ marginTop: 'auto' }}> {/* Add this div for bottom alignment */}
<Button variant='contained' color='secondary'sx={{ backgroundColor: 'pink', marginBottom: '16px', width: '100%'}} onClick={() => handleClick('/sexed')}>
  Read More
</Button>
</div>
</Paper>

<div style={{ display: "flex", overflowX: "auto" }}>
{/* Scrollable container for text boxes */}
<div style={{ display: "flex", marginRight: "10px" }}>
{/* First text box content */}
<Paper style={{ display: 'flex', flexDirection: 'column', width: "200px", padding: "10px", marginRight: "10px",backgroundColor: "pink",border: '2px solid #ef9a9a'}}>
<Typography variant="h6" style={{ fontFamily: 'Your Chosen Font', fontSize: '20px', marginBottom: '8px' }}>
  Sexual Education and Parenting
</Typography>
<Typography variant="body2"> 

</Typography>
<div style={{ marginTop: 'auto' }}> {/* Add this div for bottom alignment */}
<Button variant='contained' color='secondary'sx={{ backgroundColor: 'pink', marginBottom: '16px', width: '100%'}} onClick={() => handleClick('/sexed')}>
  Read More
</Button>
</div>
</Paper>

<div style={{ display: "flex", overflowX: "auto" }}>
{/* Scrollable container for text boxes */}
<div style={{ display: "flex", marginRight: "10px" }}>
{/* First text box content */}
<Paper style={{ display: 'flex', flexDirection: 'column', width: "200px", padding: "10px", marginRight: "10px", backgroundColor: "pink",border: '2px solid #ef9a9a'}}>
<Typography variant="h6" style={{ fontFamily: 'Your Chosen Font', fontSize: '20px', marginBottom: '8px' }}>
  Covid-19 vs Sexual Health
</Typography>
<Typography variant="body2"> 

</Typography>
<div style={{ marginTop: 'auto' }}> {/* Add this div for bottom alignment */}
<Button variant='contained' color='secondary'sx={{ backgroundColor: 'pink', marginBottom: '16px', width: '100%'}} onClick={() => handleClick('/sexed')}>
  Read More
</Button>
</div>
</Paper>

</div>
</div>
</div>
</div>
</div>
</div>

<br />

<h2 style={{ color: '#ef9a9a', fontFamily: 'comic-sans' }}>Other Trending Articles</h2>
<div style={{ display: "flex", overflowX: "auto" }}>
{/* Scrollable container for text boxes */}
<div style={{ display: "flex", marginRight: "10px" }}>
{/* First text box content */}
<Paper style={{ display: 'flex', flexDirection: 'column', width: "200px", padding: "10px", marginRight: "10px", backgroundColor: "pink",border: '2px solid #ef9a9a'}}>
<Typography variant="h6" style={{ fontFamily: 'Your Chosen Font', fontSize: '20px', marginBottom: '8px' }}>
  PCOS and its effects on the body
</Typography>
<Typography variant="body2"> 

</Typography>
<div style={{ marginTop: 'auto' }}> {/* Add this div for bottom alignment */}
<Button variant='contained' color='secondary'sx={{ backgroundColor: 'pink', marginBottom: '16px', width: '100%'}} onClick={() => handleClick('/mybody')}>
  Read More
</Button>
</div>
</Paper>

<div style={{ display: "flex", overflowX: "auto" }}>
{/* Scrollable container for text boxes */}
<div style={{ display: "flex", marginRight: "10px" }}>
{/* First text box content */}
<Paper style={{ display: 'flex', flexDirection: 'column', width: "200px", padding: "10px", marginRight: "10px", backgroundColor: "pink",border: '2px solid #ef9a9a'}}>
<Typography variant="h6" style={{ fontFamily: 'Your Chosen Font', fontSize: '20px', marginBottom: '8px' }}>
  IBS
</Typography>
<Typography variant="body2"> 

</Typography>
<div style={{ marginTop: 'auto' }}> {/* Add this div for bottom alignment */}
<Button variant='contained' color='secondary'sx={{ backgroundColor: 'pink', marginBottom: '16px', width: '100%'}} onClick={() => handleClick('/mybody')}>
  Read More
</Button>
</div>
</Paper>

<div style={{ display: "flex", overflowX: "auto" }}>
{/* Scrollable container for text boxes */}
<div style={{ display: "flex", marginRight: "10px" }}>
{/* First text box content */}
<Paper style={{ display: 'flex', flexDirection: 'column', width: "200px", padding: "10px", marginRight: "10px", backgroundColor: "pink",border: '2px solid #ef9a9a'}}>
<Typography variant="h6" style={{ fontFamily: 'Your Chosen Font', fontSize: '20px', marginBottom: '8px' }}>
  First Time Mother Diaries
</Typography>
<Typography variant="body2"> 

</Typography>
<div style={{ marginTop: 'auto' }}> {/* Add this div for bottom alignment */}
<Button variant='contained' color='secondary'sx={{ backgroundColor: 'pink', marginBottom: '16px', width: '100%'}} onClick={() => handleClick('/mybody')}>
  Read More
</Button>
</div>
</Paper>

<div style={{ display: "flex", overflowX: "auto" }}>
{/* Scrollable container for text boxes */}
<div style={{ display: "flex", marginRight: "10px" }}>
{/* First text box content */}
<Paper style={{ display: 'flex', flexDirection: 'column', width: "200px", padding: "10px", marginRight: "10px", backgroundColor: "pink" }}>
<Typography variant="h6" style={{ fontFamily: 'Your Chosen Font', fontSize: '20px', marginBottom: '8px' }}>
  Menstruation Changes
</Typography>
<Typography variant="body2"> 

</Typography>
<div style={{ marginTop: 'auto' }}> {/* Add this div for bottom alignment */}
<Button variant='contained' color='secondary'sx={{ backgroundColor: 'pink', marginBottom: '16px', width: '100%'}} onClick={() => handleClick('/mybody')}>
  Read More
</Button>
</div>
</Paper>

</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>

<br />
</div>     
       { showModal && <SignIn onSignIn={saveUser} onModalClose={onModalClose} showModal={showModal}/> }

        <MuiBottomNavigation />
    </>
  );  
}