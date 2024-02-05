import React, { CSSProperties, useContext, useState } from 'react';
import axios from 'axios';
import { TextField, Button, Stack, colors, FormControl } from '@mui/material';
import { UserContext } from "../components/Auth";
import { UserContextType } from './Types';
import { useLocation } from 'react-router-dom';
import { MyPaymentMetadata } from './Types';
import { onReadyForServerApproval, onReadyForServerCompletion } from './Payments';

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
const config = {headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'}}; // Add null check

export default function Comments() {
    const [description, setDescription] = useState<string>('');
    const [descriptionError, setDescriptionError] = useState<string | null>(null);
    const { user, showModal, saveShowModal, onModalClose, addCommunityToUser } = useContext(UserContext) as UserContextType;
    const location = useLocation();
    const communityId = location.state.communityId;
    if (!communityId) {
        console.log("Community ID is not provided in the location state.");
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!description.trim()) {
            setDescriptionError('Description is required');
            return;
        }

        if(user.uid === "") {
            saveShowModal(true);
            return; // Exit if user is not signed in
        }

        orderProduct('Comment', 1, { communityId }); // Call orderProduct with postId
    };

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
      
        //make a payment
        const payment = await window.Pi.createPayment(paymentData, callbacks);
      
        // Make an API call to add person to the community if the payment was successful
        const data = {
        description,
        postId: communityId,
        user_id: user?.uid
        };
        
        if (payment.paymentCompleted === true){
            console.log("Payment was successful");
            axiosClient.post('/posts/comments', data, config)
                .then((response) => {
                    console.log(response);
                    saveShowModal(true);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    const onDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(event.target.value);
        if(descriptionError) setDescriptionError(null); // Reset error when user starts typing
    };
    

    return (
        <div style={{ padding: '32px', textAlign: 'center' }}>
            <form onSubmit={handleSubmit}>
                <Stack spacing={2} sx={{ width: '80%', margin: 'auto' }}>
                    <TextField
                        id="description"
                        label="Comment"
                        variant="outlined"
                        value={description}
                        onChange={onDescriptionChange}
                        error={!!descriptionError}
                        helperText={descriptionError || ''}
                        fullWidth
                    />
                    <Button type="submit" variant="contained" color="primary" >
                        Submit
                    </Button>
                </Stack>
            </form>
            {showModal && (
                <div style={{ position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%, -50%)', width: '50%', padding: '20px', border: '1px solid #ccc', borderRadius: '4px', backgroundColor: '#fff', textAlign: 'center' }}>
                    <p>Your comment has been submitted.</p>
                    <Button onClick={onModalClose}>Close</Button>
                </div>
            )}
        </div>
    );
}
