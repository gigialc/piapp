//Created by Georgina Alacaraz
import React from "react";
import { UserContextType } from "./Types";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { Container } from "@mui/material";
import { UserContext } from "./Auth";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";


const logoImageUrl = 'df2.png'; // Replace with actual logo image URL

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

export default function Header() {
  const { user, saveUser } = React.useContext(UserContext) as UserContextType;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [coins, setCoins] = useState(user.coinbalance || 0);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    axiosClient.get('/user/userInfo')
      .then((response) => {
        console.log('Response data for /user/me:', response.data);
        setCoins(response.data.coinbalance);
        console.log('Coins:', coins);
      })  
      .catch((error) => {
        console.error('Error fetching /user/me:', error);
      });

    }
  , []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: 'white' }}elevation={0}>
      <Toolbar disableGutters sx={{ justifyContent: 'space-between', paddingX: 0.4 }}>
        {/* Adjusted Logo Box */}
        <Box sx={{ display: 'flex', alignItems: 'center', overflow: 'hidden', height: '80px', width: '140px' }}>
          <img src={logoImageUrl} alt="Destig Femme" style={{ height: 'auto', width: '100%', objectFit: 'cover' }} />
        </Box>
          
          <IconButton
            size="large"
            aria-label="account of current user"
        
            onClick={user.uid === '' ? saveUser : saveUser} // This seems redundant, consider simplifying
            color="inherit"
          >
            {user.uid === '' ? (
              <Typography component="div" sx={{ color: 'black', paddingRight:3 }}>
                sign-in
              </Typography>
            ) : (
              <Container>
                <Typography sx={{ color: 'black' }}>
                  @{user.username} | sign out
                </Typography>
              </Container>
            )}
          </IconButton>
        </Toolbar>
        <Typography component="div" sx={{ flexGrow: 1, color: 'black', textAlign: 'right', paddingRight: 4 }}>
          {coins} 💎 (rewards)
        </Typography>
      </AppBar>
    </Box>
  );
}