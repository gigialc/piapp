import React, { CSSProperties } from 'react';

interface Props {
  onSignIn: () => void,
  onModalClose: () => void,
  onPosts:()=> void,
  
}

const modalStyle: CSSProperties = {
  background: 'white', 
  position: 'absolute', 
  left: '15vw', 
  top: '40%', 
  width: '70vw', 
  height: '25vh', 
  border: '1px solid pink', 
  textAlign: 'center', 
  display: 'flex', 
  flexDirection: 'column', 
  justifyContent: 'center'
}

export default function SignIn(props: Props) {
  return (
    <div style={{...modalStyle, background: 'white', padding: '20px', borderRadius: '8px' }}>
      <p style={{ fontWeight: 'bold' }}>You need to sign in first.</p>
      <div>
        <button onClick={props.onSignIn} style={{ marginRight: '1em' }}>Sign in</button>
        <button onClick={props.onModalClose}>Close</button>
        
      </div>
    </div>
  )
}
export function Posts(props: Props) {
  return (
    <div style={modalStyle}>
      <div>
        <button onClick={props.onPosts} style={{ marginRight: '1em' }}>Posts</button>
      
        
      </div>
    </div>
  )
}
