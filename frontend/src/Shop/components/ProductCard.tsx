import React from 'react';


interface Props {
  name: string,
  description: string,
  price: number,
  // pictureCaption: string,
  // pictureURL: string,
  onClickBuy: () => void,
  //onClickPost:() => void,
}

//formatting json return, mapping through the array of objects
export default function ProductCard(props: Props) {
  return (
    <div style={{ margin: 16, paddingBottom: 16, borderBottom: '1px solid pink', marginBottom: '60px'}}>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div style={{ width: "66%" }}>
          <h3>{props.name}</h3>
          <p>{props.description}</p>          
        </div>
      </div>

      <div style={{textAlign: 'right', marginBottom: 8}}>
        <strong>{props.price}π</strong> <br />
        <button style={{ backgroundColor: "pink",  borderRadius: "30px", paddingLeft: "3%", paddingRight: "3%"}} onClick={props.onClickBuy}> Join </button>
      </div> 

      {/* <span style={{fontSize: '0.6em'}}>{props.pictureCaption}</span> */}
    </div>
  )
}