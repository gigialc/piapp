// Created by Georgina Alacaraz
import MuiBottomNavigation from "../MuiBottomNavigation";
import Header from "./components/Header";
import { Box, Grid, Typography } from "@mui/material";
import { UserContextType, MyPaymentMetadata , CommunityType} from "./components/Types";
import { onCancel, onError, onReadyForServerApproval, onReadyForServerCompletion } from "./components/Payments";
import SignIn from "./components/SignIn";
import ProductCard from "./components/ProductCard";
import { UserContext } from "./components/Auth";
import React from "react";
import { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import axios from 'axios';
// testing to link blog posts to blog pages
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// Make TS accept the existence of our window.__ENV object - defined in index.html:
interface WindowWithEnv extends Window {
  __ENV?: {
    backendURL: string, // REACT_APP_BACKEND_URL environment variable
    sandbox: "true" | "false", // REACT_APP_SANDBOX_SDK environment variable - string, not boolean!
  }
}

const _window: WindowWithEnv = window;
const backendURL = _window.__ENV && _window.__ENV.backendURL;


const axiosClient = axios.create({ baseURL: `${backendURL}`, timeout: 20000, withCredentials: true});
const config = {headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'}};


export default function HomePage() {
  const { user, saveUser, showModal, saveShowModal, onModalClose, community } = React.useContext(UserContext) as UserContextType;

  const [createCommunityData, setCreateCommunityData] = useState<CommunityType[] | null>(null);


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
  useEffect(() => {
    console.log(createCommunityData);
  }, [createCommunityData]);
  
  useEffect(() => {
    // Make an API call to fetch the create community data
    axiosClient.get('/community/hi')
            .then((response) => {
            console.log(response);
            setCreateCommunityData(response.data);
            })
            .catch((error) => {
            console.log(error);
            });
        }
    
    , []);

return(
    <>
    
    <Header/>
    
        <Typography variant="h4" margin={2} color="primary">
        </Typography>
      <h1>Create Community</h1>

      { createCommunityData ?
      createCommunityData.map((order) =>{    
        console.log(order);
        return <ProductCard 
          name={order.name}
          description={order.description}
          price={order.price}
          onClickBuy={() => orderProduct("Community", order.price, { community_id: order._id })}
        />
      })
      :
      <ProductCard
        name="Loading..."
        description="Loading..."
        price={0}
        onClickBuy={() => console.log('Buy clicked')} // Pass the createCommunityData prop here
      />
     /* :
      community.length === 0 ?
      <ProductCard
        name="None"
        description="No new communities"
        price={0}
        onClickBuy={() => console.log('Buy clicked')} // Pass the createCommunityData prop here
      /> */

 }

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

<MuiBottomNavigation/>
</>
);
};
