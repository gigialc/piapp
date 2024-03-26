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
      bio: string,
      coinbalance: number,
      username: string
      community: CommunityType[]
    }

    };
    
    export type User = AuthResult['user'];

    export type CommunityType = {
      _id: string,
      name: string,
      user: Object,
      description: string,
      price: number,
      user_uid: string,
      posts: PostType[],
      comments: CommentType[],

    };
    
    export type UserContextType = {
      user: { uid: string; username: string; bio: string; coinbalance: number; community: CommunityType[]};
      saveUser: () => void;
      showModal: boolean;
      saveShowModal: (value: boolean) => void;
      onModalClose: () => void;
      community: CommunityType[];
      addCommunityToUser: (newCommunity: CommunityType) => void;
      addPostToCommunity: (newPost: CommunityType) => void;
      addCommentToPost: (newComment: CommunityType) => void;
    };

    export type PostType = {
      _id: string,
      title: string,
      description: string,
      community_id: string,
      user_uid: string,
      likes: number,
      comments: CommentType[],
    };

    export type CommentType = {
      _id: string,
      comment: string,
      post_id: string,
      user_uid: string,
      likes: number,
    };

    export type UserData = {
      uid: string,
      bio: string,
      coinbalance: number,
      username: string,
      community: CommunityType[],
    };
    

    export type CommunityContextType = {
      community: CommunityType[];
      addPostToCommunity: (newPost: CommunityType) => void;
      addCommentToPost: (newComment: CommunityType) => void;
      
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