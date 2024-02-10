import React, { CSSProperties, useContext, useState } from 'react';
import axios from 'axios';
import { TextField, Button, Stack, colors, FormControl } from '@mui/material';
import { UserContext } from "../components/Auth";
import { UserContextType } from './Types';
import { useLocation } from 'react-router-dom';
import { MyPaymentMetadata } from './Types';
import { onReadyForServerApproval, onReadyForServerCompletion } from './Payments';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import CommentContent from './CommentContent';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';

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
    const [showForm, setShowForm] = useState(false);
    const [description, setDescription] = useState<string>('');
    const [descriptionError, setDescriptionError] = useState<string | null>(null);
    const { user, showModal, saveShowModal, onModalClose, addCommentToPost, addPostToCommunity } = useContext(UserContext) as UserContextType;
   //get the post id from the button

    const location = useLocation();
    const postId = location.state.postId;
    console.log(postId);

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
        
        orderProduct('Comment', 1, { postId }); // Call orderProduct with postId
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
        console.log(payment);

        // Make an API call to add person to the community if the payment was successful
        if (description !== '' ) {
            const data = {
                content: description,
                user_id: user?.uid,
                post_id: postId,    
            };
                //check if payment was successful
                // if (payment.paymentCompleted === true){
            
                axiosClient.post('/posts/comments', data, config)
                .then((response) => {
                    console.log(response);
                    addCommentToPost(response.data.comment);
                    setDescription(''); // Clear the input field
                    saveShowModal(true);
                })
                .catch((error) => {
                    console.log(error);
                    // Add more specific error handling here
                });
        }
        
    };

    const onDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(event.target.value);
        if(descriptionError) setDescriptionError(null); // Reset error when user starts typing
    };

    return (
        
        <div style={{ padding: '32px', textAlign: 'center' }}>
             <Typography variant="h5" margin={2} style={{ color: '#9E4291', fontWeight: 'bold', textAlign:"left" }}>
             Discussion
            </Typography>
            <br />
            <CommentContent />
            {showForm ? (
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
                        <Button
                            type="submit"
                            variant="contained"
                            startIcon={<ChatBubbleOutlineIcon />}
                            style={{ backgroundColor: '#ff69b4' }}
                        >
                            Submit Comment
                        </Button>
                        <Button
                            variant="outlined"
                            onClick={() => setShowForm(false)} // Hide form on cancel
                            style={{ marginTop: '10px' }}
                        >
                            Cancel
                        </Button>
                    </Stack>
                </form>
            ) : (
                <Button
                    variant="contained"
                    onClick={() => setShowForm(true)} // Show form when "+" button is clicked
                    startIcon={<AddIcon />}
                    style={{ backgroundColor: '#ff69b4', color: '#fff' }}
                >
                    Add Comment
                </Button>

            )}
        </div>
    );
}
