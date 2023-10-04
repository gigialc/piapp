// Date: 07/27/2021
// Description: This is the main page for the Add page. It will display the header, the form, and the bottom navigation bar.
// Created by Georgina Alacaraz

import React, { CSSProperties } from "react";
import { User } from "../";

interface Props {
  //onPosts:() => void;
  onSignIn: () => void;
  onSignOut: () => void;
  
  user: User | null
}

const headerStyle: CSSProperties = {
  padding: 8,
  backgroundColor: "white",
  color: "red",
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};

//add more headers on the top bars
export default function Header(props: Props) {
  return (
    <header style={headerStyle}>
      <div style={{ margin: 16, paddingBottom: 16, borderBottom: '1px solid pink', marginBottom: '10px'}}>
        <h2 style={{ color: 'pink' }}>Create your Community</h2>
      </div>
      <div>

        {props.user === null ? (
          <button style={{borderRadius: "30px"}} onClick={props.onSignIn}>Sign in</button>
        ) : (
          <div>
            @{props.user.username} <button type="button" onClick={props.onSignOut}>Sign out</button>
          </div>
        )}

      </div>
    
    </header>
  );

}
