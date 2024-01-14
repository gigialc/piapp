// Created by Paula Lopez Burgos and Beren Donmez
import { UserContextType, MyPaymentMetadata } from "../../components/Types";
import { onCancel, onError, onReadyForServerApproval, onReadyForServerCompletion } from "../../components/Payments";
import MuiBottomNavigation from "../../../MuiBottomNavigation";
import SignIn from "../../components/SignIn";
import Header from "../../components/Header";
import Typography from "@mui/material/Typography";
import { UserContext } from "../../components/Auth";
import React from "react";


export default function UserToAppPayments(){
  const { user, saveUser, showModal, saveShowModal, onModalClose } = React.useContext(UserContext) as UserContextType;

  const orderProduct = async (memo: string, amount: number, paymentMetadata: MyPaymentMetadata) => {
    if(user.uid === "") {
      return saveShowModal(true);
    }
    const paymentData = { amount, memo, metadata: { ...paymentMetadata, user_id: user.uid } };

    const callbacks = {
      onReadyForServerApproval,
      onReadyForServerCompletion,
      onCancel,
      onError
    };

    const payment = await window.Pi.createPayment(paymentData, callbacks);
    console.log(payment);
  }
  return(
    <>
        <Header/>     

        <div style={{ overflowY: 'auto', height: '150vh',marginLeft: '20px' }}>
        <br/>
        <h2>The negative side of social media and how we can avoid it</h2>
    
        <img src="Social_Media_Body-1480_0.jpg" alt="Social_Media_Body-1480_0" width="500" height="100"></img>       
              
        <Typography variant="body2" sx={{ marginBottom: '16px' }}>
            Have you ever posted a photo of yourself on social media that received a lot of likes and comments? It’s nice to see that people are interested in you. In fact, you probably got a little boost in your self-esteem, which is great! But for some people, that boost can leave them wanting more…and more…and more.
        </Typography>
        <Typography variant="body2" sx={{ marginBottom: '16px' }}>
            Social media can have this effect: it gives users constant pressure to share and appear perfect with the goal of being socially accepted. Let’s face it, there’s a certain amount of risk involved in “putting yourself out there,” and the closer to perfection, the lower the perceived risk. Additionally, this drive toward “perfection” is impossible to attain and can simply be too much. This was the case for Essena O’Neill, an Australian social media powerhouse who, in 2015, after amassing hundreds of thousands of followers, quit.
        </Typography>
        <Typography variant="body2" sx={{ marginBottom: '16px' }}>
            For years, O’Neill shared pictures of herself in her seemingly “perfect” life, and in the process, it earned her over 600,000 Instagram followers and very lucrative opportunities with sponsored posts. What a great life! Or is it? Before deleting her account, she had one final post. In her tearful video, she revealed she was miserable and anxious. Simply stating, “This isn’t real.”
        </Typography>
        <Typography variant="body2" sx={{ marginBottom: '16px' }}>
            Social media can be a fun outlet, but for some, it can simply be too much. Our Tampa psychologists and counselors believe the following information can help you make a change:
        </Typography>
        <Typography variant="body2" sx={{ marginBottom: '16px' }}>
            Limit Yourself – Quitting social media cold turkey can be difficult, but slowly distancing yourself from it can be easier. Start by disabling notifications or turn your phone off when you’re busy at work or out with friends. You will avoid distractions, and with that, you’ll likely be more productive. Some have removed the apps from their phones for a while with great results. Some experts suggest that it takes about four weeks to get it out of your system.
        </Typography>
        <Typography variant="body2" sx={{ marginBottom: '16px' }}>
            Stop the Comparisons – Most people utilize social media to document the best moments in their lives. According to their accounts, their life is constantly filled with parties, the finest meals, fun nights out, and vacations, which, in all likelihood, is not indicative of their actual life. Once you realize that, it’ll be easier to not always compare yourself with others.
        </Typography>
        <Typography variant="body2" sx={{ marginBottom: '16px' }}>
            Don’t Focus on the Likes – Remember that pic of the delicious cupcake that no one liked? Who cares!? Instead of focusing on the negative, focus on how incredible that cupcake tasted and how good it felt to treat yourself. Also, remember that in many instances, the number of people who see your posts is controlled by the algorithms that are designed by people who code the sites in Silicon Valley. Lots of people may not even see what you are posting!
        </Typography>
        <Typography variant="body2" sx={{ marginBottom: '16px' }}>
            Prioritize Real-Life Conversations – Chatting with a friend on Facebook does not even compare or isn’t nearly as rewarding as having a conversation face-to-face. Instead of keeping in touch solely through a screen, use social media to reach out to your friends and make plans to get together. That’s what truly enriches our lives and makes memories – not posts and likes!
        </Typography>

          <img src="body-pos-graphic-003-180507.png" alt="body-pos-graphic-003-180507" width="300" height="300"></img>       
          
          <Typography variant="body2" sx={{ marginBottom: '100px' }}>
                Source: https://ricepsychology.com/behavior/perfection-on-social-media-does-not-make-you-perfect/#:~:text=Social%20media%20can%20have%20this,the%20lower%20the%20perceived%20risk.
          </Typography>

        </div>

       { showModal && <SignIn onSignIn={saveUser} onModalClose={onModalClose} showModal={showModal}/> }

        <MuiBottomNavigation />
    </>
  );
}
