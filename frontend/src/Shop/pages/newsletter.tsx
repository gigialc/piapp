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
        
               
    <div style={{ overflowY: 'auto', height: '150vh',marginLeft: '20px', fontFamily: 'Bodoni'}}>

    <h2 style={{ fontWeight: 'normal', color: '#9E4291'}}>Body Image</h2>
    <div style={{ display: "flex", overflowX: "auto" }}>
    {/* Scrollable container for text boxes */}
    <div style={{ display: "flex", fontWeight: 'bold', marginRight: "10px" }}>
    {/* First text box content */}
    <Paper style={{ display: 'flex', flexDirection: 'column', width: "200px", padding: "10px", marginRight: "10px", backgroundColor: "pink" }}>
    <Typography variant="h6" sx={{ fontFamily: 'Bodoni', color: '#FFFFFF' }}> {/* Adjust the variant and style as needed for the title */}
      Perfection on Social Media
    </Typography>
    <Typography variant="body2" sx={{ fontFamily: 'Baskerville' }}> 
      Behind the meaning of a like on social media.
    </Typography>
    <div style={{ marginTop: 'auto' }}> {/* Add this div for bottom alignment */}
    <Button variant='contained' color='secondary'sx={{fontFamily: 'Baskerville', backgroundColor: 'pink', marginBottom: '16px', width: '100%'}} onClick={() => handleClick('/SocialMediaBlog')}>
      Read More
    </Button>
    </div>
    </Paper>

    <div style={{ display: "flex", overflowX: "auto" }}>
    {/* Scrollable container for text boxes Didot*/}
    <div style={{ display: "flex", marginRight: "10px" }}>
    {/* First text box content */}
    <Paper style={{ display: 'flex', flexDirection: 'column', width: "200px", padding: "10px", marginRight: "10px", backgroundColor: "pink" }}>
    <Typography variant="h6" sx={{ fontFamily: 'Bodoni', color: '#FFFFFF' }}> {/* Adjust the variant and style as needed for the title */}
      Blogilates on Body Image
    </Typography>
    <Typography variant="body2" sx={{ fontFamily: 'Baskerville' }}> 
      Trends change, but does the pressure of perfection?
    </Typography>
    <div style={{ marginTop: 'auto' }}> {/* Add this div for bottom alignment */}
    <Button variant='contained' color='secondary'sx={{fontFamily: 'Baskerville', backgroundColor: 'pink', marginBottom: '16px', width: '100%'}} onClick={() => handleClick('/Blogilates')}>
      Read More
    </Button>
    </div>
    </Paper>

    <div style={{ display: "flex", overflowX: "auto" }}>
    {/* Scrollable container for text boxes */}
    <div style={{ display: "flex", marginRight: "10px" }}>
    {/* First text box content */}
    <Paper style={{ display: 'flex', flexDirection: 'column', width: "200px", padding: "10px", marginRight: "10px", backgroundColor: "pink" }}>
    <Typography variant="h6" sx={{ fontFamily: 'Bodoni', color: '#FFFFFF' }}> {/* Adjust the variant and style as needed for the title */}
      Body Dismorphia and the Consequences
    </Typography>
    <Typography variant="body2" sx={{ fontFamily: 'Baskerville' }}> 
      The truth behind the battle of mind and body.
    </Typography>
    <div style={{ marginTop: 'auto' }}> {/* Add this div for bottom alignment */}
    <Button variant='contained' color='secondary'sx={{fontFamily: 'Baskerville', backgroundColor: 'pink', marginBottom: '16px', width: '100%'}} onClick={() => handleClick('/BodyDismorphia')}>
      Read More
    </Button>
    </div>
    </Paper>

    <div style={{ display: "flex", overflowX: "auto" }}>
    <div style={{ display: "flex", marginRight: "10px" }}> 
    <Paper style={{ display: 'flex', flexDirection: 'column', width: "200px", padding: "10px", marginRight: "10px", backgroundColor: "pink" }}>
    <Typography variant="h6" sx={{ fontFamily: 'Bodoni', color: '#FFFFFF' }}> 
      Stereotypes in Society
    </Typography>
    <Typography variant="body2" sx={{ fontFamily: 'Baskerville' }}> 
      The cause of body image issues in society.
    </Typography>
    <div style={{ marginTop: 'auto' }}> 
    <Button variant='contained' color='secondary'sx={{fontFamily: 'Baskerville', backgroundColor: 'pink', marginBottom: '16px', width: '100%'}} onClick={() => handleClick('/BodyImage')}>
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

    <h2 style={{ fontWeight: 'normal', color: '#9E4291' }}>Sex Education</h2>
    <div style={{ display: "flex", overflowX: "auto" }}>
    {/* Scrollable container for text boxes */}
    <div style={{ display: "flex", marginRight: "10px" }}>
    {/* First text box content */}
    <Paper style={{ display: 'flex', flexDirection: 'column', width: "200px", padding: "10px", marginRight: "10px", backgroundColor: "pink" }}>
    <Typography variant="h6" sx={{ fontFamily: 'Bodoni', color: '#FFFFFF' }}> {/* Adjust the variant and style as needed for the title */}
      Contraception Methods
    </Typography>
    <Typography variant="body2" sx={{ fontFamily: 'Baskerville' }}> 
      12 different methods, which, when, how, why?
    </Typography>
    <div style={{ marginTop: 'auto' }}> {/* Add this div for bottom alignment */}
    <Button variant='contained' color='secondary'sx={{fontFamily: 'Baskerville', backgroundColor: 'pink', marginBottom: '16px', width: '100%'}} onClick={() => handleClick('/Contraception')}>
      Read More
    </Button>
    </div>
    </Paper>

    <div style={{ display: "flex", overflowX: "auto" }}>
    {/* Scrollable container for text boxes */}
    <div style={{ display: "flex", marginRight: "10px" }}>
    {/* First text box content */}
    <Paper style={{ display: 'flex', flexDirection: 'column', width: "200px", padding: "10px", marginRight: "10px", backgroundColor: "pink" }}>
    <Typography variant="h6" sx={{ fontFamily: 'Bodoni', color: '#FFFFFF' }}> {/* Adjust the variant and style as needed for the title */}
      Sexual Education and Parenting
    </Typography>
    <Typography variant="body2" sx={{ fontFamily: 'Baskerville' }}> 
      The key to a healthy relationship with your child.
    </Typography>
    <div style={{ marginTop: 'auto' }}> {/* Add this div for bottom alignment */}
    <Button variant='contained' color='secondary'sx={{fontFamily: 'Baskerville', backgroundColor: 'pink', marginBottom: '16px', width: '100%'}} onClick={() => handleClick('/Parenting')}>
      Read More
    </Button>
    </div>
    </Paper>

    <div style={{ display: "flex", overflowX: "auto" }}>
    <div style={{ display: "flex", marginRight: "10px" }}>
    <Paper style={{ display: 'flex', flexDirection: 'column', width: "200px", padding: "10px", marginRight: "10px", backgroundColor: "pink" }}>
    <Typography variant="h6" sx={{ fontFamily: 'Bodoni', color: '#FFFFFF' }}> 
      Covid-19 vs Sexual Health
    </Typography>
    <Typography variant="body2" sx={{ fontFamily: 'Baskerville' }}> 
      How has the pandemic affected sexual health?
    </Typography>
    <div style={{ marginTop: 'auto' }}> 
    <Button variant='contained' color='secondary'sx={{fontFamily: 'Baskerville', backgroundColor: 'pink', marginBottom: '16px', width: '100%'}} onClick={() => handleClick('/Covid19')}>
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

    <h2 style={{ fontWeight: 'normal', color: '#9E4291'}}>Other Trending Articles</h2>
    <div style={{ display: "flex", overflowX: "auto" }}>
    {/* Scrollable container for text boxes */}
    <div style={{ display: "flex", marginRight: "10px" }}>
    {/* First text box content */}
    <Paper style={{ display: 'flex', flexDirection: 'column', width: "200px", padding: "10px", marginRight: "10px", backgroundColor: "pink" }}>
    <Typography variant="h6" sx={{ fontFamily: 'Bodoni', color: '#FFFFFF' }}> {/* Adjust the variant and style as needed for the title */}
      PCOS and its effects on the body
    </Typography>
    <Typography variant="body2" sx={{ fontFamily: 'Baskerville' }}> 
      Polycystic Ovary Syndrome, what is it?
    </Typography>
    <div style={{ marginTop: 'auto' }}> {/* Add this div for bottom alignment */}
    <Button variant='contained' color='secondary'sx={{fontFamily: 'Baskerville', backgroundColor: 'pink', marginBottom: '16px', width: '100%'}} onClick={() => handleClick('/pcos')}>
      Read More
    </Button>
    </div>
    </Paper>

    <div style={{ display: "flex", overflowX: "auto" }}>
    {/* Scrollable container for text boxes */}
    <div style={{ display: "flex", marginRight: "10px" }}>
    {/* First text box content */}
    <Paper style={{ display: 'flex', flexDirection: 'column', width: "200px", padding: "10px", marginRight: "10px", backgroundColor: "pink" }}>
    <Typography variant="h6" sx={{ fontFamily: 'Bodoni', color: '#FFFFFF' }}> {/* Adjust the variant and style as needed for the title */}
      First Time Mother Diaries
    </Typography>
    <Typography variant="body2" sx={{ fontFamily: 'Baskerville' }}> 
      How to be a good mother, the first time around.
    </Typography>
    <div style={{ marginTop: 'auto' }}> {/* Add this div for bottom alignment */}
    <Button variant='contained' color='secondary'sx={{fontFamily: 'Baskerville', backgroundColor: 'pink', marginBottom: '16px', width: '100%'}} onClick={() => handleClick('/Mother')}>
      Read More
    </Button>
    </div>
    </Paper>

    <div style={{ display: "flex", overflowX: "auto" }}>
    {/* Scrollable container for text boxes */}
    <div style={{ display: "flex", marginRight: "10px" }}>
    {/* First text box content */}
    <Paper style={{ display: 'flex', flexDirection: 'column', width: "200px", padding: "10px", marginRight: "10px", backgroundColor: "pink" }}>
    <Typography variant="h6" sx={{ fontFamily: 'Bodoni', color: '#FFFFFF' }}> {/* Adjust the variant and style as needed for the title */}
      Menstruation Changes
    </Typography>
    <Typography variant="body2" sx={{ fontFamily: 'Baskerville' }}> 
      Normalizing the changes in your period cycle.
    </Typography>
    <div style={{ marginTop: 'auto' }}> {/* Add this div for bottom alignment */}
    <Button variant='contained' color='secondary'sx={{fontFamily: 'Baskerville', backgroundColor: 'pink', marginBottom: '16px', width: '100%'}} onClick={() => handleClick('/mybody')}>
      Read More
    </Button>
    </div>
    </Paper>

    <div style={{ display: "flex", overflowX: "auto" }}>
    {/* Scrollable container for text boxes */}
    <div style={{ display: "flex", marginRight: "10px" }}>
    {/* First text box content */}
    <Paper style={{ display: 'flex', flexDirection: 'column', width: "200px", padding: "10px", marginRight: "10px", backgroundColor: "pink" }}>
    <Typography variant="h6" sx={{ fontFamily: 'Bodoni', color: '#FFFFFF' }}> {/* Adjust the variant and style as needed for the title */}
      Irritable Bowel Syndrome
    </Typography>
    <Typography variant="body2" sx={{ fontFamily: 'Baskerville' }}> 
      Is IBS the cause of your stomach pain?
    </Typography>
    <div style={{ marginTop: 'auto' }}> {/* Add this div for bottom alignment */}
    <Button variant='contained' color='secondary'sx={{fontFamily: 'Baskerville', backgroundColor: 'pink', marginBottom: '16px', width: '100%'}} onClick={() => handleClick('/mybody')}>
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