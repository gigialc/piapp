// Date: 09/08/2021
// Description: This is the main page for the Add page. It will display the header, the form, and the bottom navigation bar.
// Created by Georgina Alacaraz
import React, { CSSProperties, useContext, useState } from 'react';
import axios from 'axios';
import { TextField, Button, Stack, colors, FormControl } from '@mui/material';
import { UserContext } from "../components/Auth";
import { UserContextType } from './Types';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useEffect } from 'react';
import { UserData } from './Types';


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


export default function ProfileEdit() {
  const [editMode, setEditMode] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [profile, setProfile] = useState({
    username: userData?.username, // Initial state, replace with user.username
    bio: userData?.bio, // Initial state, replace with userData?.bio
    occupation: userData?.occupation, // Initial state, replace with userData?.occupation
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleSave = () => {
    axiosClient.post('/user/update', {
      username: profile.username,
      bio: profile.bio,
      occupation: profile.occupation,
    })
    .then((response) => {
      console.log('Response data for /user/update:', response.data);
      setEditMode(false); 
    })  
    .catch((error) => {
      console.error('Error fetching /user/update:', error);
    });
  };

  useEffect(() => {
    axiosClient.get('/user/userInfo')
      .then((response) => {
        console.log('Response data for /user/me:', response.data);
        setProfile(response.data);
      })  
      .catch((error) => {
        console.error('Error fetching /user/me:', error);
      });

    }
  , []);


  return (
    <Card style={{ maxWidth: "100%", margin: 'auto', marginTop: 0 }}>
      <CardContent>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            {editMode ? (
              <TextField
                label="Username"
                variant="outlined"
                fullWidth
                name="username"
                value={profile.username}
                onChange={handleChange}
              />
            ) : (
                <Typography>
                <span style={{ fontWeight: 'bold' }}>@</span>{profile.username}
              </Typography>
            )}
          </Grid>
          <Grid item xs={12}>
            {editMode ? (
              <TextField
                label="Bio"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                name="bio"
                value={profile.bio}
                onChange={handleChange}
              />
            ) : (
                <Typography>
                <span style={{ fontWeight: 'bold' }}></span> {profile.bio}
              </Typography>
            )}
          </Grid>
          <Grid item xs={5}>
          <Button
              variant="contained"
              color="secondary"
              onClick={() => setEditMode(!editMode)}
              onSubmit={handleSave}
              style={{ padding: '6px 5px', height: '25px', textTransform: 'none'}}
            >
              {editMode ? 'Save' : 'Edit'}
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

