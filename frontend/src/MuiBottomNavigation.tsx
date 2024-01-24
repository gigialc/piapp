// Date: 9/18/2021
// Created by Georgina Alacaraz

import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import AddIcon from '@mui/icons-material/Add';
import ChatIcon from '@mui/icons-material/Chat';
import EditNoteIcon from '@mui/icons-material/EditNote';
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

const MuiBottomNavigation: React.FC = () => {
  const [bnValue, setBNValue] = useState(0);
  const navigate = useNavigate();

  return (
    <BottomNavigation
      sx={{ width: "100%", position: "fixed", bottom: 0 }}
      value={bnValue}
      onChange={(event, value) => setBNValue(value)}
    >
      <BottomNavigationAction
        label="Profile"
        icon={<PersonIcon />}
        value={bnValue}
        onClick={() => navigate("/Profile")}
      />
      <BottomNavigationAction
        label="Home"
        icon={<HomeIcon />}
        value={bnValue}
        onClick={() => navigate("/Shop")}
      />
      <BottomNavigationAction
        label="Add"
        icon={<AddIcon />}
        value={bnValue}
        onClick={() => navigate("/Add")} 
      />
      <BottomNavigationAction
        label="Blogs"
        icon={<EditNoteIcon />}
        value={bnValue}
        onClick={() => navigate("/Newsletter")}
      />
     
    </BottomNavigation>
  );
};
export default MuiBottomNavigation;
