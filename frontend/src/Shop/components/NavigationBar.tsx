import React, { CSSProperties } from 'react';

const navigationStyle: CSSProperties = {
 
    backgroundColor: "pink",
    color: "black",
    width: "100%",
    position: "fixed",
    bottom: 0,
   
  };

export default function NavigationBar() {
  return (
    <nav style={navigationStyle}>
      <ul  style={{ listStyleType: "none", margin: 5, padding: 4 }}>

          <a href="/home" style={{ margin: "0 12%" }}>Create</a>

          <a href="/products" style={{ margin: "0 12%" }}>Home</a>

          <a href="/contact" style={{ margin: "0  12%" }}>Profile</a>

      </ul>
    </nav>
  );
}
