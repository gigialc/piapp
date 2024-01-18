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
        <h2>Polycystic Ovary Syndrome</h2>

        <img src="pcos.svg" width="420" height="220"></img>

        <br/>
        <br/>
        <Typography variant="body2" sx={{ marginBottom: '16px' }}>
        Polycystic ovary syndrome (PCOS) is a condition in which the ovaries produce an abnormal amount of androgens, male sex hormones that are usually present in women in small amounts. The name polycystic ovary syndrome describes the numerous small cysts (fluid-filled sacs) that form in the ovaries. However, some women with this disorder do not have cysts, while some women without the disorder do develop cysts.

        Ovulation occurs when a mature egg is released from an ovary. This happens so it can be fertilized by a male sperm. If the egg is not fertilized, it is sent out of the body during your period.

        In some cases, a woman doesn’t make enough of the hormones needed to ovulate. When ovulation doesn’t happen, the ovaries can develop many small cysts. These cysts make hormones called androgens. Women with PCOS often have high levels of androgens. This can cause more problems with a woman’s menstrual cycle. And it can cause many of the symptoms of PCOS.

        Treatment for PCOS is often done with medication. This can’t cure PCOS, but it helps reduce symptoms and prevent some health problems.
        </Typography>

        <h5>What causes PCOS?</h5>

        <Typography variant="body2" sx={{ marginBottom: '16px' }}>
        The exact cause of PCOS is not clear. Many women with PCOS have insulin resistance. This means the body can't use insulin well. Insulin levels build up in the body and may cause higher androgen levels. Obesity can also increase insulin levels and make PCOS symptoms worse.
        PCOS may also run in families. It's common for sisters or a mother and daughter to have PCOS.
        </Typography>

        <h5>What are the risks for PCOS?</h5>

        <Typography variant="body2" sx={{ marginBottom: '16px' }}>
        You may be more likely to have PCOS if your mother or sister has it. You may also be more likely to have it if you have insulin resistance or are obese.
        </Typography>

        <h5>What are the symptoms of PCOS?</h5>

        <Typography variant="body2" sx={{ marginBottom: '16px' }}>
        •• Missed periods, irregular periods, or very light periods
        </Typography>

        <Typography variant="body2" sx={{ marginBottom: '16px' }}>
        •• Ovaries that are large or have many cysts
        </Typography>

        <Typography variant="body2" sx={{ marginBottom: '16px' }}>
        •• Excess body hair, including the chest, stomach, and back (hirsutism)
        </Typography>

        <Typography variant="body2" sx={{ marginBottom: '16px' }}>
        •• Weight gain, especially around the belly (abdomen)
        </Typography>

        <Typography variant="body2" sx={{ marginBottom: '16px' }}>
        •• Acne or oily skin
        </Typography>

        <Typography variant="body2" sx={{ marginBottom: '16px' }}>
        •• Male-pattern baldness or thinning hair
        </Typography>

        <Typography variant="body2" sx={{ marginBottom: '16px' }}>
        •• Infertility
        </Typography>

        <Typography variant="body2" sx={{ marginBottom: '16px' }}>
        •• Small pieces of excess skin on the neck or armpits (skin tags)
        </Typography>

        <Typography variant="body2" sx={{ marginBottom: '16px' }}>
        •• Dark or thick skin patches on the back of the neck, in the armpits, and under the breasts
        </Typography>

        <h5>What are the complications of PCOS?</h5>

        <Typography variant="body2" sx={{ marginBottom: '16px' }}>
        Women with PCOS are more likely to develop certain serious health problems. These include type 2 diabetes, high blood pressure, problems with the heart and blood vessels, and uterine cancer. Women with PCOS often have problems with their ability to get pregnant (fertility).
        </Typography>

        <img src="1a5197e9-bca0-4f13-863a-f22abd809ae2.jpg" width="420" height="220"></img>
        <br/>
        <br/>

        <h5>Living with PCOS</h5>

        <Typography variant="body2" sx={{ marginBottom: '16px' }}>
        Some women struggle with the physical symptoms of PCOS, such as weight gain, hair growth, and acne. Cosmetic treatments, such as electrolysis and laser hair removal, may help you feel better about your appearance. Talk with your health care provider about the best ways to treat the symptoms that bother you.
        </Typography>

        <h5>When should I seek medical care?</h5>

        <Typography variant="body2" sx={{ marginBottom: '16px' }}>
        If you have missed or irregular periods, excess hair growth, acne, and weight gain, call your doctor for an evaluation.
        </Typography>

        <Typography variant="body2" sx={{ marginBottom: '16px' }}>
        Source: https://www.thepitchkc.com/could-covid-19-change-the-way-we-talk-about-sexual-health/
        </Typography>

        <Typography variant="body2" sx={{ marginBottom: '16px' }}>
        img1: https://www.google.com/search?sca_esv=599582886&sxsrf=ACQVn0_1uAXW71N1eJV8qM56_oeBwGni0g:1705612991223&q=pcos+and+its+effects&tbm=isch&source=lnms&sa=X&ved=2ahUKEwjx7dzD7-eDAxUk_rsIHfRZCIcQ0pQJegQIDxAB&biw=1440&bih=699&dpr=2#imgrc=kTJUdAkKhb9I8M
        </Typography>

        <Typography variant="body2" sx={{ marginBottom: '16px' }}>
        img2: https://www.google.com/search?q=pcos+complications&tbm=isch&ved=2ahUKEwjDl8bE7-eDAxU_caQEHfa9CbYQ2-cCegQIABAA&oq=pcos+complications&gs_lcp=CgNpbWcQAzIFCAAQgAQyBggAEAgQHjIGCAAQCBAeMgcIABCABBAYMgcIABCABBAYOgQIIxAnOgoIABCABBCKBRBDOgQIABAeUMgMWIkuYMsvaANwAHgAgAGSAYgBrg2SAQQxNy4ymAEAoAEBqgELZ3dzLXdpei1pbWfAAQE&sclient=img&ei=wJapZcO3Ob_ikdUP9vumsAs&bih=699&biw=1440#imgrc=XZZKh9I29fcx0M
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
