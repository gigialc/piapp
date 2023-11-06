// Date: 09/08/2021
// Description: This is the main page for the Add page. It will display the header, the form, and the bottom navigation bar.
// Created by Georgina Alacaraz

import React, { CSSProperties, useState } from 'react';
import axios from 'axios';
import { TextField, Button, Stack, colors, FormControl } from '@mui/material';

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

    const [showModal, setShowModal] = useState<boolean>(false);
    
    const onTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    }
    
    const onDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(event.target.value);
    }
    
    const onPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPrice(event.target.value);
    }
    
    const onModalClose = () => {
        setShowModal(false);
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
            price
        };

        axiosClient.post('/community/create', data)
            .then((response) => {
            console.log(response);
            setShowModal(true);
            })
            .catch((error) => {
            console.log(error);
            });
        }
    }

    const modalStyle: CSSProperties = {
        background: 'white', 
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

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Stack spacing={2} sx={{ width: '80%', margin: '10%' }}>
                    <TextField
                        id="title"
                        label="Title"
                        variant="outlined"
                        value={title}
                        onChange={onTitleChange}
                        error={titleError}
                        helperText={titleErrorMessage}
                    />
                    <TextField
                        id="description"
                        label="Mission Statement"
                        variant="outlined"
                        value={description}
                        onChange={onDescriptionChange}
                        error={descriptionError}
                        helperText={descriptionErrorMessage}
                    />
                    <TextField
                        id="price"
                        label="Subsription Price"
                        variant="outlined"
                        value={price}
                        onChange={onPriceChange}
                        error={priceError}
                        helperText={priceErrorMessage}
                    />
                    {/* <TextField
                        id="category"
                        label="Category"
                        variant="outlined"
                        value={category}
                        onChange={onCategoryChange}
                        error={categoryError}
                        helperText={categoryErrorMessage}
                    /> */}
                    <Button type="submit" variant="contained"style={{ backgroundColor:"pink", color:"black", borderRadius:"100px" }} >Submit</Button>
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

