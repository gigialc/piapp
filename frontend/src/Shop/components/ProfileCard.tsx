//Created by Georgina Alacaraz

import { Button, Grid } from '@mui/material';

/* DEVELOPER NOTE:
* the productCard is used to create the standard output of pies
* on the User to App payments page of the app.
*/

interface CommunityType {
  _id: string; // Make sure _id is defined in the CommunityType interface
  name: string;
  description: string;
  owner:string;
}

export default function ProfileCard(props: CommunityType) {
  return (
    <Grid container style={{ margin: 16, paddingBottom: 16, borderBottom: '1px solid pink' }}>
      <Grid container style={{ display: 'flex', flexDirection: 'row' }}>
        <Grid container style={{ width: "33%", marginRight: 8 }}>
        </Grid>
        <Grid item style={{ width: "90%" }}>
          <h3>{props.name}</h3>
          <h3>{props._id}</h3> 
          <h3>{props.owner}</h3> 
          <div>
        <ul>
        </ul>
      </div>
      </Grid>
      </Grid>
      <Grid item style={{textAlign: 'center', marginBottom: 8}}>
      </Grid>
    </Grid>
  )
}