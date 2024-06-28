import { useCallback, useEffect, useState } from "react";
import HeroLeftDecorator from "../../assets/images/left.png";
import HeroRightDecorator from "../../assets/images/right.png";
import { useSendTransactionManifest } from "../../hooks/useSendTransactionManifest";
import {
  GatewayApiClient,
  RadixNetwork,
} from "@radixdlt/babylon-gateway-api-sdk";
import { config } from "../../config";

export const MintHeroSludge = ({ selectedAccountAddress }) => {
  const [count, setCount] = useState(0);
  const [minted, setMinted] = useState("--");

  const { buySludge } = useSendTransactionManifest()();

  const getMintedCount = useCallback(async () => {
    const gatewayApi = GatewayApiClient.initialize({
      networkId: RadixNetwork.Mainnet,
      applicationName: "WaterBears",
    });
    const { state } = gatewayApi;
    const res = await state.getEntityDetailsVaultAggregated(
      config.addresses.sludgeComponent
    );
    setMinted(parseInt(res.details.state.fields[2].elements.length));
  }, []);

  useEffect(() => {
    getMintedCount();
  }, [getMintedCount]);

  const increment = () => {
    setCount((prevCount) => Math.min(prevCount + 1, 20)); // Limit to 20
  };

  const decrement = () => {
    setCount((prevCount) => Math.max(prevCount - 1, 0)); // Limit to 0
  };

  const handleChange = (event) => {
    const newCount = parseInt(event.target.value, 10);
    if (isNaN(newCount) || newCount < 0 || newCount > 20) {
      return; // Ignore invalid input
    }
    setCount(newCount);
  };

  const handleFocus = () => {
    if (count === 0) {
      setCount(""); // Clear input value on focus only if it's 0
    }
  };

  return (
    <section className="hero py-4">
      <div className="container">
        <div className="hero-mint-content">
          <img
            src={HeroLeftDecorator}
            alt=""
            className="w-1/5 hidden md:block lg:w-1/4 max-w-96 h-full"
          />
          <div className="hero-mint">
            <h2 style={{ color: "#a3d416" }} className="hero-mint-title ">
              SLUDGE MINT
            </h2>
            <p className="hero-mint-text">
              Viscosa haec substantia proprietates nunquam antea in terra visas
              habet, quorsum tandem adhiberi potest?
            </p>
            <div className="hero-mint-box">
              <h3 className="hero-mint-box-title">Mint</h3>
              <p className="hero-mint-box-text">The price is 169 XRD</p>
              <div className="hero-mint-field">
                <div className="hero-mint-total">
                  <span>{minted}</span>/<span>1000</span>
                </div>
                <div className="hero-mint-no-field">
                  <button className="hero-mint-no-less" onClick={decrement}>
                    -
                  </button>
                  <input
                    type="number"
                    name="mint"
                    id="mint"
                    value={count} // Set initial value from state
                    onChange={handleChange}
                    onFocus={handleFocus}
                  />
                  <button className="hero-mint-no-more" onClick={increment}>
                    +
                  </button>
                </div>
                <button
                  style={{ background: "#a3d416", borderColor: "#a3d416" }}
                  className="hero-mint-btn"
                  onClick={() =>
                    buySludge({
                      accountAddress: selectedAccountAddress,
                      amount: count,
                    })
                  }
                >
                  Mint Now
                </button>
              </div>
            </div>
          </div>
          <img
            src={HeroRightDecorator}
            alt=""
            className="w-1/5 hidden md:block lg:w-1/4 max-w-96 h-full"
          />
        </div>
      </div>
    </section>
  );
};
