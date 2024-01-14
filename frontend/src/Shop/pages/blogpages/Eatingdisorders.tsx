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
        <br/>
        <h2>Social Media and Health</h2>
        <div style={{ overflowY: 'auto', height: '150vh',marginLeft: '20px' }}>
          
        <Typography variant="body2" sx={{ marginBottom: '16px' }}>
        In recent years, the pervasive influence of social media on individuals, particularly teenagers and young adults, has raised concerns about its potential impact on mental health. This discussion focuses on a notable research study that investigates the association between social media use, specifically the frequency of comparing one's physical appearance to those on social media, and its correlation with body dissatisfaction and drive for thinness.         </Typography>
        <Typography variant="body2" sx={{ marginBottom: '16px' }}>
        The study sheds light on the potential risks posed by social media in relation to the development of eating disorders.
        The research involved a sample of 1331 subjects aged 15 to 35, with a mean age of 24.2. The participants included 1138 individuals from the general population and 193 patients diagnosed with eating disorders. The primary objective was to examine the connection between the frequency of comparing one's physical appearance to those on social media and the levels of body dissatisfaction and drive for thinness.         </Typography>
        <Typography variant="body2" sx={{ marginBottom: '16px' }}>
        The study employed an online questionnaire that incorporated two items from the Eating Disorder Inventory Scale: Body Dissatisfaction (EDI-BD) and Drive for Thinness (EDI-DT).
        The results revealed a significant association between the frequency of comparing one's physical appearance to social media content and increased levels of body dissatisfaction and drive for thinness. Notably, the study identified that the level of education served as a confounding factor in this relationship, while body mass index (BMI) did not exhibit a significant influence.         </Typography>
        <Typography variant="body2" sx={{ marginBottom: '16px' }}>
        The implications suggest that individuals who frequently engage in comparing their physical appearance on social media may be more vulnerable to developing eating disorders. Importantly, the study advocates for the integration of these insights into general population prevention programs and tailored treatment plans for patients, emphasizing the need to address the influence of social media on body image in mental health interventions.        </Typography>
        <Typography variant="body2" sx={{ marginBottom: '16px' }}>
        As social media continues to play a central role in shaping societal norms and individual perceptions, understanding its impact on mental health, particularly in the realm of body image and eating disorders, is crucial. This research provides valuable insights that underscore the necessity of incorporating social media considerations into broader mental health initiatives, aiming to mitigate the potential negative consequences associated with the virtual comparison of physical appearances.
        </Typography>
                Source: https://www.ncbi.nlm.nih.gov/pmc/articles/PMC8001450/

        </div>

       { showModal && <SignIn onSignIn={saveUser} onModalClose={onModalClose} showModal={showModal}/> }

        <MuiBottomNavigation />
    </>
  );
}
