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
import { useLocation } from 'react-router-dom';



interface Props {
  name: string,
  description: string,
  price: number,
  owner: string,
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

  const handleNavigatePublicProfile = (community: CommunityType) => {
    // get the community id and make it a current session
    console.log(community._id);
    navigate("/publicProfile", { state: { communityId: community._id } });
  }

  return (
    <Card style={{ margin: 16, paddingBottom: 10, marginLeft: 20, width: 'calc(100% - 40px)', boxShadow: "0 0 0 1px #E69BD1", backgroundColor: "#eec1e1"}}>
      <CardContent>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="body1" gutterBottom style={{ fontWeight: 'bold' }}>
              {props.name}
            </Typography>
          </Grid>
          <Grid item>
            <Button
              style={{
                color: '#4C4E52',
                textTransform: 'none',
                padding: 0, // Remove padding if you want the button to look like plain text
                minWidth: 0, // Use this to prevent the button from having a minimum size
              }}
              onClick={() => handleNavigatePublicProfile(props.community)}
            >
              @{props.owner}
            </Button>
          </Grid>
        </Grid>
        <Typography variant="body2" component="p">
          {props.description}
        </Typography>
        <Typography variant="body2" style={{ color: "#4C4E52", paddingTop: '1rem' }}>
          Subscription price: {props.price}💎 / month
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          color="secondary"
          style={{ textTransform: 'none', height: '25px', fontSize: '12px'}}
          onClick={() => handleNavigateToChat(props.community)}
        >
          Enter
        </Button>
      </CardActions>
    </Card>
  );
}

            