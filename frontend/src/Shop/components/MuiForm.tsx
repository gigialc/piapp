// Date: 09/08/2021
// Description: This is the main page for the Add page. It will display the header, the form, and the bottom navigation bar.
// Created by Georgina Alacaraz

import React, { CSSProperties, useContext, useState } from 'react';
import axios from 'axios';
import { TextField, Button, Stack, colors, FormControl } from '@mui/material';
import { UserContext } from "../components/Auth";
import { UserContextType } from './Types';
import { light } from '@mui/material/styles/createPalette';

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

export default function MuiForm() {

    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [price, setPrice] = useState<string>('');
    
    const [titleError, setTitleError] = useState<boolean>(false);
    const [descriptionError, setDescriptionError] = useState<boolean>(false);
    const [priceError, setPriceError] = useState<boolean>(false);
    
    const [titleErrorMessage, setTitleErrorMessage] = useState<string>('');
    const [descriptionErrorMessage, setDescriptionErrorMessage] = useState<string>('');
    const [priceErrorMessage, setPriceErrorMessage] = useState<string>('');

    const { user, showModal, saveShowModal, onModalClose, addCommunityToUser } = useContext(UserContext) as UserContextType;

    
    const onTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    }
    
    const onDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(event.target.value);
    }
    
    const onPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPrice(event.target.value);
    }
    
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
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

        if (price === '') {
            setPriceError(true);
            setPriceErrorMessage('Price is required');
        } else {
            setPriceError(false);
            setPriceErrorMessage('');
        }

        if (title !== '' && description !== '' && price !== '') {
            const data = {
                title,
                description,
                price,
             // Add null check for user
            };

            axiosClient
                .post('/community/create', data, config)
                .then((response) => {
                    console.log(response);
                    saveShowModal(true);
                     if (addCommunityToUser) { // Add null check for addCommunityToUser
                         addCommunityToUser(response.data);
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

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
    }
    const inputStyle = {
        backgroundColor: "white",
        margin: "8px 0",
        borderRadius: "4px"
      };

      return (
        <div style={{ padding: '32px', textAlign: 'center', backgroundColor: 'white', borderRadius: '20px' }}>
          <form onSubmit={handleSubmit}>         
            <Stack spacing={4} sx={{ width: '80%', margin: '0 auto' }}>
              <TextField
                id="title"
                label="Community Title"
                variant="outlined"
                value={title}
                onChange={onTitleChange}
                error={titleError}
                helperText={titleErrorMessage}
                fullWidth
                required
                style={{ backgroundColor: '#ffe6ff', borderRadius: '20px', border: 'none' }} // Remove grey outline
              />
              <TextField
                id="description"
                label="Mission Statement"
                variant="outlined"
                value={description}
                onChange={onDescriptionChange}
                error={descriptionError}
                helperText={descriptionErrorMessage}
                fullWidth
                required
                multiline // Enable multiline functionality
                rows={4} // Set initial number of rows
                style={{ backgroundColor: '#ffe6ff', borderRadius: '20px', border: 'none' }} // Remove grey outline
              />
              <TextField
                id="price"
                label="Subscription Price"
                variant="outlined"
                value={price}
                onChange={onPriceChange}
                error={priceError}
                helperText={priceErrorMessage}
                fullWidth
                required
                style={{ backgroundColor: '#ffe6ff', borderRadius: '20px', border: 'none' }} // Remove grey outline
              />
              <Button type="submit" variant="contained" style={{ backgroundColor: "#9E4291", color: "white", borderRadius: "100px", padding: '10px 40px' }}>Create Community</Button>
            </Stack>
          </form>
          {showModal && (
            <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'rgba(255, 255, 255, 0.9)', padding: '20px', borderRadius: '10px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
              <p style={{ fontWeight: 'light', marginBottom: '16px', color: '#333' }}>Your community has been created successfully!</p>
              <Button onClick={onModalClose} variant="contained" style={{ backgroundColor: "#9E4291", color: "white", borderRadius: "100px", padding: '8px 32px' }}>Close</Button>
            </div>
          )}
        </div>
      );
      
      
      
      
}

