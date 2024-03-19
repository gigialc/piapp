//Created by Georgina Alacaraz

import { Button, Grid } from '@mui/material';
import { StringDecoder } from 'string_decoder';
import { UserContextType } from './Types';
import { UserContext } from './Auth';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { CommunityType } from './Types';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';



interface Props {
  name: string,
  description: string,
  // price: number,
  community: CommunityType,
}

export default function ProductCard(props: Props) {
  const navigate = useNavigate();

  

  // Define a function to handle the click and navigate to the chat page
  const handleNavigateToChat = (community: CommunityType) => {
    // get the community id and make it a current session
    console.log(community._id);
    navigate("/Chat", { state: { communityId: community._id } });
  };

  return (
    <Card style={{ margin: 16, paddingBottom: 10, marginLeft: 20, width: 'calc(100% - 40px)', boxShadow: " 0 0 0 1px #E69BD1", backgroundColor: "#eec1e1"}}>
      <CardContent>
        <Typography variant="body1"  gutterBottom style={{ fontWeight: 'bold' }}>
          {props.name}
        </Typography>
        <Typography variant="body2" component="p">
          {props.description}
        </Typography>
        {/* Example for price, uncomment if needed
        <Typography variant="body2" color="textSecondary">
          Price: {props.price}
        </Typography>
        */}
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          color= "secondary"
          style={{ textTransform: 'none' , height: '25px', fontSize: '12px'}}
          onClick={() => handleNavigateToChat(props.community)} // Use the handleNavigateToChat function for the onClick event
        >
          Enter
        </Button>
      </CardActions>
    </Card>
  );
}

            