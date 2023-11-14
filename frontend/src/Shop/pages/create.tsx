// Date Created: 07/28/2021
// Description: This is the main page for the Add page. It will display the header, the form, and the bottom navigation bar.
// Created by Georgina Alacaraz

import React, { useState } from 'react';
import axios from 'axios';
import MuiBottomNavigation from '../../MuiBottomNavigation';
import Header from '../components/Header';
import SignIn from '../components/SignIn';
import MuiForm from '../components/MuiForm';

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

const axiosClient = axios.create({ baseURL: `${backendURL}`, timeout: 20000, withCredentials: true});
const config = {headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'}};

export default function Add() {
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
      <MuiForm />
      <MuiBottomNavigation />
   
    </>
  );
}
