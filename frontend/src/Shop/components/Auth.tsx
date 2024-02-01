//Created by Georgina Alacaraz
import React from "react";
import { User, AuthResult, UserContextType, WindowWithEnv, CommunityType } from "./Types";
import axios from "axios";
import { onIncompletePaymentFound } from "./Payments";

export const UserContext = React.createContext<UserContextType | null >(null);

const _window: WindowWithEnv = window;
const backendURL = _window.__ENV && _window.__ENV.backendURL;

const axiosClient = axios.create({ baseURL: `${backendURL}`, timeout: 20000, withCredentials: true});

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = React.useState<User>( { uid: '', username: '',  community: []    } );
    const [showModal, setShowModal] = React.useState<boolean>(false);
    const [community, setCommunity] = React.useState<CommunityType[]>([]);
    const [post, setPost] = React.useState<CommunityType[]>([]);

    const addCommunityToUser = (newCommunity: CommunityType) => {
      setCommunity((prevCommunities) => [...prevCommunities, newCommunity]);
    };

    const addPostToUser = (newPost: CommunityType) => {
      setPost((prevPosts) => [...prevPosts, newPost]);
    }
    
  
    const signIn = async () => {
      const scopes = ['username', 'payments', 'wallet_address'];
      const authResult: AuthResult = await window.Pi.authenticate(scopes, onIncompletePaymentFound);
      await signInUser(authResult);
      setUser(authResult.user);
      setShowModal(false);
      getCommunity();
    }

    const signInUser = async (authResult: AuthResult) => {
        await axiosClient.post('/user/signin', {authResult});
        return setShowModal(false);
    }
    
    const signOutUser = async() =>{
      const nullUser = { uid: '', username: '', community: [] };
      setUser(nullUser);
    }

    const saveUser = () =>{
      user.uid === '' ? signIn() : signOutUser();
    }

    const saveShowModal = (value: boolean) => {
      setShowModal(value);
    }

    const onModalClose = () => {
      saveShowModal(false);
    }

    const getCommunity = async () => {
      try {
        const response = await fetch(`${backendURL}/community`, { credentials: 'include' });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const communityData = await response.json();
        setCommunity(communityData);
      } catch (error) {
        console.error('Failed to fetch communities:', error);
      }
    }

    React.useEffect(() => {
      getCommunity();
    }, []);

    const userContext: UserContextType = {
      user,
      community, // Add the community property to the userContext
      saveUser,
      showModal,
      saveShowModal,
      onModalClose,
      addCommunityToUser
    }

    return (
        <UserContext.Provider value={ userContext }>
            {children}
        </UserContext.Provider>
    )
}

export default AuthProvider;
