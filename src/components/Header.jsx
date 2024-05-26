import TwitterIcon from "../assets/svg/twitter.svg?react";
import DiscordIcon from "../assets/svg/discord.svg?react";
import TelegramIcon from "../assets/svg/telegram.svg?react";
import HamburgerIcon from "../assets/svg/hamburger.svg?react";
import CloseIcon from "../assets/svg/close.svg?react";
import groupImg from "../assets/images/Group.png";
import WaterBearsLogo from "../assets/images/water-bears.png";
import styles from "./MintHero.module.css";
import { useState } from "react";
import { useSendTransactionManifest } from "../hooks/useSendTransactionManifest";
import { useAccounts } from "../hooks/useAccounts";
import { AccountPicker } from "./base-components/account-picker/AccountPicker";
import { useRef } from "react";
import { useConnectButtonState } from "../hooks/useConnectButtonState";
import { Tooltip } from "./base-components/tooltip/Tooltip";

const Header = () => {
  const [isActive, setIsActive] = useState(false);

  const { buyWaterBear } = useSendTransactionManifest();
  const {
    state: { accounts },
  } = useAccounts();

  const [state, setState] = useState({
    hideTooltip: false,
    isPopoverOpen: false,
    insufficientXrdAlertDismissed: false,
    selectedAccountAddress: null,
  });

  const ref = useRef();
  const connectButtonState = useConnectButtonState();

  const showTooltip =
    !state.hideTooltip &&
    !state.isPopoverOpen &&
    connectButtonState === "pending";

  // Add your additional logic here

  const handleConnectClick = () => {
    setState((prevState) => ({
      ...prevState,
      isPopoverOpen: !prevState.isPopoverOpen,
    }));
  };
  const handleClick = () => {
    setIsActive(!isActive); // Toggle the state
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <a href="#">
            <img
              src={WaterBearsLogo}
              alt="Water Bears"
              className="header-logo"
            />
          </a>
          <nav className={`header-navbar ${isActive ? "active" : ""}`}>
            <a href="/" className="header-navlink">
              Home
            </a>
            <a href="#faq" className="header-navlink">
              FAQ
            </a>
            <a href="#about" className="header-navlink">
              About
            </a>
            <a href="/mint" className="header-navlink">
              Mint
            </a>
            <a href="/breed" className="header-navlink">
              Breed
            </a>
            <a href="/stake" className="header-navlink">
              Stake
            </a>
          </nav>
          <div className="header-socials">
            {!accounts.length ? (
              <>
                <div className={styles["radix-connect-button"]}>
                  <radix-connect-button ref={ref} />
                  {showTooltip && (
                    <Tooltip
                      className={styles.tooltip}
                      onClose={() =>
                        setState((prev) => ({ ...prev, hideTooltip: true }))
                      }
                    >
                      You have a request waiting! Open your Radix Wallet mobile
                      app to review and approve.
                    </Tooltip>
                  )}
                </div>
              </>
            ) : (
              <>
                <AccountPicker
                  className="mb-2"
                  accounts={accounts}
                  selected={selectedAccountAddress}
                  onSelect={(selectedAccountAddress) =>
                    setState((prev) => ({
                      ...prev,
                      selectedAccountAddress,
                    }))
                  }
                />
                <button
                  className="hero-mint-btn"
                  onClick={() =>
                    buyWaterBear({
                      accountAddress: selectedAccountAddress,
                    })
                  }
                >
                  Mint Now
                </button>
              </>
            )}
            <button
              onClick={handleConnectClick}
              ref={ref}
              className="connect-btn"
            >
              <img src={groupImg} alt="" />
              Connect
            </button>
            <a href="#">
              <TwitterIcon />
            </a>
            <a href="https://t.me/WaterBearsXRD">
              <TelegramIcon />
            </a>
            {state.isPopoverOpen && (
              <div>
                <AccountPicker
                  accounts={accounts}
                  selectedAccountAddress={state.selectedAccountAddress}
                  onSelectAccount={(address) =>
                    setState((prevState) => ({
                      ...prevState,
                      selectedAccountAddress: address,
                      isPopoverOpen: false,
                    }))
                  }
                />
              </div>
            )}
            {showTooltip && (
              <Tooltip targetRef={ref}>Connect button is pending</Tooltip>
            )}
          </div>
          <button onClick={handleClick} className="header-hamburger">
            {isActive ? <CloseIcon /> : <HamburgerIcon />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
