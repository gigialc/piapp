//Created by Georgina Alacaraz

// Altered by Paula, since each Select should be unique to a certain page dont need this code anymore

import { Button, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

/* DEVELOPER NOTE:
* the productCard is used to create the standard output of pies
* on the User to App payments page of the app.
*/

//for community page

interface Props {
  description: string,
  price: number,
  onClickBuy: () => void
}

export default function ProductCard(props: Props) {

  const navigate = useNavigate();

  const handleReadNowClick = () => {
    navigate('/socialmediaBlog');
  }

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
        <Button variant='contained' color='secondary'sx={{ backgroundColor: 'pink' }} onClick={()=> {props.onClickBuy(); handleReadNowClick()}}>Select</Button>

      </Grid>
    </Grid>
  )
}


