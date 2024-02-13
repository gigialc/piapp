//Created by Georgina Alacaraz

import { Button, Grid } from '@mui/material';
import { StringDecoder } from 'string_decoder';
import { UserContextType } from './Types';
import { UserContext } from './Auth';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { CommunityType } from './Types';


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
    <Grid container style={{ margin: 16, paddingBottom: 10, marginLeft:20 }}>
      <Grid container style={{ display: 'flex', flexDirection: 'row' }}>
        <Grid container style={{ width: "33%", marginRight: 8 }}>
        </Grid>
        <Grid item style={{ width: "90%", fontSize:20 }}>
          <h3>{props.name}</h3> 
      </Grid>
      <Grid style={{ width: "90%" }}>
      <p>{props.description}</p>  
      </Grid>
      </Grid>
      {/* {props.price} Test-π  < br /> */}
      <Grid item style={{ marginBottom: 8}}>
          {}
        <Button
          variant='contained'
          color='secondary'
          sx={{ backgroundColor: '#ffe6ff', color: "black",borderRadius: '30px', marginTop: 2}}
          onClick={() => handleNavigateToChat(props.community)}  // Use the handleNavigateToChat function for the onClick event
        > Enter</Button>
  
      </Grid>
    </Grid>
  )
}