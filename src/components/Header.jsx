import { useRef, useState } from "react";
import WaterBearsLogo from "../assets/images/water-bears.png";
import CloseIcon from "../assets/svg/close.svg?react";
import HamburgerIcon from "../assets/svg/hamburger.svg?react";
import TelegramIcon from "../assets/svg/telegram.svg?react";
import TwitterIcon from "../assets/svg/twitter.svg?react";
import { useAccounts } from "../hooks/useAccounts";
import styles from "./MintHero.module.css";
import { AccountPicker } from "./base-components/account-picker/AccountPicker";
import { Menu } from "@headlessui/react";

const Header = ({ selectedAccountAddress, setSelectedAccountAddress }) => {
  const [isActive, setIsActive] = useState(false);

  const {
    state: { accounts },
  } = useAccounts();

  const ref = useRef();
  const handleClick = () => {
    setIsActive(!isActive); // Toggle the state
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <a href="#" className="w-[250px] header-logo">
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
            <a href="/research" className="header-navlink">
              Research
            </a>

            <div className="relative">
              <Menu>
                <Menu.Button className="header-navlink">Labo</Menu.Button>
                <Menu.Items className="absolute w-56 z-10 shadow-lg bg-white mb-4 gap-8 flex-col rounded-lg flex-row">
                  <Menu.Item key="WaterBears">
                    <a
                      className={`w-full py-3 w-full px-4 text-black block hover:text-gray-600`}
                      href="/mint"
                    >
                      Mint WaterBears
                    </a>
                  </Menu.Item>
                  <Menu.Item key="Sludge">
                    <a
                      className={`w-full py-3 w-full px-4 text-black block hover:text-gray-600`}
                      href="/mintSludge"
                    >
                      Mint Sludges
                    </a>
                  </Menu.Item>
                  <Menu.Item key="breed">
                    <a
                      className={`w-full py-3 w-full px-4 text-black block hover:text-gray-600`}
                      href="/breed"
                    >
                      Breed WaterBears
                    </a>
                  </Menu.Item>
                  <Menu.Item key="Sludge">
                    <a
                      className={`w-full py-3 w-full px-4 text-black block hover:text-gray-600`}
                      href="/nursery"
                    >
                      Nursery
                    </a>
                  </Menu.Item>
                  <Menu.Item key="Sludge">
                    <a
                      className={`w-full py-3 w-full px-4 text-black block hover:text-gray-600`}
                      href="/stake"
                    >
                      Stake
                    </a>
                  </Menu.Item>
                  <Menu.Item key="Sludge">
                    <a
                      className={`w-full py-3 w-full px-4 text-black block hover:text-gray-600`}
                      href="/rarity"
                    >
                      Rarity
                    </a>
                  </Menu.Item>
                </Menu.Items>
              </Menu>
            </div>
            <div>
              <Menu>
                <Menu.Button className="header-navlink">DAO</Menu.Button>
                <Menu.Items className="absolute w-56 z-10 shadow-lg bg-white mb-4 gap-8 flex-col rounded-lg flex-row">
                  <Menu.Item key="WaterBears">
                    <a
                      className={`w-full py-3 w-full px-4 text-black block hover:text-gray-600`}
                      href="/daoHome"
                    >
                      Home
                    </a>
                  </Menu.Item>
                  <Menu.Item key="Sludge">
                    <a
                      className={`w-full py-3 w-full px-4 text-black block hover:text-gray-600`}
                      href="/treasury"
                    >
                      Treasury
                    </a>
                  </Menu.Item>
                  <Menu.Item key="breed">
                    <a
                      className={`w-full py-3 w-full px-4 text-black block hover:text-gray-600`}
                      href="/burn"
                    >
                      Burn
                    </a>
                  </Menu.Item>
                  <Menu.Item key="auction">
                    <a
                      className={`w-full py-3 w-full px-4 text-black block hover:text-gray-600`}
                      href="/auction"
                    >
                      Auction
                    </a>
                  </Menu.Item>
                  <Menu.Item key="Sludge">
                    <a
                      className={`w-full py-3 w-full px-4 text-black block hover:text-gray-600`}
                      href="/"
                    >
                      Stake
                    </a>
                  </Menu.Item>
                </Menu.Items>
              </Menu>
            </div>
          </nav>
          <div className="header-socials">
            <div className={styles["radix-connect-button"]}>
              <radix-connect-button ref={ref} />
            </div>

            {accounts.length ? (
              <AccountPicker
                accounts={accounts}
                selected={selectedAccountAddress}
                onSelect={(selectedAccountAddress) =>
                  setSelectedAccountAddress(selectedAccountAddress)
                }
              />
            ) : (
              <></>
            )}
            {/* <button
              onClick={handleConnectClick}
              ref={ref}
              className="connect-btn"
            >
              <img src={groupImg} alt="" />
              Connect
            </button> */}
            <a target="_blank" href="https://x.com/WaterBearsxrd">
              <TwitterIcon />
            </a>
            <a href="https://t.me/WaterBearsXRD">
              <TelegramIcon />
            </a>
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
