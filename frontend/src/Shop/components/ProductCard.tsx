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
  name: string,
  description: string,
  price: number,
  onClickBuy: () => void,
}

export default function ProductCard(props: Props) {
  return (
    <Grid container style={{ margin: 16, paddingBottom: 16, borderBottom: '1px solid pink', fontFamily: 'Bodoni' }}>
      <Grid container style={{ display: 'flex', flexDirection: 'row' }}>
        <Grid container style={{ width: "33%", marginRight: 8 }}>
        </Grid>
        <Grid item style={{ width: "90%" }}>
          <h3>{props.name}</h3> 
          <p>{props.description}</p>  
      </Grid>
      </Grid>
      <Grid item style={{marginBottom: 8}}>
        <strong>{props.price} Test-π</strong>  < br/>< br/>
        <Button variant='contained' color='secondary'sx={{ backgroundColor: 'pink', fontFamily: 'Baskerville' }} onClick={()=> {props.onClickBuy()}}>Join</Button>
  
      </Grid>
    </Grid>
  )
}