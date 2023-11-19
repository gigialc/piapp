// Created by Georgina Alacaraz
import MuiBottomNavigation from "../MuiBottomNavigation";
import Header from "./components/Header";
import { Box, Grid, Typography } from "@mui/material";
import { UserContextType, MyPaymentMetadata , CommunityType} from "./components/Types";
import { onCancel, onError, onReadyForServerApproval, onReadyForServerCompletion } from "./components/Payments";
import SignIn from "./components/SignIn";
import ProductCard from "./components/ProductCard";
import { UserContext } from "./components/Auth";
import React from "react";
import { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";



export default function HomePage() {
  const { user, saveUser, showModal, saveShowModal, onModalClose, community } = React.useContext(UserContext) as UserContextType;

  const [createCommunityData, setCreateCommunityData] = useState<CommunityType[] | null>(null);


  const orderProduct = async (memo: string, amount: number, paymentMetadata: MyPaymentMetadata) => {
    if(user.uid === "") {
      return saveShowModal(true);
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
  useEffect(() => {
    console.log(createCommunityData);
  }, [createCommunityData]);
  
  useEffect(() => {
    // Make an API call to fetch the create community data
    fetch('/hi')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(communitiesArray => {
        // Set the fetched data to state
        setCreateCommunityData(communitiesArray);
      })
      .catch(error => {
        // Handle any errors
        console.error('There has been a problem with your fetch operation:', error);
      });
  }, []);

return(
    <>
    <Header/>
    
    <Typography variant="h4" margin={3} color="hotpink"> 
        </Typography>
      <h1>Create Community</h1>

      {createCommunityData === null ?
      <ProductCard
        name="Loading..."
        description="Loading..."
        price={0}
        onClickBuy={() => console.log('Buy clicked')} // Pass the createCommunityData prop here
      />
      :
      community.length === 0 ?
      <ProductCard
        name="None"
        description="No new communities"
        price={0}
        onClickBuy={() => console.log('Buy clicked')} // Pass the createCommunityData prop here
      />
      :
      createCommunityData.map((order: CommunityType) =>{    
        <ProductCard
          name={order.name}
          description={order.description}
          price={order.price}
          onClickBuy={() => orderProduct("Community", order.price, { community_id: order._id })}
        />
      },)
    }

    <div style={{ overflowY: 'auto', height: '150vh' }}>

      {/* Add "blog posts" heading */}
      <Typography variant="h5" margin={2} color="primary">
      </Typography>
      <h2>Blog Posts</h2>
      
      <div style={{ display: "flex", overflowX: "auto" }}>
        {/* Scrollable container for text boxes */}
        <div style={{ display: "flex", marginRight: "10px" }}>
          {/* First text box content */}
          <Paper style={{ width: "300px", padding: "10px", marginRight: "10px", backgroundColor: "pink" }}>
            <Typography variant="body1">
              Dive into the complex world of body image on social media! 📸💔 In an era dominated by filters and perfected images, the impact on our self-esteem is undeniable.  Join the conversation on the blog to explore the push for diversity and body positivity, and let's navigate the nuances of self-perception in the age of social media. Click to read more! #BodyImage #SocialMediaImpact
            </Typography>
          </Paper>

          {/* Second text box content */}
          <Paper style={{ width: "300px", padding: "10px", marginRight: "10px", backgroundColor: "pink" }}>
            <Typography variant="body1">
            Sex education goes beyond the basics; it's about fostering a healthy and respectful attitude towards our bodies, relationships, and consent. By providing accurate information about anatomy, contraception, and communication, we equip individuals with the tools they need to make informed decisions and navigate the complexities of intimacy.
            </Typography>
          </Paper>
{/* Second text box content */}
<Paper style={{ width: "300px", padding: "10px", marginRight: "10px", backgroundColor: "pink" }}>
            <Typography variant="body1">
            Let's work together to create a supportive community that encourages positive body image. By fostering conversations, sharing our stories, and uplifting each other, we can inspire a generation to love and appreciate their bodies for the incredible vessels they are.
            </Typography>
          </Paper>


          {/* Second text box content */}
          <Paper style={{ width: "300px", padding: "10px", marginRight: "10px", backgroundColor: "pink" }}>
            <Typography variant="body1">
            It's time to challenge conventional beauty standards and redefine what it means to be beautiful. Beauty is diverse, and it goes beyond the external. By appreciating our unique features and embracing individuality, we contribute to a more inclusive and accepting perception of beauty.
            </Typography>
          </Paper>


          {/* Add more text boxes as needed */}
        </div>
      </div>
 {/* Add "my communities" heading */}
 <Typography variant="h5" margin={2} color="primary">
        My Communities
      </Typography>

      <div style={{ display: "flex", overflowX: "auto" }}>
        {/* Scrollable container for text boxes */}
        <div style={{ display: "flex", marginRight: "10px" }}>
         {/* First text box content for "My Communities" */}
<Paper style={{ width: "400px", height: "200px", padding: "10px", marginRight: "10px", backgroundColor: "lightblue" }}>
  <Typography variant="body1">
    Explore the vibrant community of like-minded individuals who share your passion for technology! 🚀💻 Join discussions, ask questions, and stay updated on the latest trends in the tech world. Click to join now! #TechEnthusiasts #Community
  </Typography>
</Paper>

{/* Second text box content for "My Communities" */}
<Paper style={{ width: "400px", height: "200px", padding: "10px", marginRight: "10px", backgroundColor: "lightblue" }}>
  <Typography variant="body1">
    Connect with fellow foodies in the culinary community! 🍔🍜 Share your favorite recipes, discover new cooking techniques, and indulge in conversations about the art of gastronomy. Click to become a member! #FoodieCommunity #CulinaryArts
  </Typography>
</Paper>

          {/* Add more text boxes for "My Communities" as needed */}
        </div>
      </div>

      {showModal && (
        <SignIn onSignIn={saveUser} onModalClose={onModalClose} showModal={showModal} />
      )}

<MuiBottomNavigation />
    </div>
    
       { showModal && <SignIn onSignIn={saveUser} onModalClose={onModalClose} showModal={showModal}/> }

    <MuiBottomNavigation/>
    </>

    
);

};

