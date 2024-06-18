import Card from "../components/Card";
import { FaChevronDown } from "react-icons/fa";
import heroLeftImg from "../assets/images/hero-left-decorator-removebg-preview.png";
import heroRightImg from "../assets/images/hero-right-decorator-removebg-preview.png";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useSendTransactionManifest } from "../hooks/useSendTransactionManifest";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useAccounts } from "../hooks/useAccounts";
import { config } from "../config";
import {
  GatewayApiClient,
  RadixNetwork,
} from "@radixdlt/babylon-gateway-api-sdk";

const Stake = () => {
  const [stakedNftIds, setStakedNftIds] = useState(null);
  const [stakeData, setStakeData] = useState(null);
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

  const unstakedNftIds = useMemo(() => {
    if (!account) return [];
    let nfts = account.nonFungibleTokens[config.addresses.waterBearResource];
    return nfts ? nfts.map((x) => x.id) : [];
  }, [account]);

  const waterBearStakeId = useMemo(() => {
    try {
      if (!account) return null;
      return account.nonFungibleTokens[
        config.addresses.waterBearStakeIdResource
      ][0].id;
    } catch (err) {
      return null;
    }
  }, [account]);

  const getStakedWaterBears = useCallback(async () => {
    if (!waterBearStakeId) return;
    const gatewayApi = GatewayApiClient.initialize({
      networkId: RadixNetwork.Mainnet,
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
  }, [waterBearStakeId]);

  const getAllStakedWaterBears = useCallback(async () => {
    const gatewayApi = GatewayApiClient.initialize({
      networkId: RadixNetwork.Mainnet,
      applicationName: "WaterBears",
    });
    const { state } = gatewayApi;
    const res = await state.getEntityDetailsVaultAggregated(
      config.addresses.stakePoolComponent
    );
    setGlobalNftCount(parseInt(res.details.state.fields[1].value));
  }, []);

  useEffect(() => {
    getStakedWaterBears();
  }, [getStakedWaterBears]);

  useEffect(() => {
    getAllStakedWaterBears();
  }, [getAllStakedWaterBears]);

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

  const {
    createStakingId,
    claimRewards,
    claimOldRewards,
    stakeWaterBear,
    withdrawWaterBear,
  } = useSendTransactionManifest()();

  const [oldStakedNftIds, setOldStakedNftIds] = useState(null);

  const oldWaterBearStakeId = useMemo(() => {
    try {
      if (!account) return null;
      return account.nonFungibleTokens[
        config.addresses.oldWaterBearStakeIdResource
      ][0].id;
    } catch (err) {
      return null;
    }
  }, [account]);

  const getOldStakedWaterBears = useCallback(async () => {
    if (!oldWaterBearStakeId) return;
    const gatewayApi = GatewayApiClient.initialize({
      networkId: RadixNetwork.Mainnet,
      applicationName: "WaterBears",
    });
    const { state } = gatewayApi;
    const res = await state.getNonFungibleData(
      config.addresses.oldWaterBearStakeIdResource,
      oldWaterBearStakeId
    );
    setOldStakedNftIds(
      res.data.programmatic_json.fields[1].elements.map((x) => x.value)
    );
    setOldStakedNftIds(
      res.data.programmatic_json.fields[1].elements.map((x) => x.value)
    );
  }, [oldWaterBearStakeId]);

  useEffect(() => {
    getOldStakedWaterBears();
  }, [getOldStakedWaterBears]);

  const reload = useCallback(() => {
    getStakedWaterBears();
    getAllStakedWaterBears();
    getOldStakedWaterBears();
    refresh();
  }, [
    getStakedWaterBears,
    getAllStakedWaterBears,
    getOldStakedWaterBears,
    refresh,
  ]);

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
                <p className="text-[28px]">{globalNftCount}</p>
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
                      }).then(() => reload());
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
                      claimRewards({ accountAddress, waterBearStakeId }).then(
                        () => reload()
                      )
                    }
                  >
                    Claim Reward
                  </button>
                )}
              </div>
            </div>

            <div className="w-full md:w-[860px] gap-[20px] flex flex-col mb-20">
              <div className="w-full flex flex-col md:flex-row justify-between">
                <div className="flex flex-col md:flex-row my-5 md:my-0 mx-auto md:mx-0">
                  <button className="w-[119px] h-[44px] rounded-lg flex items-center justify-center bg-[#2B2B2B] text-[20px] text-white text-opacity-70 border-[1px] border-white gap-[10px]">
                    <h1>Sort By</h1>
                    <FaChevronDown className="size-[20px]" />
                  </button>
                </div>
              </div>

              {/* Cards  */}
              {oldStakedNftIds && oldStakedNftIds.length > 0 && (
                <>
                  <div>
                    <div style={{ display: "flex" }}>
                      <b style={{ fontSize: "30px", width: "250px" }}>
                        Old Staking System
                      </b>
                      <button
                        className="w-[175px] h-[40px] bg-white text-[#42bfe8] text-[20px] flex justify-center items-center rounded-lg"
                        style={{ zIndex: 2 }}
                        onClick={() =>
                          claimOldRewards({
                            accountAddress,
                            waterBearStakeId: oldWaterBearStakeId,
                          }).then(() => reload())
                        }
                      >
                        Claim Old Reward
                      </button>
                    </div>
                    <br />
                    <b style={{ color: "red" }}>
                      Warning: A flaw has been detected in the old staking
                      component. Please unstake your NFTs immediately to prevent
                      any potential loss or issues.
                    </b>
                  </div>
                  <div
                    className="w-full flex flex-col md:flex-row gap-[20px]"
                    style={{ flexWrap: "wrap" }}
                  >
                    {(oldStakedNftIds || []).map((nft) => (
                      <Card
                        accountAddress={accountAddress}
                        waterBearStakeId={oldWaterBearStakeId}
                        key={`${nft}`}
                        id={nft}
                        staked={true}
                        reload={reload}
                        old={true}
                      />
                    ))}
                  </div>
                  <hr />
                </>
              )}

              <div>
                <b style={{ fontSize: "30px" }}>New Staking System</b>
              </div>
              {waterBearStakeId ? (
                <>
                  <div style={{ display: "flex" }} className="gap-x-[20px]">
                    <p style={{ fontSize: "20px" }}>Unstaked NFTs</p>
                    <div className="w-[305px] gap-[29px] flex flex-row md:mx-0 mx-auto mb-10 md:mb-0">
                      <button
                        className="w-[120px] h-[30px] rounded-lg flex items-center justify-center bg-[#42BFE8] text-[18px]"
                        onClick={() =>
                          stakeWaterBear({
                            accountAddress,
                            id: unstakedNftIds,
                            waterBearStakeId,
                          }).then(reload)
                        }
                      >
                        Stake All
                      </button>
                    </div>
                  </div>
                  <div
                    className="w-full flex flex-col md:flex-row gap-[20px]"
                    style={{ flexWrap: "wrap" }}
                  >
                    {(unstakedNftIds || []).map((nft) => (
                      <Card
                        accountAddress={accountAddress}
                        waterBearStakeId={waterBearStakeId}
                        key={`${nft}`}
                        id={nft}
                        staked={false}
                        reload={reload}
                      />
                    ))}
                  </div>
                  <div style={{ display: "flex" }} className="gap-x-[20px]">
                    <p style={{ fontSize: "20px" }}>Staked NFTs</p>
                    <div className="w-[305px] gap-[29px] flex flex-row md:mx-0 mx-auto mb-10 md:mb-0">
                      <button
                        className="w-[120px] h-[30px] rounded-lg flex items-center justify-center bg-[#42BFE8] text-[18px]"
                        onClick={() =>
                          withdrawWaterBear({
                            accountAddress,
                            id: stakedNftIds,
                            waterBearStakeId,
                          }).then(reload)
                        }
                      >
                        Unstake All
                      </button>
                    </div>
                  </div>
                  <div
                    className="w-full flex flex-col md:flex-row gap-[20px]"
                    style={{ flexWrap: "wrap" }}
                  >
                    {(stakedNftIds || []).map((nft) => (
                      <Card
                        accountAddress={accountAddress}
                        waterBearStakeId={waterBearStakeId}
                        key={`${nft}`}
                        id={nft}
                        staked={true}
                        reload={reload}
                      />
                    ))}
                  </div>
                </>
              ) : (
                <b style={{ color: "red" }}>Please create a staking ID first</b>
              )}
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
