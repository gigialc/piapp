import React, {useState} from 'react';
import axios from 'axios';
import ProductCard from './components/ProductCard';
import SignIn from './components/SignIn';
import Header from './components/Header';

type MyPaymentMetadata = {};

type AuthResult = {
  accessToken: string,
  user: {
    uid: string,
    username: string
  }
};

export type User = AuthResult['user'];

interface PaymentDTO {
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


export default function Shop() {
  const [user, setUser] = useState<User | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);

  const signIn = async () => {
    const scopes = ['username', 'payments'];
    const authResult: AuthResult = await window.Pi.authenticate(scopes, onIncompletePaymentFound);
    signInUser(authResult);
    setUser(authResult.user);
  }

  const signOut = () => {
    setUser(null);
    signOutUser();
  }

  const signInUser = (authResult: AuthResult) => {
    axiosClient.post('/user/signin', {authResult});
    return setShowModal(false);
  }

  const signOutUser = () => {
    return axiosClient.get('/user/signout');
  }

  const onModalClose = () => {
    setShowModal(false);
  }
 

  const orderProduct = async (memo: string, amount: number, paymentMetadata: MyPaymentMetadata) => {
    if(user === null) {
      return setShowModal(true);
    }
    const paymentData = { amount, memo, metadata: paymentMetadata };
    const callbacks = {
      onReadyForServerApproval,
      onReadyForServerCompletion,
      onCancel,
      onError
    };
    const payment = await window.Pi.createPayment(paymentData, callbacks);
    console.log(payment);
  }

  const onIncompletePaymentFound = (payment: PaymentDTO) => {
    console.log("onIncompletePaymentFound", payment);
    return axiosClient.post('/payments/incomplete', {payment});
  }

  const onReadyForServerApproval = (paymentId: string) => {
    console.log("onReadyForServerApproval", paymentId);
    axiosClient.post('/payments/approve', {paymentId}, config);
  }

  const onReadyForServerCompletion = (paymentId: string, txid: string) => {
    console.log("onReadyForServerCompletion", paymentId, txid);
    axiosClient.post('/payments/complete', {paymentId, txid}, config);
   
  }

  const onCancel = (paymentId: string) => {
    console.log("onCancel", paymentId);
    return axiosClient.post('/payments/cancelled_payment', {paymentId});
  }

  const onError = (error: Error, payment?: PaymentDTO) => {
    console.log("onError", error);
    if (payment) {
      console.log(payment);
      // handle the error accordingly
    }
  }

  return (
    <>
      <Header user={user} onSignIn={signIn} onSignOut={signOut}/>

      <ProductCard
        name="Abortion Rights"
        description=" The new abortion laws in the United States are a great example of why abortion stigma is a big issue that has to be tackled. This community supports and openly talks about abortion to empower each other and educate the rest of the world."
        price={1}
        pictureURL="https://static.vecteezy.com/system/resources/previews/009/730/589/non_2x/women-with-banners-my-body-my-choice-my-right-vector.jpg"
        pictureCaption="https://static.vecteezy.com/system/resources/previews/009/730/589/non_2x/women-with-banners-my-body-my-choice-my-right-vector.jpg"
        onClickBuy={() => orderProduct("Pay to enter community", 1, { productId: 'Abortion Rights' })}
      />
      <ProductCard
        name="Mental Health"
        description="Talking opnely about mental health creates a culture of understanding. By starting conversations about mental health, we can create a more inclusive and compassionate society where people feel comfortable seeking help and support when they need it."
        price={1}
        pictureURL="https://www.planstreetinc.com/wp-content/uploads/2021/07/what-is-mental-health.png"
        pictureCaption="ttps://www.planstreetinc.com/wp-content/uploads/2021/07/what-is-mental-health.png"
        onClickBuy={() => orderProduct("Pay to enter community", 1, { productId: 'Mental Health' })}
      />
      <ProductCard
        name="Period Stigma"
        description="Periods are beautiful and normal, they should be celebrated and not hidden. This community aims to normalize talking about periods to ensure that menstruators are healthy and comfortable in their bodies. 
        "
        price={1}
        pictureURL="https://www.healthywomen.org/media-library/image.jpg?id=27287943&width=1200&height=800&quality=85&coordinates=0%2C169%2C0%2C0"
        pictureCaption="https://www.healthywomen.org/media-library/image.jpg?id=27287943&width=1200&height=800&quality=85&coordinates=0%2C169%2C0%2C0"
        onClickBuy={() => orderProduct("Pay to enter community", 1, { productId: 'Period Stigma' })}
      />

      { showModal && <SignIn onSignIn={signIn} onModalClose={onModalClose} onPosts={function (): void {
        throw new Error('Function not implemented.');
      } } /> }
    </>
  );
}
