import Card from "../components/Card";
import heroLeftImg from "../assets/images/hero-left-decorator-removebg-preview.png";
import heroRightImg from "../assets/images/hero-right-decorator-removebg-preview.png";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useSendTransactionManifest } from "../hooks/useSendTransactionManifest";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useAccounts } from "../hooks/useAccounts";
import { config } from "../config";
import {
  calculateRarityAcrossAll,
  calculateRarityValueForAll,
  encodeName,
  extractNumber,
  getAllAttributes,
  getRankForWaterBearInSortedRarity,
  getRarityForWaterBear,
} from "../helpers/rarity";
import nfts from "../metadata.json";

const RarityPage = () => {
  const {
    state: { accounts },
    refresh,
  } = useAccounts();
  const [accountAddress, setAccountAddress] = useState("");

  const [showRarity, setShowRarity] = useState(false);

  return (
    <>
      <Header
        selectedAccountAddress={accountAddress}
        setSelectedAccountAddress={setAccountAddress}
      />

      <div className="container h-full flex flex-row relative">
        <img
          className="w-[50px] md:w-[234px] md:h-[390px] absolute left-0 top-20 md:top-20"
          src={heroLeftImg}
          alt=""
        />
        <div className="w-full md:w-[858px] gap-[40px] mx-auto mt-[157px] font-[400] flex flex-col">
          <div className="w-full md:w-[696px] gap-[11px] mx-auto px-auto font-[400]">
            <h1 className="text-[60px] w-full md:w-[529px] mx-auto text-center">
              Rarity
            </h1>
            <p className="text-[22px] opacity-70 text-center">
              Each WaterBears has different traits and attributes, making them
              unique and rare.
            </p>
          </div>
          <div className="w-full md:w-[858px] gap-[93px] flex flex-col">
            <div className="w-full md:w-[860px] gap-[40px] flex flex-col mb-20">
              <div className="w-full flex flex-col md:flex-row justify-between">
                <div className="flex flex-col justify-end w-full md:flex-row my-5 md:my-0 mx-auto md:mx-0">
                  <div className="flex justify-end items-center gap-2">
                    <p>Show rarity</p>
                    <div className="relative inline-block w-10 mr-2 align-middle select-none">
                      <input
                        checked={showRarity}
                        onChange={(e) => {
                          setShowRarity(e.target.checked);
                        }}
                        type="checkbox"
                        name="toggle"
                        id="Blue"
                        className="checked:bg-[#42bfe8] outline-none focus:outline-none right-4 checked:right-0 duration-200 ease-in absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                      />
                      <label
                        htmlFor="Blue"
                        className="block h-6 overflow-hidden bg-gray-600 rounded-full cursor-pointer"
                      ></label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Cards  */}

              <div
                className="w-full flex flex-col md:flex-row gap-[20px]"
                style={{ flexWrap: "wrap" }}
              >
                {(nfts || []).map((nft) => {
                  return (
                    <Card
                      rank={nft.rank}
                      rarity={nft.rarity}
                      showRarity={showRarity}
                      accountAddress={accountAddress}
                      key={`${nft.name}`}
                      id={extractNumber(nft.name)}
                      staked={nft.staked}
                    />
                  );
                })}
              </div>
              {/* Cards  */}
            </div>
          </div>
        </div>
        <img
          className="w-[50px] md:w-[234px] md:h-[390px] absolute right-0 top-20 md:top-20"
          src={heroRightImg}
          alt=""
        />
      </div>
      {/* Hero Section  */}

      {/* Carousel  */}
      {/* <Carousel /> */}
      {/* Carousel  */}

      <Footer />
    </>
  );
};

export default RarityPage;
