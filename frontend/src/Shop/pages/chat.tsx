import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import SignIn from '../components/SignIn';
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

export default function Chat() {
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
    firstName: "Beren",
    lastName: "Donmez",
    email: "berenydonmez@gmail.com",
    Username: "@BerenDY",
    comment: "Today I am trying out a new product for you guys", // Add a user comment
    communities_created: "Beren's Skincare Essentials",
    recentlyViewed: "Gigi's Fitness Community",
    tokens: 2000,
    likesReceived: 5000,

    // Add more user information as needed
  };

  return (
    <>
      <Header user={user} onSignIn={signIn} onSignOut={signOut} />
      <div style={{ margin: 16 }}>
        <h1>Chat</h1>
        <p>User: {userData.Username}</p>
        <p>- {userData.comment}</p>
        <p style={{ marginLeft: '20px' }}>@GigiAlc</p>
        <p style={{ marginLeft: '30px' }}>-Excited to hear from you Beren!!</p>
  {/* Render other user information here */}
  {/* Render other user information here */}
      </div>
    </>
  );
}