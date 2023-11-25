//Created by Georgina Alacaraz

import { Button, Grid } from '@mui/material';

/* DEVELOPER NOTE:
* the productCard is used to create the standard output of pies
* on the User to App payments page of the app.
*/

interface Props {
  name: string,
  description: string,
  community: string[],

}

export default function ProfileCard(props: Props) {
  return (
    <Grid container style={{ margin: 16, paddingBottom: 16, borderBottom: '1px solid pink' }}>
      <Grid container style={{ display: 'flex', flexDirection: 'row' }}>
        <Grid container style={{ width: "33%", marginRight: 8 }}>
        </Grid>
        <Grid item style={{ width: "90%" }}>
          <h3>{props.name}</h3>
          <p>{props.description}</p>
          <div>
        <h5>Your Communities:</h5>
        <ul>
          {props.community.map((community) => (
            <li>{community}</li>
          ))}
        </ul>
      </div>
      </Grid>
      </Grid>
      <Grid item style={{textAlign: 'center', marginBottom: 8}}>
      </Grid>
    </Grid>
  )
}