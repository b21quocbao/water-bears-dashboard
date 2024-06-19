import ContactLeftDecorator from "../assets/images/contact-left-decorator.png";
import ContactRightDecorator from "../assets/images/contact-right-decorator.png";
import DiscordIcon from "../assets/svg/discord.svg?react";
import TelegramIcon from "../assets/svg/telegram.svg?react";
import TwitterIcon from "../assets/svg/twitter.svg?react";

const Contact = () => {
  return (
    <section className="contact">
      <div className="container">
        <div className="contact-wrapper">
          <img
            src={ContactLeftDecorator}
            alt=""
            className="contact-left-decorator"
          />
          <div className="contact-content">
            <h3 className="contact-title">Contact Us</h3>
            <a href="mailto:waterbears.xrd@gmail.com" className="contact-email">
              waterbears.xrd@gmail.com
            </a>
            <div className="contact-socials">
              <a target="_blank" href="https://x.com/WaterBearsxrd">
                <TwitterIcon />
              </a>
              <a target="_blank" href="https://t.me/WaterBearsXRD">
                <TelegramIcon />
              </a>
            </div>
          </div>
          <img
            src={ContactRightDecorator}
            alt=""
            className="contact-right-decorator"
          />
        </div>
      </div>
    </section>
  );
};

export default Contact;
