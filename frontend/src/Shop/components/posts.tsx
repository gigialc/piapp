import React, { CSSProperties, useContext, useState } from 'react';
import axios from 'axios';
import { TextField, Button, Stack, colors, FormControl } from '@mui/material';
import { UserContext } from "./Auth";
import { UserContextType } from './Types';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
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


export default function Posts({ communityId }: { communityId: string }) {

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
     setOpen(true);
    };

    const handleClose = () => {
    setOpen(false);
    }; 
    

    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');

    
    const [titleError, setTitleError] = useState<boolean>(false);
    const [descriptionError, setDescriptionError] = useState<boolean>(false);

    
    const [titleErrorMessage, setTitleErrorMessage] = useState<string>('');
    const [descriptionErrorMessage, setDescriptionErrorMessage] = useState<string>('');


    const { user, showModal, saveShowModal, onModalClose, addCommunityToUser } = useContext(UserContext) as UserContextType;


    const onTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };
    
    const onDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(event.target.value);
    };
    
    
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        //get the community id and make it a current session
        event.preventDefault();

        if (title === '') {
            setTitleError(true);
            setTitleErrorMessage('Title is required');
        } else {
            setTitleError(false);
            setTitleErrorMessage('');
        } 

        if (description === '') {
            setDescriptionError(true);
            setDescriptionErrorMessage('Description is required');
        } else {
            setDescriptionError(false);
            setDescriptionErrorMessage('');
        }


        if (title !== '' && description !== '') {
            const data = {
                title,
                description,
                community_id: communityId,
                user_id: user?.uid
            };

            axiosClient
                .post('/posts/posted',data, config)
                .then((response) => {
                    console.log(response);
                })
                .catch((error) => {
                    console.log(error);
    
                }
                );
    };
}

    const modalStyle: CSSProperties = {
        backgroundColor: '#FEEAEE', 
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
    };
    const inputStyle = {
        backgroundColor: "white",
        margin: "8px 0",
        borderRadius: "4px"
      };
      

      return (
        <div style={{ padding: '32px', textAlign: 'center' }}> {/* Adjusted to center for consistency */}
            <Fab
                color="primary"
                aria-label="add"
                style={{
                    backgroundColor: "#ffe6ff",
                    color: "black",
                    position: 'fixed',
                    bottom: '75px',
                    right: '20px',
                }}
                onClick={handleClickOpen}
            >
                <AddIcon />
            </Fab>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add a post</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Fill in the details for your new post.
                    </DialogContentText>
                    <form onSubmit={handleSubmit}>
                        <Stack spacing={2}>
                            <TextField
                                id="title"
                                label="Title"
                                variant="outlined"
                                value={title}
                                onChange={onTitleChange}
                                error={!!titleError}
                                helperText={titleErrorMessage || ''}
                                fullWidth
                            />
                            <TextField
                                id="description"
                                label="Description"
                                variant="outlined"
                                value={description}
                                onChange={onDescriptionChange}
                                error={!!descriptionError}
                                helperText={descriptionErrorMessage || ''}
                                fullWidth
                                multiline
                                rows={4}
                            />
                        </Stack>
                        <DialogActions>
                            <Button onClick={handleClose} style={{ color: '#9E4291' }}>
                                Cancel
                            </Button>
                            <Button type="submit" variant="contained" style={{ backgroundColor: '#9E4291', color: 'white' }}>
                                Submit
                            </Button>
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>
                <Dialog open={showModal} onClose={onModalClose}>
                    <DialogTitle>Your post has been created</DialogTitle>
                    <DialogActions>
                        <Button onClick={onModalClose} color="primary">Close</Button>
                    </DialogActions>
                </Dialog>
        </div>
    );
};




