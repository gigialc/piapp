// Created by Georgina Alacaraz

/* DEVELOPER NOTE:
* this file contains all of the types and interfaces that
* are used by the various components of the front end.
*
* update or add, the types or interfaces your app needs
*/

export type AuthResult = {
    accessToken: string,
    user: {
      uid: string,
      username: string
      community: CommunityType[]
    }

    };
    
    export type User = AuthResult['user'];

    export type CommunityType = {
      _id: string,
      name: string,
      description: string,
      price: number,
      user_uid: string,
      owner: string,
      member: Array<object>
    };
    
    export type UserContextType = {
      user: { uid: string; username: string; community: CommunityType[]};
      saveUser: () => void;
      showModal: boolean;
      saveShowModal: (value: boolean) => void;
      onModalClose: () => void;
      community: CommunityType[];
      addCommunityToUser: (newCommunity: CommunityType) => void;
    };


    export type MyPaymentMetadata = {};
    
    export interface PaymentDTO {
    amount: number,
    user_uid: string,
    created_at: string,
    identifier: string,
    metadata: Object,
    memo: string,
    status: {
      developer_approved: boolean,
      transaction_verified: boolean,
      developer_completed: boolean,
      cancelled: boolean,
      user_cancelled: boolean,
    },
    to_address: string,
    transaction: null | {
      txid: string,
      verified: boolean,
      _link: string,
    },
    }; 
  
  // Make TS accept the existence of our window.__ENV object - defined in index.html:
  export interface WindowWithEnv extends Window {
      __ENV?: {
        backendURL: string, // REACT_APP_BACKEND_URL environment variable
        sandbox: "true" | "false", // REACT_APP_SANDBOX_SDK environment variable - string, not boolean!
      }
    }