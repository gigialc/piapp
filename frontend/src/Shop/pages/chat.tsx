import { UserContextType, MyPaymentMetadata } from "../components/Types";
import { onCancel, onError, onReadyForServerApproval, onReadyForServerCompletion } from "../components/Payments";
import MuiBottomNavigation from "../../MuiBottomNavigation";
import Header from "../components/Header";
import { UserContext } from "../components/Auth";
import React from "react";
import Typography from "@mui/material/Typography";
import Comments from "../components/comments";
import PostContent from "../components/PostContent";
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from "react";
import { useState } from "react";

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

export default function Chat() {
  const { user, saveUser, showModal, saveShowModal, onModalClose } = React.useContext(UserContext) as UserContextType;
  const [community, setCommunity] = useState<any>(null);
  const location = useLocation();
  const communityId = location.state.communityId;
  console.log(communityId);

  const location1 = useLocation();
  console.log(location1);
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
  useEffect(() => {
    if (!communityId) return; // Add a guard clause if communityId is not set
  console.log(communityId);
    axiosClient.get(`/community/community/${communityId}`) // Use template literals to inject communityId
      .then((response) => {
        console.log(response.data);
        setCommunity(response.data); // Assuming you want to set the entire response object
      })
      .catch((error) => {
        console.error(error);
      });
  }, [communityId]);

return(
    <>
        <Header/>
        {community?.name && (
          <Typography variant="h5" margin={2} color="black" style={{ fontWeight: 'Bold' }}>
           🩷 {community.name}
          </Typography>
        )}
        {community?.description && (
        <Typography variant="body1" style={{ color: '#9E4291', fontWeight: 'bold', marginLeft: 20 }}>
          {community.description}
        </Typography>
        )}
        <PostContent communityId={communityId} />  

    </>
);

};
// Created by Georgina Alacaraz