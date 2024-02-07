//Created by Georgina Alacaraz

import { Button, Grid } from '@mui/material';
import { StringDecoder } from 'string_decoder';
import { UserContextType } from './Types';
import { UserContext } from './Auth';
import { useNavigate } from 'react-router-dom';
import { CommunityType } from './Types';

/* DEVELOPER NOTE:
* the productCard is used to create the standard output of pies
* on the User to App payments page of the app.
*/

//for community page

interface Props {
  name: string,
  description: string,
  price: number,
  community: CommunityType 
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
    <Grid container style={{ margin: 16, paddingBottom: 16, borderBottom: '1px solid pink' }}>
      <Grid container style={{ display: 'flex', flexDirection: 'row' }}>
        <Grid container style={{ width: "33%", marginRight: 8 }}>
        </Grid>
        <Grid item style={{ width: "90%" }}>
          <h3>{props.name}</h3> 
          <p>{props.description}</p>  
      </Grid>
      </Grid>
      <Grid item style={{textAlign: 'center', marginBottom: 8}}>
        <strong>{props.price} Test-π</strong>  < br />
        <Button
          variant='contained'
          color='secondary'
          sx={{ backgroundColor: '#ffe6ff', color: "black" }}
          onClick={() => handleNavigateToChat(props.community)}  // Use the handleNavigateToChat function for the onClick event
        > Enter</Button>
  
      </Grid>
    </Grid>
  )
}