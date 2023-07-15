import React from "react";
import {BottomNavigation, BottomNavigationAction} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import AddIcon from '@mui/icons-material/Add';
import { useState } from "react";

export const MuiBottomNavigation = () => {
  const  [value, setValue] = useState(0)
  return (
    <BottomNavigation sx={{ width: "100%", position: "fixed", bottom: 0 }} 
        value = {value} 
        onChange = {(event, newValue) => {
        setValue(newValue);
        }}
        showLabels
        >
      <BottomNavigationAction label="Profile" icon={<PersonIcon />} />
      <BottomNavigationAction label="Home" icon={<HomeIcon />} />
      <BottomNavigationAction label="Add" icon={<AddIcon />} />

  </BottomNavigation>

  )
};