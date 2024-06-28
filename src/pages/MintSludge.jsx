import { useEffect, useState } from "react";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useAccounts } from "../hooks/useAccounts";
import { MintHeroSludge } from "../components/sludge/MintHeroSludge";

const MintSludge = () => {
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
        <MintHeroSludge selectedAccountAddress={accountAddress} />

        <Contact />
      </main>

      <Footer />
    </>
  );
};

export default MintSludge;
