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
        <h2>Diary of A New Mom</h2>

        <img src="momma.png" width="400" height="210"></img>

        <br/>
        <br/>
        <Typography variant="body2" sx={{ marginBottom: '16px' }}>
        Nicole was the perfectly behaved baby in the hospital. She slept, ate, and performed all the bodily functions a healthy baby should. I tried to immerse myself gradually in motherhood by taking advantage of whatever support was available. I happily gave the baby all her feedings but left the dirty diapers for the nurses. Because every experience surrounding my newborn was completely novel to me, my first few weeks as a new mother presented some of the most difficult and exciting challenges I’d ever attempted to conquer. Here’s a taste of what new motherhood is all about.
        </Typography>

        <h5>Day 1</h5>

        <Typography variant="body2" sx={{ marginBottom: '16px' }}>
        We arrive home from the hospital with our new baby girl, and I feel instantly like she belongs here. Her room’s been waiting for months, all prepped and ready. The only problem is my husband, Rich, and I don’t have the slightest idea how to take care of its new occupant. I was so naïve in the hospital that I actually told a friend that Nicole is a low-maintenance baby. Who was I kidding?
        </Typography>

        <Typography variant="body2" sx={{ marginBottom: '16px' }}>
        I try to continue easing myself into the mommy role by hiring a baby nurse to teach me the basics. Lynda turns out to be the professor of everything from spit-ups to sponge baths – and a referee when Rich and I argue over things like in which direction to wipe Nicole’s behind when changing her diaper.
        </Typography>

        <Typography variant="body2" sx={{ marginBottom: '16px' }}>
        Breastfeeding has been going well, except that Nicole falls asleep after just a few minutes on my breast. Lynda’s been showing me ways to wake her – tickle her ear, sprinkle water on her face, open up her diaper – and I try each method so Nicole will stay awake and eat. The books I’ve read say I should be nursing for 20 minutes on each side, but I’m lucky if I can get her to stay awake for ten.
        </Typography>

        <Typography variant="body2" sx={{ marginBottom: '16px' }}>
        It’s a serious challenge, trying to figure out what’s going through Nicole’s mind. I want to know if she sees me, hears me, and especially if she knows me. Rich and I sit for hours and focus on her, in awe of her every gesture. There are moments when I treat her like a new toy, examining all her parts and movements. But most often I am overwhelmed by the fact that I created this human being. She seems so helpless. I can’t even begin to imagine her as a whole person.
        </Typography>

        <Typography variant="body2" sx={{ marginBottom: '16px' }}>
        Although her awake time is short and infrequent and her eyes aren’t fully open yet, Rich and I try to arouse her with our voices and touch. But before long it’s back to her crib for another snooze, and after a couple of hours – out of sight, out of mind – I’ve forgotten I even have a baby. Rich and I cuddle up on the couch to watch Hitchcock’s Rope, but before the murderers have confessed, we’re brought back to reality by Nicole’s cry.
        </Typography>

        <Typography variant="body2" sx={{ marginBottom: '16px' }}>
        I can’t believe she’s mine. It feels strange but natural to be a mother, and loving her is the warmest sensation I’ve ever had. I’m her connection to life, and she needs me. It’s scary and miraculous at the same time. Although I loved her the minute I saw her, I’m not sure about this instant bond thing. We need time to get to know each other.
        </Typography>

        <Typography variant="body2" sx={{ marginBottom: '16px' }}>
        I almost forgot one of the most important moments of the day: the weigh-in. My Lamaze instructor warned us not to freak out when we discover that we haven’t shed all our pregnancy weight the minute after delivery. Yet I’ve been seriously hoping… My heart is pounding as I approach the scale. Fourteen?! I’ve lost only 14 of the 32 pounds I put on. This is going to be a long road.
        </Typography>

        <img src="muuuum.jpeg" width="420" height="220"></img>
        <br/>
        <br/>

        <h5>Day 4</h5>

        <Typography variant="body2" sx={{ marginBottom: '16px' }}>
        I’m picking out Nicole’s clothes – my favorite thing to do – and am excited to dress her. She pees while lying on the changing table. I have to change the waterproof pad underneath her and start from scratch. All changed and fresh. But then the inevitable happens: no more than five minutes go by before she makes a poop, and it gets all over her outfit. Back to the changing table. I pick out something else and dress her again. It’s not as much fun with the second outfit.
        </Typography>

        <Typography variant="body2" sx={{ marginBottom: '16px' }}>
        The routine has begun: change her, feed her, burp her, feed her, change her again – Nicole goes to the bathroom after every feeding, and then some, about 15 times a day. I have to admit that I didn’t envision all this tedious activity.
        </Typography>

        <Typography variant="body2" sx={{ marginBottom: '16px' }}>
        My mother keeps calling and telling me to rest (“You may feel good on the outside, but it’s the inside that needs recovering”), so I’m trying not to run around too much. I wonder if I’ll harass Nicole like this.
        </Typography>

        <Typography variant="body2" sx={{ marginBottom: '16px' }}>
        I can’t help falling more in love with her. She’s already more alert than a few days ago, and her eyes open wider, but she’s still pretty drowsy, probably wishing she were back in the womb where it’s warm and cozy. I’m starting to believe she actually knows me.
        </Typography>

        <Typography variant="body2" sx={{ marginBottom: '16px' }}>
        Keeping Nicole’s little body clean is a whole new challenge. Rich and I give her a sponge bath and shampoo everything. We’ve learned that she doesn’t appreciate being stripped naked and rubbed down with a washcloth, nor does she enjoy rubbing alcohol being dripped around her drying umbilical cord. Everyone tells me babies grow to love bath time, but at this point it seems more like torture. I also cut her fingernails for the first time today. I’d heard this chore would be a real nightmare, because babies squirm, but I learned the trick: do it while she’s asleep.
        </Typography>

        <h5>Day 8</h5>

        <Typography variant="body2" sx={{ marginBottom: '16px' }}>
        Nicole’s been sleeping most of the day, waking about every two to three hours for food. When she’s hungry, she cries hysterically, but after a few minutes of feeding, she looks like a drunk who’s had her fill of booze.
        </Typography>

        <Typography variant="body2" sx={{ marginBottom: '16px' }}>
        Her feedings are our closest interaction, and I feel the bond intensify when our eyes meet. But it seems as if the activity is so exerting for her that rather than continue staring into my eyes, she closes hers and slowly dozes off.
        </Typography>

        <Typography variant="body2" sx={{ marginBottom: '16px' }}>
        Breastfeeding has been nice, but I’m faced with one of its greatest drawbacks – I’ve been cursed with a cracked nipple. I can’t remember ever feeling such pain. I watch a breastfeeding video I got from my obstetrician’s office, praying that it will address this trauma. Luckily it does, and, as instructed
        </Typography>

        <Typography variant="body2" sx={{ marginBottom: '16px' }}>
        Source: https://carenosten.com/project/diary-of-new-mom/
        </Typography>

        <Typography variant="body2" sx={{ marginBottom: '16px' }}>
        img1: https://www.google.com/search?q=first+time+mother&tbm=isch&ved=2ahUKEwj5hc-t9OeDAxWlcaQEHf4wC6gQ2-cCegQIABAA&oq=first+time+mother&gs_lcp=CgNpbWcQAzIFCAAQgAQyBQgAEIAEMgUIABCABDIFCAAQgAQyBQgAEIAEMgUIABCABDIFCAAQgAQyBQgAEIAEMgUIABCABDIFCAAQgAQ6BggAEAgQHjoHCAAQgAQQGDoECCMQJzoKCAAQgAQQigUQQ1DQB1jkGmCRHGgAcAB4AIABYIgB7wuSAQIxOJgBAKABAaoBC2d3cy13aXotaW1nwAEB&sclient=img&ei=z5upZbniAaXjkdUP_uGswAo&bih=699&biw=1440#imgrc=yTUiYP7Jdl1iwM
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
