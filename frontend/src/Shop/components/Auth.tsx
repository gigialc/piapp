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
    const [user, setUser] = React.useState<User>( { uid: '', username: '' } )
    const [showModal, setShowModal] = React.useState<boolean>(false);
    const [community, setCommunity] = React.useState<CommunityType[]>(
      [{
        _id: '',
        name: '',
        description: '',
        price: 0,
      }]);


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
      const nullUser = { uid: '', username: '' };
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
      const response = await fetch('/community');
      const community = await response.json();
      setCommunity(community);
    }

    React.useEffect(() => {
      getCommunity();
    }, []);


    const userContext: UserContextType = {
      user, 
      saveUser, 
      showModal, 
      saveShowModal,
      onModalClose,
      community
    }

    return (
        <UserContext.Provider value={ userContext }>
            {children}
        </UserContext.Provider>
    )
}

export default AuthProvider;