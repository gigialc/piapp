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
        <h2>Could COVID-19 change the way we talk about sexual health?</h2>

        <img src="download.png" alt="1_liHouzcsOxIh9otdoouAjA@2x.jpg" width="450" height="220"></img>

        <br/>
        <br/>
        <Typography variant="body2" sx={{ marginBottom: '16px' }}>
        When’s the last time you were tested?

        The answer might be “a month ago,” “last week,” or even, for students on some college campuses, “I get tested every two days.” Either way, the odds are good that you know, and that you wouldn’t think twice about sharing the answer.

        Over the last year, as the pandemic ripped across the country and world, we’ve talked about testing openly and frankly — with our friends, families, social networks (even our mirrors or pets, if we’re honest). “Greetings from the monthly spitshow!” a pal of mine recently captioned an Instagram post outside a COVID-19 testing center. “Hope folks are still getting tested regularly!” We know how often NFL players are getting tested; we’ve seen celebs photographed swabbing their nostrils.

        It’s pretty unprecedented, even for folks who worked in medicine or public health long before the pandemic. Mirandah Loh is an adolescent physician in New York, where “walking down the street, even, COVID testing is talked about in a casual manner I’ve never heard around testing before.”

        And for Loh, who’s also a fellow with Physicians for Reproductive Health, there’s an added area of interest: Her patients are talking about testing for STIs and other communicable illnesses much more openly than they have in the past.

        Sara C. Flowers, vice president of education at Planned Parenthood, says she’s noticed it, too. In fact, like other experts in her field, she picked up on parallels between coronavirus and sexual health in the earliest stages of the pandemic.

        “Sex educators around the country were all looking at each other through our Zoom screens like, ‘Let us help you! Bring us into the conversation!’” Flowers laughs.

        It’s not just testing. The similarities between sexual wellness and COVID-19 safety include everything from barrier methods (condoms aren’t a perfect analogy for masks, but they are close) to reducing stigma around infection to the simple importance of prioritizing your health and the health of people around you. Flowers remembers seeing stickers early on in the pandemic reading, “My mask protects you and your mask protects me,” something sex educators have been saying about condoms for decades.

        “One thing that COVID and STIs have in common is that you can have the infection with no apparent symptoms at all,” Loh explains to The News Station. Studies have shown that up to 50% of people who test positive for COVID have no symptoms — not unlike, say, chlamydia, which is sometimes called “the silent infection.”

        “It’s almost normalizing people to the idea that they should get tested, even if they have no apparent symptoms,” Loh says. “In my practice, that’s where I can really talk about how this helps promote a safer and healthier sex life for everyone.”

        An even deeper COVID-related cultural shift is that we now talk about public health all the time. It dominates the news, conversations with family, and the decisions we make in our personal lives (including the decision many made to not have a personal life for the past year). People are taking a closer account of things like symptoms, exposure, and risk, and they’re asking themselves: “Do I need to get tested if X?”

        At the same time, we’ve had to develop and exercise communication skills — and perhaps more importantly, boundary-setting skills — with the people we know and care about. Flowers says it’s given people language and familiarity with asking questions that might have been uncomfortable before: Where have you been? Who have you been with? What did you all do? Was it indoors or outdoors? Who was masked? Who was not? Where had they been?

        In New York, where Loh practices, the state Department of Health released guidelines for safer sex during the pandemic, which — in addition to the usual tips about condoms and consent — noted that if you were planning to hook up with or see someone, you should be asking them about the symptoms of COVID and their COVID status.

        That was really powerful to me, especially, because these are the kind of conversations that our patients — any sexually active individual — should be having with their partner or partners,” Loh says. “Having that open dialogue really can help people develop a trusting relationship with their sexual partners.”

        “We’ve really seen folks talking about if they wanted to put protocols in place to see loved ones or to see friends,” Flowers tells The News Station. And when it comes to bodily autonomy and safe sex, “These are the building blocks, right? I think the opportunity is for folks to take these skill that they’ve developed in this pandemic and think about, ‘OK, they’re not going to just go flat and stop being useful as vaccines roll out and some restrictions are lifted.’”

        The question now becomes, as Flowers says: “How do we use this skill set we’ve developed to continue to keep ourselves healthy as life continues to evolve?”

        That part’s a bit trickier.

        “These are all theoreticals,” Michael P. Angarone, who leads the Northwestern Medicine STD clinic, tells The News Station before adding, “I do think there is a link there.”

        Angarone points to the early twenty-teens when medical experts were pushing to stop target and risk-factor testing for HIV, telling people instead — hey, you’re single, you’ve been sexually active, we’re going to test you for HIV every year unless you don’t want us to. The practice increased the number of people getting tested, and, Angarone says, truly changed the way we look at HIV, allowing physicians to identify many people as HIV positive who might not have known until they came in presenting AIDS.

        HIV testing is now opt-out, under the recommendation of the CDC. And with coronavirus, in many states, you can walk into a Walgreens or a CVS or a county testing center, spit in a tube or get your nose swabbed, and have results in hand a few days later — free of charge, regardless of whether or not you have insurance.

        “Now, what is that going to take for syphilis, chlamydia, gonorrhea, herpes, HPV? I don’t really know,” Angarone says. With most other STDs, you have to seek out a clinic or tell your provider you want to be tested. That can be a barrier and is one of the things keeping people from getting tested, even if they should.

        So, too, is stigma. (It’s why many health practitioners use STIs instead of STDs — studies have shown that infection is a less stigmatized, less negative term than disease.) Loh wonders if there’s an opportunity to pull from the pandemic, which “has normalized the term ‘testing’ overall, to where people are almost thinking about all forms — beyond even STIs — in a way that maybe they haven’t before.”

        Flowers is optimistic, if realistic, about the possibility for COVID to revolutionize sexual health. The world can change. People used to smoke on airplanes. There was a time when drivers were up in arms about having to put on seat belts.

        “Do you know anyone who gets in a car right now and doesn’t wear a seat belt?” Flowers asks. “Public health changes the way the world functions.”


        </Typography>

        <Typography variant="body2" sx={{ marginBottom: '16px' }}>
        Source: https://www.thepitchkc.com/could-covid-19-change-the-way-we-talk-about-sexual-health/
        </Typography>

        <Typography variant="body2" sx={{ marginBottom: '16px' }}>
    ..
        </Typography>



        </div>
      

       { showModal && <SignIn onSignIn={saveUser} onModalClose={onModalClose} showModal={showModal}/> }

        <MuiBottomNavigation />
    </>
  );
}
