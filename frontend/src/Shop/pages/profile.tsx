// Created by Georgina Alacaraz
import { UserContextType, MyPaymentMetadata , CommunityType} from "../components/Types";
import { onCancel, onError, onReadyForServerApproval, onReadyForServerCompletion } from "../components/Payments";
import SignIn from "../components/SignIn";
import Header from "../components/Header";
import Typography from "@mui/material/Typography";
import { UserContext } from "../components/Auth";
import React, { useEffect, useState } from "react";
import MuiBottomNavigation from "../../MuiBottomNavigation";
import ProfileCard from "../components/ProfileCard";
import axios from 'axios';


/* DEVELOPER NOTE:
* this page facilitates the purchase of pies for pi. all of the callbacks
* can be found on the Payments.tsx file in components file. 
*/

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

export default function  UserToAppPayments() {
  const { user, saveUser, showModal, saveShowModal, onModalClose } = React.useContext(UserContext) as UserContextType;
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
    console.log(user);
  }
  , [user]);

  useEffect(() => {
    axiosClient.get('/user/me')
      .then((response) => {
        console.log(response);
        setCreateCommunityData(response.data);
      })  
      .catch((error) => {
        console.log(error);
      });
    }
  , []);

  return (
    <>
      <Header/>

      <Typography variant="h5" margin={2} color="pink">
        Profile
      </Typography>
      <Typography variant="h6" margin={2} color="black">
      Your Communities 
      </Typography>
      {createCommunityData ? 
      createCommunityData.map((community) =>{ 
      return <ProfileCard // Ensure a unique key for each community
      // added by paula, was giving an error because of missing attributes
        key={community._id}
        name={community.name} _id={""} description={""}    />
  })
 : (
  <p>No community data available</p>
)}
      {showModal && <SignIn onSignIn={saveUser} onModalClose={onModalClose} showModal={showModal}/>}

      <MuiBottomNavigation />
    </>
  );
}