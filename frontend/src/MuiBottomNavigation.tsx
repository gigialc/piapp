// Date: 9/18/2021
// Description: This is the main page for the Add page. It will display the header, the form, and the bottom navigation bar.
// Created by Georgina Alacaraz

import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import AddIcon from '@mui/icons-material/Add';
import ChatIcon from '@mui/icons-material/Chat';
import EditNoteIcon from '@mui/icons-material/EditNote';
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { red } from '@mui/material/colors';

 <HomeIcon sx={{ color: red[800] }} />

const MuiBottomNavigation: React.FC = () => {
  const [bnValue, setBNValue] = useState(0);
  const navigate = useNavigate();
  const blackLabelStyle = { color: 'black' }; // Define the pink label style

  return (
    <BottomNavigation
      sx={{ width: "100%", position: "fixed", bottom: 0 }}
      value={bnValue}
      onChange={(event, value) => setBNValue(value)}
    >
      <BottomNavigationAction
        label="Profile"
        icon={<PersonIcon sx={{ color: red[200] }} />}
        value={bnValue}
        onClick={() => navigate("/Profile")}
        style={blackLabelStyle}
      />
      <BottomNavigationAction
        label="Home"
        icon={<HomeIcon sx={{ color: red[200] }} />}
        value={bnValue}
        onClick={() => navigate("/Shop")}
        style={blackLabelStyle}

      />
      <BottomNavigationAction
        label="Add"
        icon={<AddIcon sx={{ color: red[200] }} />}
        value={bnValue}
        onClick={() => navigate("/Add")} 
        style={blackLabelStyle}

      />
      <BottomNavigationAction
        label="Blogs"
        icon={<EditNoteIcon sx={{ color: red[200] }} />}
        value={bnValue}
        onClick={() => navigate("/Newsletter")}
        style={blackLabelStyle}

      />
     
    </BottomNavigation>
  );
};
export default MuiBottomNavigation;
