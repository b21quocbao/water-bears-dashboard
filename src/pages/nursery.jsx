import heroLeftImg from "../assets/images/hero-left-decorator-removebg-preview.png";
import heroRightImg from "../assets/images/hero-right-decorator-removebg-preview.png";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useAccounts } from "../hooks/useAccounts";
import { config } from "../config";

import TubeCard from "../components/TubeCard";
import Card from "../components/Card";

const Nursery = () => {
  const {
    state: { accounts },
    refresh,
  } = useAccounts();
  const [accountAddress, setAccountAddress] = useState("");
  const [globalNftCount, setGlobalNftCount] = useState("--");

  useEffect(() => {
    if (accounts && accounts[0] && !accountAddress) {
      setAccountAddress(accounts[0].address);
    }
  }, [accounts, accountAddress]);

  const account = accounts.find((account) => account.address == accountAddress);

  const babysNftId = useMemo(() => {
    if (!account) return [];

    let nfts = account.nonFungibleTokens[config.addresses.waterBearResource];
    return nfts
      ? nfts.map((x) => x.id).filter((wb) => wb.includes("BabyWaterBear"))
      : [];
  }, [account]);
  console.log(babysNftId);
  const reload = useCallback(() => {
    refresh();
  }, [refresh]);

  const tubesNftsId = useMemo(() => {
    if (!account) return [];
    let nfts = account.nonFungibleTokens[config.addresses.testTubeResource];
    return nfts ? nfts.map((x) => x.id) : [];
  }, [account]);

  return (
    <>
      <Header
        selectedAccountAddress={accountAddress}
        setSelectedAccountAddress={setAccountAddress}
      />
      {/* Hero Section  */}
      <div className="container h-full flex flex-row relative">
        <img
          className="w-[50px] md:w-[234px] md:h-[390px] absolute left-0 top-20 md:top-20"
          src={heroLeftImg}
          alt=""
        />
        <div className="w-full md:w-[858px] gap-[40px] mx-auto mt-[157px] font-[400] flex flex-col">
          <div className="w-full md:w-[696px] gap-[11px] mx-auto px-auto font-[400]">
            <h1 className="text-[60px] w-full md:w-[529px] mx-auto text-center">
              Bring your Baby WaterBears to life
            </h1>
            <p className="text-[22px] opacity-70 text-center md:text-left">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor.
            </p>
          </div>
          <div>
            <b style={{ fontSize: "45px" }}>Your tubes 🧪</b>
            {tubesNftsId.length === 0 ? (
              <p className="py-6">You don't have any tubes</p>
            ) : (
              <div className="mt-6 flex gap-4">
                {tubesNftsId.map((tube) => {
                  return (
                    <TubeCard
                      reload={reload}
                      id={tube}
                      key={tube}
                      accountAddress={accountAddress}
                    />
                  );
                })}
              </div>
            )}
          </div>
          <div className="pb-12">
            <b style={{ fontSize: "45px" }}>Your babys</b>
            {babysNftId.length === 0 ? (
              <p className="py-6">You don't have any babys</p>
            ) : (
              <div className="mt-6 flex mb-6 gap-4 flex-wrap">
                {babysNftId.map((nft) => {
                  return (
                    <Card
                      isBaby
                      hideStake
                      key={`${nft}`}
                      id={nft}
                      reload={reload}
                    />
                  );
                })}
              </div>
            )}
          </div>
        </div>
        <img
          className="w-[50px] md:w-[234px] md:h-[390px] absolute right-0 top-20 md:top-20"
          src={heroRightImg}
          alt=""
        />
      </div>

      <Footer />
    </>
  );
};

export default Nursery;
