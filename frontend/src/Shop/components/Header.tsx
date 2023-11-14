import React from "react";
import { UserContextType } from "./Types";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { Container } from "@mui/material";
import { UserContext } from "./Auth";

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
      <AppBar position="static" sx={{ backgroundColor: 'white' }} >
        <Toolbar>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 , color: 'black'}}>
            Destig Femme
          </Typography>
          
              <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    onClick={user.uid === '' ? (saveUser ) : (saveUser)}
                    color="inherit"
                  >
                  { user.uid === '' ? (
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'black' }}>
                      Sign-In
                    </Typography>
                    ) : (
                  <Container>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 , color: 'black'}}>
                    @{user.username}  |  Sign Out
                    </Typography>
                  </Container>
              )}
              </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}