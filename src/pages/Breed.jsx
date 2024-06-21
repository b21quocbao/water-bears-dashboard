import { useEffect, useMemo, useState } from "react";
import normalBear from "../assets/images/hero-bear-lg.png";
import stylishBear from "../assets/images/hero-bear-md.png";
import heroLeftImg from "../assets/images/hero-left-decorator-removebg-preview.png";
import heroRightImg from "../assets/images/hero-right-decorator-removebg-preview.png";
import plusIcon from "../assets/images/tabler-icon-plus.png";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { config } from "../config";
import { useAccounts } from "../hooks/useAccounts";
import { useSendTransactionManifest } from "../hooks/useSendTransactionManifest";

const Breed = () => {
  const {
    state: { accounts },
  } = useAccounts();
  const [accountAddress, setAccountAddress] = useState("");

  useEffect(() => {
    if (accounts && accounts[0] && !accountAddress) {
      setAccountAddress(accounts[0].address);
    }
  }, [accounts, accountAddress]);

  const account = accounts.find((account) => account.address == accountAddress);

  const [selected, setSelected] = useState([]);

  const unstakedNftIds = useMemo(() => {
    if (!account) return [];
    let nfts = account.nonFungibleTokens[config.addresses.waterBearResource];
    return nfts ? nfts.map((x) => x.id) : [];
  }, [account]);

  const { buyTestTube } = useSendTransactionManifest()();

  return (
    <>
      {/* Hero Section  */}
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
        <div className="w-full md:w-[858px] gap-[40px] mx-auto mt-[157px] mb-[93px] font-[400] flex flex-col px-5 md:px-0">
          <div className="w-full gap-[38px] flex flex-row justify-between">
            <div className="gap-[24px] w-[339px] flex flex-col">
              <img src={normalBear} alt="" />
              <div className="w-[103px] mx-auto">
                <h1 className="text-[32px] text-opacity-70">Parent X</h1>
              </div>
            </div>
            <div className="size-[104px]  my-auto">
              <img src={plusIcon} alt="" />
            </div>
            <div className="gap-[24px] w-[339px] flex flex-col">
              <img className="object-cover" src={stylishBear} alt="" />
              <div className="w-[103px] mx-auto">
                <h1 className="text-[32px] text-opacity-70">Parent Y</h1>
              </div>
            </div>
          </div>
          <button
            className="w-full h-[68px] flex justify-center items-center text-[36px] rounded-lg bg-[#42bfe8]"
            onClick={() => {
              buyTestTube({
                accountAddress,
                id1: selected[0],
                id2: selected[1],
                amount: 1,
              });
            }}
          >
            Breed Now!
          </button>
        </div>

        <img
          className="w-[50px] md:w-[234px] md:h-[390px] absolute right-0 top-20 md:top-20"
          src={heroRightImg}
          alt=""
        />
      </div>
      {/* Hero Section  */}

      <div className="w-full md:w-[860px] gap-[40px] mx-auto mb-[140px] font-[400] flex flex-col">
        <div className="w-full md:w-[560px] mx-auto">
          <h1 className="text-[47px] md:text-[50px] w-full text-center md:text-left">
            Choose 2 WaterBears to Breed
          </h1>
        </div>

        <div
          className="w-full flex flex-col md:flex-row gap-[20px]"
          style={{ flexWrap: "wrap" }}
        >
          {unstakedNftIds.map((nft) => (
            <div
              className=" flex flex-col gap-[8px] w-[200px] mx-auto md:mx-0 bg-[#2B2B2B] pb-3 rounded-lg"
              key={nft}
            >
              <img
                className="w-full rounded-tr-lg rounded-tl-lg"
                src={`/images/waterbears${parseInt(nft.substr(11))}.png`}
                alt=""
              />
              <div className="flex flex-col w-[176px] gap-[20px] mx-auto">
                <div className="w-full gap-[12px]">
                  <h1 className="text-[26px] opacity-70">{nft}</h1>
                  <h1 className="text-[26px]">#{parseInt(nft.substr(11))}</h1>
                  <button
                    className="w-full h-[34px] rounded-lg flex justify-center items-center bg-[#42bfe8]"
                    onClick={() =>
                      setSelected((old) =>
                        old.includes(nft)
                          ? old.filter((x) => x != nft)
                          : [...old, nft]
                      )
                    }
                  >
                    {selected.includes(nft) ? "Deselect" : "Select"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* <Carousel /> */}
      <Footer />
    </>
  );
};

export default Breed;
