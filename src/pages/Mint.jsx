import { useEffect, useState } from "react";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { MintHero } from "../components/MintHero";
import MintSlider from "../components/MintSlider";
import { useAccounts } from "../hooks/useAccounts";

const Mint = () => {
  const [accountAddress, setAccountAddress] = useState("");
  const {
    state: { accounts },
  } = useAccounts();
  useEffect(() => {
    if (accounts && accounts[0] && !accountAddress) {
      setAccountAddress(accounts[0].address);
    }
  }, [accounts, accountAddress]);

  return (
    <>
      <Header
        selectedAccountAddress={accountAddress}
        setSelectedAccountAddress={setAccountAddress}
      />
      <main>
        <MintHero selectedAccountAddress={accountAddress} />
        <MintSlider />
        <Contact />
      </main>

      <Footer />
    </>
  );
};

export default Mint;
