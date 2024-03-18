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

const logoImageUrl = 'df2.png'; // Replace with actual logo image URL

export default function Header() {
  const { user, saveUser } = React.useContext(UserContext) as UserContextType;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
      </AppBar>
    </Box>
  );
}