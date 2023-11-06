import React, { useState, useEffect } from 'react';
import Header from './Components/Header';
import SignIn from './Components/SignIn';
import axios from 'axios';

type AuthResult = {
  accessToken: string,
  user: {
    uid: string,
    username: string
  }
};

export type User = AuthResult['user'];

// Make TS accept the existence of our window.__ENV object - defined in index.html:
interface WindowWithEnv extends Window {
  __ENV?: {
    backendURL: string, // REACT_APP_BACKEND_URL environment variable
    sandbox: "true" | "false", // REACT_APP_SANDBOX_SDK environment variable - string, not boolean!
  }
}

const _window: WindowWithEnv = window;
const backendURL = _window.__ENV && _window.__ENV.backendURL;

const axiosClient = axios.create({ baseURL: `${backendURL}`, timeout: 20000, withCredentials: true });
const config = { headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } };

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);

  const signIn = async () => {
    const scopes = ['username'];
    const authResult: AuthResult = await window.Pi.authenticate(scopes);
    signInUser(authResult);
    setUser(authResult.user);
  }

  const signOut = () => {
    setUser(null);
    signOutUser();
  }

  const signInUser = (authResult: AuthResult) => {
    axiosClient.post('http://localhost:3333/user/signin', {authResult});
    return setShowModal(false);
  }

  const signOutUser = () => {
    return axiosClient.get('/user/signout');
  }

  const onModalClose = () => {
    setShowModal(false);
  }

  // Sample user data (you would typically fetch this from an API)
  const userData = {
    firstName: "Paula",
    communities_joined: "Abortion Rights",
    communities_created: "Beren's Skincare Essentials",
    //recentlyViewed: "Gigi's Fitness Community",?
    tokens: 2000,
    likesReceived: 5000,

    // Add more user information as needed
  };

  return (
    <>
      <Header user={user} onSignIn={signIn} onSignOut={signOut} />

      <div style={{ position: 'relative' }}>
        {/* Token count displayed in the top right corner */}
        <div
          style={{
            position: 'absolute',
            top: 10,
            right: 10,
            background: 'white',
            padding: '5px 10px',
            borderRadius: '5px',
          }}
        >
          Tokens: {userData.tokens}
        </div>
      <div
        style={{
          position: 'absolute',
          top: 35, // Adjust the vertical positioning as needed
          right: 10,
          background: 'white',
          padding: '5px 10px',
          borderRadius: '5px',
        }}
      >
        Likes Received: {userData.likesReceived}
      </div>
    </div>

      { showModal && 
      <SignIn onSignIn={signIn} 
      onModalClose={onModalClose} 
      onPosts={function (): void {
        throw new Error('Function not implemented.');
      } } /> 
      }

    <p>
        <div style={{ margin: 16, paddingBottom: 16, borderBottom: '1px solid pink', marginBottom: '10px'}}>
          <strong>Name:</strong> {userData.firstName} 
        </div>
      </p>
      <p>
        <div style={{ margin: 16, paddingBottom: 16, borderBottom: '1px solid pink', marginBottom: '10px' }}>
          <strong>Communities Joined:</strong> {userData.communities_joined}
        </div>
      </p>

      <p>
        <div style={{ margin: 16, paddingBottom: 16, borderBottom: '1px solid pink', marginBottom: '10px' }}>
          <strong>Communities Created:</strong> {userData.communities_created}
        </div>
      </p>
    </>
  );
}
