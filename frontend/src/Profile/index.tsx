import React, { useState, useEffect } from 'react';
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
    // Add more user information as needed
  };

  return (
    <div>
      <h2 style={{ color: 'pink' }}>User Profile</h2>
      <p>
        <strong>Name:</strong> {userData.firstName} {userData.lastName}
      </p>
      <p>
        <strong>Email:</strong> {userData.email}
      </p>
      {/* Add more profile information here */}
    </div>
  );
}
