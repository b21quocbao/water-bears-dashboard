import ComingSoonRightDecorator from "../assets/images/coming-soon-right-decorator.png";
import ComingSoonLeftDecorator from "../assets/images/coming-soon-left-decorator.png";
import ComingSoonBear1 from "../assets/images/Tardigrade10.png";
import ComingSoonBear2 from "../assets/images/Tardigrade14.png";
import ComingSoonBear3 from "../assets/images/Capsule2.png";
import ComingSoonBear5 from "../assets/images/Baby2.png";
import Sludge from "../assets/images/sludge.jpg";

import Question from "../assets/images/question.png";
import Coin from "../assets/images/coin.png";
import RightArrow from "../assets/svg/right-arrow.svg?react";

const ComingSoon = () => {
  return (
    <section className="coming-soon">
      <div className="container">
        <div className="coming-soon-content">
          <div className="coming-soon-wrapper">
            <p className="text-center text-xl p-12 text-[#43bfe8] border-b text-2xl">
              📝 Here are the notes on the research carried out by the chemists
              📝
            </p>
            <p className="text-red mt-8 pt-4 text-md text-[#f6d896] italic">
              14th june 2024 : 5.45 pm
            </p>
            <span className="coming-soon-tex">
              Friedrich, the chemist in charge of research on water bears, noted
              that when placed in a certain envionment, water bears generate a
              high level of a yellow energy, called $DNA. Each WaterBear can
              generate 5 $DNA / day.
            </span>
            <p className="text-red pt-4  mt-8 text-md text-[#f6d896] italic">
              15th june 2024 : 8.22 am
            </p>
            <div className="">
              <p className="text-left">
                It seems that this energy can be used to reproduce 2 waterBears
                together! After several unsuccessful attempts, our team
                succeeded in creating a WaterBears embryo using a stable
                quantity of $DNA.
                <span className="text-left">
                  With 300 $DNA, we are able to create a tube with a WaterBears
                  egg on the inside.
                </span>
              </p>
              <div className="coming-soon-guide-box">
                <div className="coming-soon-guide-box-images">
                  <img src={ComingSoonBear1} alt="" />
                  <img src={ComingSoonBear2} alt="" />
                </div>
                <RightArrow className="coming-soon-guide-box-arrow" />
                <div className="coming-soon-guide-box-images">
                  <img src={ComingSoonBear3} alt="" />
                </div>
              </div>
              <p className="text-red  mt-8 pt-4 text-md text-[#f6d896] italic">
                28th june 2024 : 4.10 pm
              </p>
              <p className="">
                We've done it, it's great! incredible! We succeeded in giving
                birth to the first babyWaterBear ! Their genome is unknown and
                does not resemble any existing living being, it's really
                fascinating. However, we have noticed that they are limited,
                only 6,666 Babys able to live.
                <span className="coming-soon-guide-text-br"></span>
              </p>
              <div className="coming-soon-guide-box">
                <div className="coming-soon-guide-box-images">
                  <img src={ComingSoonBear3} alt="" />
                </div>
                <RightArrow className="coming-soon-guide-box-arrow" />
                <div className="coming-soon-guide-box-images">
                  <img src={ComingSoonBear5} alt="" />
                </div>
              </div>
              <div></div>
              <p className="text-red  mt-8 pt-4 text-md text-[#f6d896] italic">
                28th june 2024 : 10.02 pm
              </p>
              <p className="text-[#a3d416]">
                ☣️ ALERT ☣️☣️ ALERT ☣️☣️ ALERT ☣️☣️ ALERT ☣️☣️ ALERT ☣️☣️ ALERT
                ☣️☣️ ALERT ☣️☣️ ALERT ☣️☣️ ALERT ☣️
                <span className="coming-soon-guide-text-br"></span>
              </p>
              <p>
                Something strange happened in the labo, a thud and a flash of
                lightning made the walls vibrate ! The chemist in charge of
                WaterBears research, Friedrich, was found lifeless. It seems
                that a never-before-seen viscous material is responsible for
                this.
              </p>
              <div className="coming-soon-guide-box-images text-center mx-auto">
                <img src={Sludge} alt="" className="mx-auto m-6" />
              </div>
              <p className="mt-4">
                This substance is really strange, it doesn't come from the earth
                that's for sure. Despite Friedrich's death, we'll continue to
                carry out our research - it was his life's work, and we owe him
                a debt of gratitude.
              </p>
              <p className="text-red  mt-8 pt-4 text-md text-[#f6d896] italic">
                29th june 2024 : 11.28 am
              </p>
              <p className="mt-4">
                Our first research on the sludge has provided us with some
                information.... this substance is not stable at all and is
                extremely difficult to synthesize. However, we have managed to
                stabilize it in a safe state but in very small quantities....
                (1000). It also seems that once sludge has been manipulated, it
                vaporizes forever and can never be used again. <br></br>
              </p>
              <p>
                But his physical properties are incredible, and will make it
                possible to do things never seen before....
              </p>
              <p className="text-red  mt-8 pt-4 text-md text-[#f6d896] italic">
                30th june 2024 : 1.45 pm
              </p>
              <p className="mt-4">
                We've experimented the sludge on several subjects, and all have
                proved unsuccessful... However, in the last one, we noticed that
                before dying, subject number 34 had a degeneration of his
                DNA...which transformed him into a second state for a few
                seconds. Very very interesting... We need to do more research
                and accelerate them, sludge is very difficult to maintain in
                this state, we have very little time !! <br></br>
              </p>
              <p className="text-red  mt-8 pt-4 text-md text-[#f6d896] italic">
                3rd july 2024 : 4.45 pm
              </p>
              <p className="mt-4">
                I can't believe what's just happened. That idiot Dr Glenn, I
                can't believe it.... What has he done... I was in the middle of
                a luminescent synthesis by triangular bicarbonation with a
                double funnel, and Glenn, thought it was the best time to look
                at the BTC chart. That's exactly when the support broke, and I'm
                not talking about the BTC support!! That moron Glenn broke the
                biggest vial full of $DNA on the sludge!!! And guess what? An
                incredible reaction took place: all the living creatures in the
                vicinity were transformed into some kind of bizarre thing....
                It's crazy! It seems that when you mix sludge with $DNA and a
                living organism this one is transformed!
                <br></br>
              </p>
              <div className="coming-soon-guide-box">
                <div className="coming-soon-guide-box-images">
                  <div className="bg-[#282c3c] rounded-xl p-4">
                    <img
                      style={{ width: "70px", height: "70px" }}
                      src={Coin}
                      alt=""
                      className="w-24"
                    />
                  </div>
                  <img src={Sludge} alt="" />
                  <img src={Question} alt="" />
                </div>
                <RightArrow className="coming-soon-guide-box-arrow" />
                <div className="coming-soon-guide-box-images">
                  <img src={Question} alt="" />
                </div>
              </div>
              <p className="text-red mt-8 pt-4 text-md text-[#f6d896] italic">
                More research is being carried out ....
              </p>
              <p className="text-red mt-8 pt-4 text-md text-[#f6d896] italic">
                PS : Glenn is fired
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComingSoon;
