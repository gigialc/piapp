//Created by Georgina Alcaraz
import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContextType, MyPaymentMetadata , CommunityType} from "./Types";
import { UserContext } from "./Auth";
import { onCancel, onError, onReadyForServerApproval, onReadyForServerCompletion } from "./Payments";
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

export default function PostContent() {
  const { user, saveUser, showModal, saveShowModal, onModalClose } = React.useContext(UserContext) as UserContextType;
  const navigate = useNavigate(); // also added this!!!!!!
  const [createCommunityData, setCreateCommunityData] = useState<CommunityType[] | null>(null);

  const orderProduct = async (memo: string, amount: number, paymentMetadata: MyPaymentMetadata) => {
    if(user.uid === "") {
      return saveShowModal(true);

    }

    const paymentData = { amount, memo, metadata: paymentMetadata };
    const callbacks = {
      onReadyForServerApproval,
      onReadyForServerCompletion,
      //onCancel,
      //onError
    }
    const payment = await window.Pi.createPayment(paymentData, callbacks);
    console.log(payment);

  }

  return (
    <Grid container style={{ margin: 16, paddingBottom: 10, borderBottom: '1px solid pink' }}>
      <Grid container style={{ display: 'flex', flexDirection: 'row' }}>
        <Grid container style={{ width: "33%", marginRight: 8 }}>
        </Grid>
        <Grid item style={{ width: "90%" }}>
          <h3>this is where content is added  </h3>
      </Grid>
      </Grid>
    </Grid>
  )
}
