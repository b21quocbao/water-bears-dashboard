import { CiMenuBurger } from "react-icons/ci";
import { FaShare } from "react-icons/fa";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi";
import XRD from "../assets/images/xrd.jpg";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useSendTransactionManifest } from "../hooks/useSendTransactionManifest";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useAccounts } from "../hooks/useAccounts";
import { useDappToolkit } from "../hooks/useDappToolkit";
import { useInterval } from "../hooks/useInterval";
import { useSearchParams } from "react-router-dom";
import { GatewayApiClient } from "@radixdlt/babylon-gateway-api-sdk";
import { RadixNetwork } from "@radixdlt/radix-dapp-toolkit";
import { config } from "../config";

const formatDuration = (d) => {
  d *= 5;

  return `${Math.trunc(d / 60)}h ${d % 60}min`;
};

const Auction = () => {
  const auctionComponents = useMemo(
    () => [
      {
        address:
          "component_rdx1czejxgx8xclvnpt04657u97uy7anvzf5jus9v9w6mqasde5xu3u24e",
        image: "/images/daos/3.png",
        name: "WaterBears Dao #3",
      },
      {
        address:
          "component_rdx1cr3dz2acd2n58nt0m6dj52grl6rk7ugr7kedvax762xn2m6h0a5n0x",
        image: "/images/daos/2.png",
        name: "WaterBears Dao #2",
      },
      {
        address:
          "component_rdx1cqp6rxw5fewad8e8pzmf4s60dzwt769dmftgsf3rpp0dsp3c4z2lad",
        image: "/images/daos/1.png",
        name: "WaterBears Dao #1",
      },
    ],
    []
  );

  const [height, setHeight] = useState(0);
  const [allBids, setAllBids] = useState(false);
  const [bids, setBids] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const idx = Number(searchParams.get("id")) || 0;
  const ref = useRef(null);
  const {
    state: { accounts },
    refresh,
  } = useAccounts();
  const [accountAddress, setAccountAddress] = useState("");
  const [userBid, setUserBid] = useState(null);
  const [isWinner, setIsWinner] = useState(null);
  const [winner, setWinner] = useState(null);
  const { gatewayApi } = useDappToolkit();
  const [endEpoch, setEndEpoch] = useState(null);
  const [currentEpoch, setCurrentEpoch] = useState(null);
  const [bidAmount, setBidAmount] = useState("");
  const [bidToken, setBidToken] = useState("");
  const [bidBadgeResource, setBidBadgeResource] = useState("");
  const [lastBid, setLastBid] = useState("");
  const [auctionState, setAuctionState] = useState("");
  const { bid, increaseBid, claimRewardNft, claimFunds } =
    useSendTransactionManifest()();
  const isOpen = useMemo(
    () => auctionState == "Open" && currentEpoch < endEpoch,
    [auctionState, currentEpoch, endEpoch]
  );

  const auctionComponent = useMemo(
    () => auctionComponents[idx].address,
    [auctionComponents, idx]
  );
  const nftImage = useMemo(
    () => auctionComponents[idx].image,
    [auctionComponents, idx]
  );
  const nftName = useMemo(
    () => auctionComponents[idx].name,
    [auctionComponents, idx]
  );

  useEffect(() => {
    if (accounts && accounts[0] && !accountAddress) {
      setAccountAddress(accounts[0].address);
    }
  }, [accounts, accountAddress]);

  const account = accounts.find((account) => account.address == accountAddress);

  const bidBadgeId = useMemo(() => {
    try {
      if (!account) return null;
      return account.nonFungibleTokens[bidBadgeResource][0].id;
    } catch (err) {
      return null;
    }
  }, [account, bidBadgeResource]);

  const waterBearNFTs = useMemo(() => {
    if (!account) return [];

    let nfts = account.nonFungibleTokens[config.addresses.waterBearResource];
    return nfts
      ? nfts.map((x) => x.id)
      : [];
  }, [account]);

  const getBids = useCallback(async () => {
    const { state, status } = gatewayApi;
    const res = await state.getEntityDetailsVaultAggregated(auctionComponent);
    setBids(
      res.fungible_resources.items[0].vaults.items.filter(
        (x) => x.amount != "0"
      )
    );
    setBidBadgeResource(res.details.state.fields[3].value);
    setBidToken(res.details.state.fields[4].value);
    setEndEpoch(Number(res.details.state.fields[5].value));
    setAuctionState(res.details.state.fields[6].variant_name);
    setLastBid(res.details.state.fields[7].value);

    const {
      ledger_state: { epoch },
    } = await status.getCurrent();
    setCurrentEpoch(epoch);
  }, [auctionComponent, gatewayApi]);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeight(ref.current?.clientHeight);
    }, 20);

    return () => clearInterval(interval);
  }, [ref]);

  const getOldStakedWaterBears = useCallback(async () => {
    if (!bidBadgeId || !bidBadgeResource) {
      setUserBid(null);
      setIsWinner(false);
      return;
    }
    const gatewayApi = GatewayApiClient.initialize({
      networkId: RadixNetwork.Mainnet,
      applicationName: "WaterBears",
    });
    const { state } = gatewayApi;
    const res = await state.getNonFungibleData(bidBadgeResource, bidBadgeId);
    setUserBid({ amount: res.data.programmatic_json.fields[0].value });
    setIsWinner(res.data.programmatic_json.fields[1].value);
  }, [bidBadgeResource, bidBadgeId]);

  useEffect(() => {
    getOldStakedWaterBears();
  }, [getOldStakedWaterBears]);

  useInterval(getBids, 15 * 1000); // refetch every 15s

  useEffect(() => {
    getBids();
  }, [getBids]);

  useEffect(() => {
    if (isWinner) {
      setWinner(true);
      return;
    }

    if (userBid && userBid.amount == lastBid && auctionState == "Open") {
      setWinner(true);
      return;
    }

    setWinner(false);
    return;
  }, [isWinner, auctionState, userBid && userBid.amount == lastBid, lastBid]);

  return (
    <>
      <Header
        selectedAccountAddress={accountAddress}
        setSelectedAccountAddress={setAccountAddress}
      />
      <main>
        <section className="hero py-4">
          <div className="mx-auto max-w-5xl p-4 mb-44">
            <div className="flex-row md:flex items-center gap-8">
              <div className="relative mx-auto w-3/4 md:w-1/2">
                <img
                  ref={ref}
                  src={nftImage}
                  style={{ maxWidth: "95%", zIndex: 2 }}
                  className="relative mx-auto"
                />
                <div
                  style={{
                    width: "100%",
                    top: "15%",
                    zIndex: 1,
                    height: `${height + 20}px`,
                    background: "transparent",
                    border: "1px #a3d416 solid",
                  }}
                  className="absolute rounded-xl"
                ></div>
              </div>
              <div>
                <div className="flex gap-2 justify-center mt-2 md:mt-0 md:justify-start items-center">
                  <button
                    style={{
                      color: "white",
                      margin: "inherit",
                      background: "transparent",
                      borderRadius: "9999px",
                      width: "40px",
                    }}
                    className="hero-mint-btn-dao"
                    onClick={() =>
                      setSearchParams({
                        id:
                          (idx - 1 + auctionComponents.length) %
                          auctionComponents.length,
                      })
                    }
                  >
                    <HiArrowLeft />
                  </button>
                  <button
                    style={{
                      color: "white",
                      margin: "inherit",
                      borderRadius: "9999px",
                      width: "40px",
                    }}
                    className="hero-mint-btn-dao"
                    onClick={() =>
                      setSearchParams({
                        id:
                          (idx + 1 + auctionComponents.length) %
                          auctionComponents.length,
                      })
                    }
                  >
                    <HiArrowRight />
                  </button>
                </div>
                <p className="text-7xl mt-6 md:mt-2">{nftName}</p>
                <div className="flex mt-3">
                  <div className="flex flex-col items-start border-r-2 pr-6">
                    <p className="sludge text-2xl">{nftName}</p>
                    {!!userBid && (isOpen || !winner) && (
                      <div className="flex text-5xl items-center gap-1">
                        <img width={30} height={30} src={XRD} />
                        {userBid.amount}
                      </div>
                    )}
                  </div>
                  {isOpen ? (
                    <div className="flex flex-col items-start pl-6">
                      <p className="sludge text-2xl">Estimated time left</p>
                      <div className="flex text-5xl items-center gap-1">
                        {formatDuration(
                          currentEpoch && endEpoch ? endEpoch - currentEpoch : 0
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-start pl-6">
                      <p className="sludge text-2xl items-center">
                        Auction Ended
                      </p>
                      <div className="flex text-5xl items-center gap-1">
                        Highest Bid: {lastBid}
                      </div>
                    </div>
                  )}
                </div>
                {isOpen ? (
                  <div
                    className="p-1 flex bg-[#4b4949] mb-2 rounded-xl"
                    style={{ border: "1px gray solid" }}
                  >
                    <input
                      className="bg-transparent text-xl rounded-xl px-4 w-1/2"
                      placeholder={`${
                        bids.length ? Number(bids[0].amount) + 0.01 : 0.01
                      } or more`}
                      value={bidAmount}
                      onChange={(e) => setBidAmount(e.target.value)}
                    />
                    <button
                      style={{
                        color: "white",
                        height: "50px",
                        margin: 0,
                      }}
                      className="hero-mint-btn-dao"
                      onClick={() =>
                        userBid
                          ? increaseBid({
                              auctionComponent,
                              accountAddress,
                              bidToken,
                              amount: Number(bidAmount) - userBid.amount,
                              bidBadgeResource,
                              bidBadgeId,
                            }).then(() => refresh())
                          : bid({
                              auctionComponent,
                              accountAddress,
                              bidToken,
                              waterBearId: waterBearNFTs[0],
                              amount: Number(bidAmount),
                            }).then(() => refresh())
                      }
                    >
                      Place Bid
                    </button>
                  </div>
                ) : (
                  <>
                    {userBid ? (
                      <div
                        className="my-4 flex flex-col"
                        style={{ alignItems: "center" }}
                      >
                        <p
                          className="sludge flex items-center gap-1"
                          style={
                            !winner
                              ? {
                                  color: "red",
                                }
                              : {}
                          }
                        >
                          {winner
                            ? "You won. Please claim reward NFT!"
                            : "You lost. Please claim back your funds!"}
                        </p>
                        <button
                          style={
                            !winner
                              ? {
                                  background: "red",
                                  border: "red",
                                  color: "white",
                                  height: "50px",
                                  margin: 0,
                                }
                              : {
                                  color: "white",
                                  height: "50px",
                                  margin: 0,
                                }
                          }
                          className="hero-mint-btn-dao"
                          onClick={() =>
                            winner
                              ? claimRewardNft({
                                  auctionComponent,
                                  accountAddress,
                                  bidBadgeResource,
                                  bidBadgeId,
                                }).then(() => refresh())
                              : claimFunds({
                                  auctionComponent,
                                  accountAddress,
                                  bidBadgeResource,
                                  bidBadgeId,
                                }).then(() => refresh())
                          }
                        >
                          Claim
                        </button>
                      </div>
                    ) : (
                      <></>
                    )}
                  </>
                )}

                {isOpen && (
                  <>
                    <div style={{ maxHeight: "200px", overflowY: "auto" }}>
                      {(allBids ? bids : bids.slice(0, 3)).map((bid) => {
                        return (
                          <div
                            className="flex p-3 bg-[#2f2f2f] items-center mb-2 justify-between rounded-xl w-full"
                            key={bid.vault_address}
                          >
                            <p>WaterBearDontCare</p>
                            <div className="flex gap-3 items-center">
                              <CiMenuBurger />
                              {Number(bid.amount).toFixed(2)}
                              <button>
                                <FaShare />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div className="flex justify-center mt-4">
                      <a
                        className="sludge underline text-center w-full mx-auto"
                        href="#"
                        onClick={() => setAllBids((x) => !x)}
                      >
                        {allBids ? "Hide all bids" : "View all bids"}
                      </a>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Auction;
