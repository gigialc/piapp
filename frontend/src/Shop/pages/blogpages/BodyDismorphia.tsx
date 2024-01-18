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
        <h2>Eating Disorders</h2>

        <h6>------------------------------------------------------------------------------------------------------------------</h6>
        <h6>Disclaimer</h6>
        <Typography variant="body2" sx={{ marginBottom: '16px' }}>
        If you or someone you know is struggling or having thoughts of suicide, call or text the 988 Suicide & Crisis Lifeline  at 988 or chat at 988lifeline.org . In life-threatening situations, call 911.
        </Typography>
        <h6>------------------------------------------------------------------------------------------------------------------</h6>

        <Typography variant="body2" sx={{ marginBottom: '16px' }}>
        There is a commonly held misconception that eating disorders are a lifestyle choice. Eating disorders are actually serious and often fatal illnesses that are associated with severe disturbances in people’s eating behaviors and related thoughts and emotions. Preoccupation with food, body weight, and shape may also signal an eating disorder. Common eating disorders include anorexia nervosa, bulimia nervosa, and binge-eating disorder.
        </Typography>

        <h4>Signs and symptoms</h4>
        <h5>Anorexia nervosa</h5>
        <Typography variant="body2" sx={{ marginBottom: '16px' }}>
        Anorexia nervosa is a condition where people avoid food, severely restrict food, or eat very small quantities of only certain foods. They also may weigh themselves repeatedly. Even when dangerously underweight, they may see themselves as overweight.
        </Typography>
        <Typography variant="body2" sx={{ marginBottom: '16px' }}>
        There are two subtypes of anorexia nervosa: a "restrictive" subtype and a "binge-purge" subtype.
        </Typography>
        <Typography variant="body2" sx={{ marginBottom: '16px' }}>
        •• In the restrictive subtype of anorexia nervosa, people severely limit the amount and type of food they consume.
        </Typography>
        <Typography variant="body2" sx={{ marginBottom: '16px' }}>
        •• In the binge-purge subtype of anorexia nervosa, people also greatly restrict the amount and type of food they consume. In addition, they may have binge-eating and purging episodes—eating large amounts of food in a short time followed by vomiting or using laxatives or diuretics to get rid of what was consumed.
        </Typography>
        <Typography variant="body2" sx={{ marginBottom: '16px' }}>
        Anorexia nervosa can be fatal. It has an extremely high death (mortality) rate compared with other mental disorders. People with anorexia are at risk of dying from medical complications associated with starvation. Suicide is the second leading cause of death for people diagnosed with anorexia nervosa.
        </Typography>
        <Typography variant="body2" sx={{ marginBottom: '16px' }}>
        Symptoms include:
        </Typography>
        <Typography variant="body2" sx={{ marginBottom: '16px' }}>
        •• Extremely restricted eating
        </Typography>
        <Typography variant="body2" sx={{ marginBottom: '16px' }}>
        •• Extreme thinness (emaciation)
        </Typography>
        <Typography variant="body2" sx={{ marginBottom: '16px' }}>
        •• A relentless pursuit of thinness and unwillingness to maintain a normal or healthy weight
        </Typography>
        <Typography variant="body2" sx={{ marginBottom: '16px' }}>
        •• Intense fear of gaining weight
        </Typography>
        <Typography variant="body2" sx={{ marginBottom: '16px' }}>
        •• Distorted body image, a self-esteem that is heavily influenced by perceptions of body weight and shape, or a denial of the seriousness of low body weight
        </Typography>

        <h5>Bulimia nervosa</h5>
        <Typography variant="body2" sx={{ marginBottom: '16px' }}>
        Bulimia nervosa is a condition where people have recurrent and frequent episodes of eating unusually large amounts of food and feeling a lack of control over these episodes. This binge-eating is followed by behavior that compensates for the overeating such as forced vomiting, excessive use of laxatives or diuretics, fasting, excessive exercise, or a combination of these behaviors. People with bulimia nervosa may be slightly underweight, normal weight, or over overweight.
        </Typography>

        <Typography variant="body2" sx={{ marginBottom: '16px' }}>
        Source: https://www.nimh.nih.gov/health/topics/eating-disorders#part_2267
        </Typography>

        <Typography variant="body2" sx={{ marginBottom: '16px' }}>
          
        </Typography>
        <Typography variant="body2" sx={{ marginBottom: '16px' }}>
          .
        </Typography>
        </div>
      

       { showModal && <SignIn onSignIn={saveUser} onModalClose={onModalClose} showModal={showModal}/> }

        <MuiBottomNavigation />
    </>
  );
}
