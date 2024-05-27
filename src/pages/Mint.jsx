import { useState } from "react";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { MintHero } from "../components/MintHero";
import MintSlider from "../components/MintSlider";

const Mint = () => {
  const [selectedAccountAddress, setSelectedAccountAddress] = useState("");

  return (
    <>
      <Header
        selectedAccountAddress={selectedAccountAddress}
        setSelectedAccountAddress={setSelectedAccountAddress}
      />
      <main>
        <MintHero selectedAccountAddress={selectedAccountAddress} />
        <MintSlider />
        <Contact />
      </main>

      <Footer />
    </>
  );
};

export default Mint;
