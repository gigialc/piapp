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
        <h2>Birth Control Methods</h2>
          
        <Typography variant="body2" sx={{ marginBottom: '16px' }}>
            Many elements need to be considered by women, men, or couples at any given point in their lifetimes when choosing the most appropriate contraceptive method. These elements include safety, effectiveness, availability (including accessibility and affordability), and acceptability. Voluntary informed choice of contraceptive methods is an essential guiding principle, and contraceptive counseling, when applicable, might be an important contributor to the successful use of contraceptive methods.
        </Typography>
        <Typography variant="body2" sx={{ marginBottom: '16px' }}>
            In choosing a method of contraception, dual protection from the simultaneous risk for HIV and other STDs also should be considered. Although hormonal contraceptives and IUDs are highly effective at preventing pregnancy, they do not protect against STDs, including HIV. Consistent and correct use of the male latex condom reduces the risk for HIV infection and other STDs, including chlamydial infection, gonococcal infection, and trichomoniasis.
        </Typography>
        <h4>Reversible Methods of Birth Control</h4>
        <br/>
        <h5>Intrauterine Contraception</h5>
        <Typography variant="body2" sx={{ marginBottom: '16px' }}>
        Levonorgestrel intrauterine system (LNG IUD)—The LNG IUD is a small T-shaped device like the Copper T IUD. It is placed inside the uterus by a doctor. It releases a small amount of progestin each day to keep you from getting pregnant. The LNG IUD stays in your uterus for up to 3 to 8 years, depending on the device. Typical use failure rate: 0.1-0.4%.
        </Typography>
        <Typography variant="body2" sx={{ marginBottom: '16px' }}>
        Copper T intrauterine device (IUD)—This IUD is a small device that is shaped in the form of a “T.” Your doctor places it inside the uterus to prevent pregnancy. It can stay in your uterus for up to 10 years. Typical use failure rate: 0.8%.
        </Typography>
        <img src="IUD-01.png" alt="here" width="100" height="105"></img>
        <br/>
        <br/>
        <h5>Hormonal Methods</h5>
        <Typography variant="body2" sx={{ marginBottom: '16px' }}>
        Implant—The implant is a single, thin rod that is inserted under the skin of a women’s upper arm. The rod contains a progestin that is released into the body over 3 years. Typical use failure rate: 0.1%.
        </Typography>
        <img src="BC-Implant-01.png" alt="here" width="100" height="105"></img>
        <br/>
        <br/>
        <Typography variant="body2" sx={{ marginBottom: '16px' }}>
        Injection or “shot”—Women get shots of the hormone progestin in the buttocks or arm every three months from their doctor. Typical use failure rate: 4%.
        </Typography>
        <img src="Shot-01.png" alt="here" width="100" height="105"></img>
        <br/>
        <br/>
        <Typography variant="body2" sx={{ marginBottom: '16px' }}>
        Combined oral contraceptives—Also called “the pill,” combined oral contraceptives contain the hormones estrogen and progestin. It is prescribed by a doctor. A pill is taken at the same time each day. If you are older than 35 years and smoke, have a history of blood clots or breast cancer, your doctor may advise you not to take the pill. Typical use failure rate: 7%.
        </Typography>
        <img src="Oral-01.png" alt="here" width="100" height="105"></img>
        <br/>
        <br/>
        <Typography variant="body2" sx={{ marginBottom: '16px' }}>
        Progestin only pill—Unlike the combined pill, the progestin-only pill (sometimes called the mini-pill) only has one hormone, progestin, instead of both estrogen and progestin. It is prescribed by a doctor. It is taken at the same time each day. It may be a good option for women who can’t take estrogen. Typical use failure rate: 7%.
        </Typography>
        <Typography variant="body2" sx={{ marginBottom: '16px' }}>
        Patch—This skin patch is worn on the lower abdomen, buttocks, or upper body (but not on the breasts). This method is prescribed by a doctor. It releases hormones progestin and estrogen into the bloodstream. You put on a new patch once a week for three weeks. During the fourth week, you do not wear a patch, so you can have a menstrual period. Typical use failure rate: 7%.
        </Typography>
        <img src="BC-Patch-01.png" alt="here" width="100" height="105"></img>
        <br/>
        <br/>
        <Typography variant="body2" sx={{ marginBottom: '16px' }}>
        Hormonal vaginal contraceptive ring—The ring releases the hormones progestin and estrogen. You place the ring inside your vagina. You wear the ring for three weeks, take it out for the week you have your period, and then put in a new ring. Typical use failure rate: 7%.
        </Typography>
        <img src="BC-Ring-01.png" alt="here" width="100" height="105"></img>
        <br/>
        <br/>
        <h5>Barrier Methods</h5>
        <Typography variant="body2" sx={{ marginBottom: '16px' }}>
        Diaphragm or cervical cap—Each of these barrier methods are placed inside the vagina to cover the cervix to block sperm. The diaphragm is shaped like a shallow cup. The cervical cap is a thimble-shaped cup. Before sexual intercourse, you insert them with spermicide to block or kill sperm. Visit your doctor for a proper fitting because diaphragms and cervical caps come in different sizes. Typical use failure rate for the diaphragm: 17%.
        </Typography>
        <img src="Diaphragm-01.png" alt="here" width="100" height="105"></img>
        <br/>
        <br/>
        <Typography variant="body2" sx={{ marginBottom: '16px' }}>
        Sponge—The contraceptive sponge contains spermicide and is placed in the vagina where it fits over the cervix. The sponge works for up to 24 hours, and must be left in the vagina for at least 6 hours after the last act of intercourse, at which time it is removed and discarded. Typical use failure rate: 14% for women who have never had a baby and 27% for women who have had a baby.
        </Typography>
        <Typography variant="body2" sx={{ marginBottom: '16px' }}>
        Male condom—Worn by the man, a male condom keeps sperm from getting into a woman’s body. Latex condoms, the most common type, help prevent pregnancy, and HIV and other STDs, as do the newer synthetic condoms. “Natural” or “lambskin” condoms also help prevent pregnancy, but may not provide protection against STDs, including HIV. Typical use failure rate: 13%.1 Condoms can only be used once. You can buy condoms, KY jelly, or water-based lubricants at a drug store. Do not use oil-based lubricants such as massage oils, baby oil, lotions, or petroleum jelly with latex condoms. They will weaken the condom, causing it to tear or break.
        </Typography>
        <img src="Male_Condom-01.png" alt="here" width="100" height="105"></img>
        <br/>
        <br/>
        <Typography variant="body2" sx={{ marginBottom: '16px' }}>
        Female condom—Worn by the woman, the female condom helps keeps sperm from getting into her body. It is packaged with a lubricant and is available at drug stores. It can be inserted up to eight hours before sexual intercourse. Typical use failure rate: 21%,1 and also may help prevent STDs.
        </Typography>
        <img src="Female_Condom-01.png" alt="here" width="100" height="105"></img>
        <br/>
        <br/>
        <Typography variant="body2" sx={{ marginBottom: '16px' }}>
        Spermicides—These products work by killing sperm and come in several forms—foam, gel, cream, film, suppository, or tablet. They are placed in the vagina no more than one hour before intercourse. You leave them in place at least six to eight hours after intercourse. You can use a spermicide in addition to a male condom, diaphragm, or cervical cap. They can be purchased at drug stores. Typical use failure rate: 21%.
        </Typography>
        <img src="Spermicide-01.png" alt="here" width="100" height="105"></img>
        <br/>
        <br/>
        <h5>Fertility Awareness-Based Methods</h5>
        <Typography variant="body2" sx={{ marginBottom: '16px' }}>
        Fertility awareness-based methods—Understanding your monthly fertility patternexternal icon can help you plan to get pregnant or avoid getting pregnant. Your fertility pattern is the number of days in the month when you are fertile (able to get pregnant), days when you are infertile, and days when fertility is unlikely, but possible. If you have a regular menstrual cycle, you have about nine or more fertile days each month. If you do not want to get pregnant, you do not have sex on the days you are fertile, or you use a barrier method of birth control on those days. Failure rates vary across these methods.1-2 Range of typical use failure rates: 2-23%.
        </Typography>
        <img src="Fertility_Awareness-01.png" alt="here" width="100" height="105"></img>
        <br/>
        <br/>
        <h5>Lactational Amenorrhea Methods</h5>
        <Typography variant="body2" sx={{ marginBottom: '16px' }}>
        For women who have recently had a baby and are breastfeeding, the Lactational Amenorrhea Method (LAM) can be used as birth control when three conditions are met: 1) amenorrhea (not having any menstrual periods after delivering a baby), 2) fully or nearly fully breastfeeding, and 3) less than 6 months after delivering a baby. LAM is a temporary method of birth control, and another birth control method must be used when any of the three conditions are not met.
        </Typography>
        <img src="LAM-01.png" alt="here" width="100" height="105"></img>
        <br/>
        <br/>
        <h5>Emergency Contraception</h5>
        <Typography variant="body2" sx={{ marginBottom: '16px' }}>
        Emergency contraception is NOT a regular method of birth control. Emergency contraception can be used after no birth control was used during sex, or if the birth control method failed, such as if a condom broke.
        </Typography>
        <Typography variant="body2" sx={{ marginBottom: '16px' }}>
        Copper IUD—Women can have the copper T IUD inserted within five days of unprotected sex.
        </Typography>
        <Typography variant="body2" sx={{ marginBottom: '16px' }}>
        Emergency contraceptive pills—Women can take emergency contraceptive pills up to 5 days after unprotected sex, but the sooner the pills are taken, the better they will work. There are three different types of emergency contraceptive pills available in the United States. Some emergency contraceptive pills are available over the counter.
        </Typography>
        <img src="Emerg_Contraception-01.png" alt="here" width="100" height="105"></img>
        <br/>
        <br/>
        <h4>Permanent Methods of Birth Control</h4>
        <Typography variant="body2" sx={{ marginBottom: '16px' }}>
        Female Sterilization—Tubal ligation or “tying tubes”— A woman can have her fallopian tubes tied (or closed) so that sperm and eggs cannot meet for fertilization. The procedure can be done in a hospital or in an outpatient surgical center. You can go home the same day of the surgery and resume your normal activities within a few days. This method is effective immediately. Typical use failure rate: 0.5%.
        </Typography>
        <Typography variant="body2" sx={{ marginBottom: '16px' }}>
        Male Sterilization–Vasectomy—This operation is done to keep a man’s sperm from going to his penis, so his ejaculate never has any sperm in it that can fertilize an egg. The procedure is typically done at an outpatient surgical center. The man can go home the same day. Recovery time is less than one week. After the operation, a man visits his doctor for tests to count his sperm and to make sure the sperm count has dropped to zero; this takes about 12 weeks. Another form of birth control should be used until the man’s sperm count has dropped to zero. Typical use failure rate: 0.15%.
        </Typography>
        <img src="Permanent-01.png" alt="here" width="100" height="105"></img>
        <br/>
        <br/>
        <Typography variant="body2" sx={{ marginBottom: '100px' }}>
            Source: https://www.cdc.gov/reproductivehealth/contraception/index.htm
        </Typography>
        </div>

        

       { showModal && <SignIn onSignIn={saveUser} onModalClose={onModalClose} showModal={showModal}/> }

        <MuiBottomNavigation />
    </>
  );
}
