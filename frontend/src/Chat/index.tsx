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

export default function Newsletter() {
  const [user, setUser] = useState<User | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    // Fetch user data when the component mounts if the user is already signed in
    const fetchUser = async () => {
      try {
        const response = await axiosClient.get('/user/profile'); // Replace with the actual endpoint to fetch user profile data
        setUser(response.data);
      } catch (error) {
        console.error('Fetch user data error:', error);
      }
    };

    fetchUser();
  }, []);

  const signIn = () => {
    setShowModal(true);
  }

  const signOut = () => {
    setUser(null);
    signOutUser();
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
    lastName: "Burgos",
    email: "plopezburgos@gmail.com",
    communities_joined: "Abortion Rights",
    communities_created: "Beren's Skincare Essentials",
    recentlyViewed: "Gigi's Fitness Community",
    tokens: 2000,
    likesReceived: 5000,

    // Add more user information as needed
  };

  return (
    <>
      <Header user={user} onSignIn={signIn} onSignOut={signOut} />

      

      { showModal && 
      <SignIn onSignIn={signIn} 
      onModalClose={onModalClose} 
      onPosts={function (): void {
        throw new Error('Function not implemented.');
      } } /> 
      }

<div style={{ margin: 16 }}>
        <h1>Chat</h1>
      </div>
    </>
  
  );
}
