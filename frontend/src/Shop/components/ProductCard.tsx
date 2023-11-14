import { Button, Grid } from '@mui/material';

/* DEVELOPER NOTE:
* the productCard is used to create the standard output of pies
* on the User to App payments page of the app.
*/

interface Props {
  name: string,
  description: string,
  price: number,
  pictureCaption: string,
  pictureURL: string,
  onClickBuy: () => void,
}

export default function ProductCard(props: Props) {
  return (
    <Grid container style={{ margin: 16, paddingBottom: 16, borderBottom: '1px solid gray' }}>
      <Grid container style={{ display: 'flex', flexDirection: 'row' }}>
        <Grid container style={{ width: "33%", marginRight: 8 }}>
        </Grid>
        <Grid item style={{ width: "66%" }}>
          <h3>{props.name}</h3>
          <p>{props.description}</p>  
      </Grid>
      </Grid>
      <Grid item style={{textAlign: 'center', marginBottom: 8}}>
        <strong>{props.price} Test-π</strong> <br />
        <Button variant='contained' color='secondary' onClick={()=> {props.onClickBuy()}}>Order</Button>
      </Grid>
    </Grid>
  )
}