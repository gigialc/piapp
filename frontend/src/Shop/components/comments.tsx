import React, { CSSProperties, useContext, useState } from 'react';
import axios from 'axios';
import { TextField, Button, Stack, colors, FormControl } from '@mui/material';
import { UserContext } from "../components/Auth";
import { UserContextType } from './Types';

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

    const [descriptionError, setDescriptionError] = useState<boolean>(false);

    const [descriptionErrorMessage, setDescriptionErrorMessage] = useState<string>('');


    const { user, showModal, saveShowModal, onModalClose, addCommunityToUser } = useContext(UserContext) as UserContextType;


    const onDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(event.target.value);
    }
    
    
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (description === '') {
            setDescriptionError(true);
            setDescriptionErrorMessage('Description is required');
        } else {
            setDescriptionError(false);
            setDescriptionErrorMessage('');
        }

        //add posts to community document to community.posts
        axiosClient.post('/community/posts', { description, user_id: user?.uid })
            .then((response) => {
                console.log(response);
                saveShowModal(true);
                addCommunityToUser(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

    };

    const modalStyle: CSSProperties = {
        position: 'absolute', 
        left: '15vw', 
        top: '40%', 
        width: '70vw', 
        height: '25vh', 
        border: '1px solid pink', 
        textAlign: 'center', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center' 
    }
    const inputStyle = {
        backgroundColor: "white",
        margin: "8px 0",
        borderRadius: "4px"
      };

    return (
        <div style={{ padding: '32px', textAlign: 'center' }}>
            <form onSubmit={handleSubmit}>
                {/*<h2 style={{color: "#9E4291",textAlign: 'left' , margin: '0'}}>Comment</h2>} */}
                <Stack spacing={0.5} sx={{ width: '80%', marginTop: '16px', marginLeft: '10%', marginRight: '10%', marginBottom: "30%"}}>
                    <TextField
                        id="description"
                        label="Comment"
                        variant="outlined"
                        value={description}
                        onChange={onDescriptionChange}
                        error={descriptionError}
                        helperText={descriptionErrorMessage}
                        style={inputStyle}
                        fullWidth
                    />
                   
                    <Button type="submit" variant="contained"style={{ backgroundColor:"#9E4291", color:"white", borderRadius:"100px" }} >Submit</Button>
                </Stack>
            </form>
            {showModal && (
                <div style={modalStyle}>
                    <p style={{ fontWeight: 'light' }}>Your community has been created.</p>
                    <div>
                        <button onClick={onModalClose}>Close</button>
                    </div>
                </div>
            )}
        </div>
    )
}

