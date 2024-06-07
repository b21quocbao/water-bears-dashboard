import Card from "../components/Card";
import { FaChevronDown } from "react-icons/fa";
import heroLeftImg from "../assets/images/hero-left-decorator-removebg-preview.png";
import heroRightImg from "../assets/images/hero-right-decorator-removebg-preview.png";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useSendTransactionManifest } from "../hooks/useSendTransactionManifest";
import { useEffect, useMemo, useState } from "react";
import { useAccounts } from "../hooks/useAccounts";
import { config } from "../config";
import {
  GatewayApiClient,
  RadixNetwork,
} from "@radixdlt/babylon-gateway-api-sdk";

const Stake = () => {
  const [accountAddress, setAccountAddress] = useState("");
  const [stakedNftIds, setStakedNftIds] = useState(null);
  const [stakeData, setStakeData] = useState(null);
  const {
    state: { accounts },
  } = useAccounts();

  const unstakedNftIds = useMemo(() => {
    const account = accounts.find(
      (account) => account.address == accountAddress
    );
    let nfts = account
      ? account.nonFungibleTokens[config.addresses.waterBearResource]
      : [];
    return nfts ? nfts.map((x) => x.id) : [];
  }, [accounts, accountAddress]);

  const waterBearStakeId = useMemo(() => {
    try {
      const account = accounts.find(
        (account) => account.address == accountAddress
      );
      return account
        ? account.nonFungibleTokens[
            config.addresses.waterBearStakeIdResource
          ][0].id
        : null;
    } catch (err) {
      return null;
    }
  }, [accounts, accountAddress]);

  useEffect(() => {
    (async () => {
      if (!waterBearStakeId) return;
      const gatewayApi = GatewayApiClient.initialize({
        networkId: RadixNetwork.Stokenet,
        applicationName: "WaterBears",
      });
      const { state } = gatewayApi;
      const res = await state.getNonFungibleData(
        config.addresses.waterBearStakeIdResource,
        waterBearStakeId
      );
      setStakedNftIds(
        res.data.programmatic_json.fields[1].elements.map((x) => x.value)
      );
      setStakeData(res.data.programmatic_json.fields);
      setStakedNftIds(
        res.data.programmatic_json.fields[1].elements.map((x) => x.value)
      );
    })();
  }, [waterBearStakeId]);

  const nfts = useMemo(() => {
    if (!unstakedNftIds || !stakedNftIds) return null;
    return unstakedNftIds
      .map((id) => ({
        id,
        staked: false,
      }))
      .concat(
        stakedNftIds.map((id) => ({
          id,
          staked: true,
        }))
      );
  }, [unstakedNftIds, stakedNftIds]);
  const reward = useMemo(() => {
    if (stakeData) {
      return (
        parseInt(stakeData[4].value) +
        (5 *
          (Date.now() / 1000 - parseInt(stakeData[0].value)) *
          stakeData[1].elements.length) /
          86400
      );
    }
    return 0;
  }, [stakeData]);
  // const globalStakePercent = 85;

  const { createStakingId, claimRewards } = useSendTransactionManifest()();

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
            <h1 className="text-[60px] w-full md:w-[529px] mx-auto text-center md:text-left">
              Stake Your Water Bears
            </h1>
            <p className="text-[22px] opacity-70 text-center md:text-left">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor.
            </p>
          </div>
          <div className="w-full md:w-[858px] gap-[93px] flex flex-col">
            <div className="w-full bg-[#42bfe8] gap-[40px] rounded-lg p-[32px] flex flex-col md:flex-row items-center">
              <div className="w-[202px] gap-[8px] text-center">
                <h1 className="text-[18px] font-[400]">
                  Global Of Water Bears Staked
                </h1>
                <p className="text-[28px]">--</p>
              </div>

              <div className="w-[202px] gap-[8px] text-center">
                <h1 className="text-[18px] font-[400]">
                  Your WaterBears Staked:
                </h1>
                <div className="flex flex-row justify-center">
                  <p className="text-[28px]">
                    {stakedNftIds ? stakedNftIds.length : 0}/
                    {nfts ? nfts.length : 0}
                  </p>
                </div>
              </div>

              <div className="w-[202px] gap-[8px] text-center">
                <h1 className="text-[18px] font-[400]">
                  Your WaterBears Staking Id:
                </h1>
                <div className="flex flex-row justify-center">
                  <p className="text-[28px]">
                    {waterBearStakeId
                      ? parseInt(waterBearStakeId.substr(1))
                      : "Not found"}
                  </p>
                </div>
                {accountAddress && !waterBearStakeId && (
                  <button
                    className="w-full h-[44px] bg-white text-[#42bfe8] text-[20px] flex justify-center items-center rounded-lg"
                    onClick={() => {
                      createStakingId({
                        accountAddress,
                      });
                    }}
                  >
                    Create Staking ID
                  </button>
                )}
              </div>

              <div className="w-[161px] gap-[8px] text-center flex flex-col">
                <div className="flex flex-row items-center justify-center">
                  <h1 className="text-[16px] font-[400] pt-2 mr-1">
                    My Rewards
                  </h1>
                  <h1 className="text-[32px] font-[400]">
                    DNA {reward.toFixed(2)}
                  </h1>
                </div>

                {accountAddress && waterBearStakeId && (
                  <button
                    className="w-full h-[44px] bg-white text-[#42bfe8] text-[20px] flex justify-center items-center rounded-lg"
                    style={{ zIndex: 2 }}
                    onClick={() =>
                      claimRewards({ accountAddress, waterBearStakeId })
                    }
                  >
                    Claim Reward
                  </button>
                )}
              </div>
            </div>

            <div className="w-full md:w-[858px] gap-[40px] flex flex-col mb-20">
              <div className="w-full flex flex-col md:flex-row justify-between">
                {/* <div className="w-[305px] gap-[29px] flex flex-row md:mx-0 mx-auto mb-10 md:mb-0">
                  <button className="w-[137px] h-[44px] rounded-lg flex items-center justify-center bg-[#42BFE8] text-[20px]">
                    Stake All
                  </button>
                  <button className="w-[137px] h-[44px] rounded-lg flex items-center justify-center bg-[#2B2B2B] text-[20px] text-white text-opacity-70 border-[1px] border-white">
                    Unstake All
                  </button>
                </div> */}
                <div className="flex flex-col md:flex-row my-5 md:my-0 mx-auto md:mx-0">
                  <button className="w-[119px] h-[44px] rounded-lg flex items-center justify-center bg-[#2B2B2B] text-[20px] text-white text-opacity-70 border-[1px] border-white gap-[10px]">
                    <h1>Sort By</h1>
                    <FaChevronDown className="size-[20px]" />
                  </button>
                </div>
              </div>

              {/* Cards  */}
              <div className="w-full flex flex-col md:flex-row gap-[20px]">
                {(nfts || []).map((nft) => (
                  <Card
                    accountAddress={accountAddress}
                    waterBearStakeId={waterBearStakeId}
                    key={nft.id}
                    id={nft.id}
                    staked={nft.staked}
                  />
                ))}
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

export default Stake;
