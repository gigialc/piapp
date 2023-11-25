//Created by Georgina Alacaraz

import { Button, Grid } from '@mui/material';
import { StringDecoder } from 'string_decoder';
import { UserContextType } from './Types';

/* DEVELOPER NOTE:
* the productCard is used to create the standard output of pies
* on the User to App payments page of the app.
*/

//for community page

interface Props {
  description: string,
  price: number,
  onClickBuy: () => void,
}

export default function ProductCard(props: Props) {
  return (
    <Grid container style={{ margin: 16, paddingBottom: 16, borderBottom: '1px solid pink' }}>
      <Grid container style={{ display: 'flex', flexDirection: 'row' }}>
        <Grid container style={{ width: "33%", marginRight: 8 }}>
        </Grid>
        <Grid item style={{ width: "90%" }}>
          <p>{props.description}</p>  
      </Grid>
      </Grid>
      <Grid item style={{textAlign: 'center', marginBottom: 8}}>
        <Button variant='contained' color='secondary'sx={{ backgroundColor: 'pink' }} onClick={()=> {props.onClickBuy()}}>Select</Button>
  
      </Grid>
    </Grid>
  )
}