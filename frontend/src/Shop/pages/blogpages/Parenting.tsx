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
        <h2>Sex Education and Parenting</h2>

        <img src="The-Lack-of-Sex-Education-Among-Immigrant-Parents-and-Teens_P_Social.webp" width="420" height="220"></img>

        <br/>
        <br/>
        <Typography variant="body2" sx={{ marginBottom: '16px' }}>
        When you think of sex education, the first thing that comes to mind may be a classroom full of giggling and blushing middle school students. But there is clear evidence that the foundations for sex education—and much of what determines adolescents’ knowledge, attitudes, and behavior—comes from parents and guardians at home.
        </Typography>

        <Typography variant="body2" sx={{ marginBottom: '16px' }}>
        Several systematic reviews demonstrate that parents play a key role in shaping their children’s views about sexual behavior and ultimately their decision-making throughout the adolescent years.
        </Typography>

        <Typography variant="body2" sx={{ marginBottom: '16px' }}>
        The evidence also demonstrates that many parents underestimate their role in teaching their children about sex. As a result, many adolescents report little or no communication about sex with their parents.
        </Typography>

        <Typography variant="body2" sx={{ marginBottom: '16px' }}>
        Yet there are many benefits when parents do address the topic of sex with their children. Parents can gauge their child’s physical, emotional and psychological development and can tailor conversations to their needs and developmental level. Conversations about sex can build on information over time and at a pace that works for the child. And when parents express clear values about sex, children are more likely to adhere to those values.
        </Typography>

        <Typography variant="body2" sx={{ marginBottom: '16px' }}>
        This is an opportunity for parents to have an important impact on their child’s health and well-being. Adolescents experience the highest risks for sexually-transmitted disease out of any age group in the nation. According to national data collected by the CDC, nearly half of high school students have been sexually active, and half of all new sexually transmitted diseases occur among people ages 24 and younger. In 2014, people ages 13 to 24 accounted for 22 percent of new HIV infections.
        </Typography>

        <Typography variant="body2" sx={{ marginBottom: '16px' }}>
        But what should a parent say?
        </Typography>

        <img src="sexeddd.png"  width="420" height="220"></img>

        <br/>
        <br/>

        <h4>The most effective ways to talk to kids about sex</h4>

        <Typography variant="body2" sx={{ marginBottom: '16px' }}>
        There is a growing body of evidence that tells us the most effective ways for parents to communicate with their children about sex. Parents who are emotionally close to their children and who are open and honest when discussing sexual health topics have the most success at educating their children.
        </Typography>

        <Typography variant="body2" sx={{ marginBottom: '16px' }}>
        Some of this data comes from Amy Schalet, a sociologist at the University of Massachusetts Amherst, whose work compares attitudes about teenage sexuality in the U.S. with the Netherlands. Schalet has found that because parents in the Netherlands “normalize” sex for their teenagers—describe it as a normal part of development and openly discuss the risks and benefits—youth are more likely to engage in safe sexual practices and less likely to become pregnant or contract a sexually transmitted disease. But when parents “dramatize” sexuality, try to control their teen’s sexual behavior, and close the doors to open communication about sex, their teens are more likely to engage in risky sexual behaviors.
        </Typography>

        <Typography variant="body2" sx={{ marginBottom: '16px' }}>
        A recent study by Nicole Ja, a senior research analyst at Applied Survey Research who completed her graduate work in developmental and child psychology at Cornell University, found this “dramatization” was exacerbated for low-income and ethnic or racial minority parents in New York state due to fears about their children’s health and safety and lack of resources and educational tools.
        </Typography>

        <Typography variant="body2" sx={{ marginBottom: '16px' }}>
        “American parents, regardless of their ethnic, racial or socioeconomic background, seem to approach teen sexuality by asserting control over children, remaining skeptical of youths’ capacity to experience love and handle strong emotions as part of intimate relationships, and being extremely uncomfortable in facing children’s interest in, questions about, or engagement in sex,” Ja said. “However, parents in our study also face the additional challenges of elevated dangers to children’s health and safety; a lack of trusted, high-quality safety nets and services; having to cope with their own trauma; and a lack of role models for themselves and their children. And for the many grandparents raising grandchildren, there is a generational distance that includes lacking a common language to talk about sex.”
        </Typography>

        <Typography variant="body2" sx={{ marginBottom: '16px' }}>
        It makes sense that parents who participated in the study "dramatized" their teen’s sexuality, Ja said, because coming of age for their children is more perilous compared to affluent American families, and certainly compared to families in the Netherlands, where policies and practices provide greater protection of human rights. However, the parents in the study were able to identify communication skills and community resources to help them discuss sexuality with their teenage children.
        </Typography>

        <Typography variant="body2" sx={{ marginBottom: '16px' }}>
        “This includes wanting to develop communication skills to assist in the process of balancing support with the setting of firm boundaries, modeling and talking with teens about building and sustaining healthy intimate relationships, and reducing shame in talking about sex,” Ja said. “Thus, parents showed great intentionality as they strive towards ‘normalizing’ sexual development.”
        </Typography>

        <Typography variant="body2" sx={{ marginBottom: '16px' }}>
        This finding mirrors a larger body of research that demonstrates that teaching parents how to communicate with their children about sex is effective. Studies show that interventions improve the frequency and content of discussions about sex between parents and their children.
        </Typography>

        <Typography variant="body2" sx={{ marginBottom: '16px' }}>
        The take-home message: Parents who have open, honest conversations with their children about sex, and who view sexual development as a normal part of adolescent development, play the most crucial role in their children’s health and well-being. Discussions about sex should be an ongoing process, not a one-time “talk.”
        </Typography>

        <Typography variant="body2" sx={{ marginBottom: '16px' }}>
        Source: https://www.thepitchkc.com/could-covid-19-change-the-way-we-talk-about-sexual-health/
        </Typography>

        <Typography variant="body2" sx={{ marginBottom: '16px' }}>
        img1: https://www.google.com/search?q=sex+ed+teens&tbm=isch&ved=2ahUKEwiRhO3v6-eDAxWWnCcCHRJnAsEQ2-cCegQIABAA&oq=sex+ed+teens&gs_lcp=CgNpbWcQAzoGCAAQCBAeOgcIABCABBAYOgUIABCABDoGCAAQBRAeUKAFWKsKYMALaABwAHgAgAFsiAGhBJIBAzUuMZgBAKABAaoBC2d3cy13aXotaW1nwAEB&sclient=img&ei=6pKpZZFnlrmewQ-SzomIDA&bih=699&biw=1440#imgrc=euVMupS2V230hM
        </Typography>

        <Typography variant="body2" sx={{ marginBottom: '16px' }}>
        img2: https://www.google.com/search?q=sex+ed+and+parenting&tbm=isch&ved=2ahUKEwi5j5iJuueDAxWmrycCHR0fCh4Q2-cCegQIABAA&oq=sex+ed+and+parenting&gs_lcp=CgNpbWcQAzoFCAAQgAQ6BggAEAcQHjoKCAAQgAQQigUQQzoGCAAQCBAeOgcIABCABBAYUMoEWNM2YMs4aAJwAHgAgAGOAYgBkQ2SAQQxOC4xmAEAoAEBqgELZ3dzLXdpei1pbWfAAQE&sclient=img&ei=sV6pZfnyFqbfnsEPnb6o8AE&bih=699&biw=1440#imgrc=7LyoEbETVZmhJM
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
