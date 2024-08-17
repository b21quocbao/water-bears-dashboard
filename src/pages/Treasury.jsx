import {
  GatewayApiClient,
  RadixNetwork,
} from "@radixdlt/babylon-gateway-api-sdk";
import { Fragment, useCallback, useEffect, useState } from "react";
import { HiOutlineExternalLink } from "react-icons/hi";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { config } from "../config";

const Treasury = () => {
  const [apiRes, setApiRes] = useState(null);
  const [metadatas, setMetadatas] = useState(null);

  const getOwnedNfts = useCallback(async () => {
    const gatewayApi = GatewayApiClient.initialize({
      networkId: RadixNetwork.Mainnet,
      applicationName: "WaterBears",
    });
    const { state } = gatewayApi;
    const res = await state.getEntityDetailsVaultAggregated(
      "account_rdx12xxj3j5lx4ls2303pwfs7rtfqnyw77uwc9fluz7d3er6x4vp3n2utz"
    );
    setApiRes(res);
  }, []);

  useEffect(() => {
    getOwnedNfts();
  }, [getOwnedNfts]);

  const getAddressMetadata = useCallback(async () => {
    if (!apiRes) return;
    const addresses = apiRes.fungible_resources.items
      .map((x) => x.resource_address)
      .concat(
        apiRes.non_fungible_resources.items.map((x) => x.resource_address)
      );
    const gatewayApi = GatewayApiClient.initialize({
      networkId: RadixNetwork.Mainnet,
      applicationName: "WaterBears",
    });
    const { state } = gatewayApi;
    const res = await state.getEntityDetailsVaultAggregated(addresses);
    const resAddresses = res.map((x) => x.address);
    const items = res.map((x) => x.metadata.items);

    const names = items
      .map((m) => m.find((x) => x.key == "name"))
      .map((x) => x && x.value.programmatic_json.fields[0].value);
    const images = items
      .map((m) => m.find((x) => x.key == "icon_url"))
      .map((x) => x && x.value.programmatic_json.fields[0].value);

    const metadatas = {};
    for (let idx in resAddresses) {
      metadatas[resAddresses[idx]] = {
        name: names[idx],
        image: images[idx],
      };
    }
    setMetadatas(metadatas);
  }, [apiRes]);

  useEffect(() => {
    getAddressMetadata();
  }, [getAddressMetadata]);

  return (
    <>
      <Header />
      <main>
        <section className="hero py-4">
          <h2
            style={{ color: "#a3d416" }}
            className="text-7xl text-center mt-2 mx-auto"
          >
            WaterBears Treasury
          </h2>
          <div className="flex items-center justify-center">
            <a
              className="px-4 text-md flex mt-2 items-center bg-white rounded-xl p-2 text-[#bbb7b7]"
              href="https://dashboard.radixdlt.com/account/account_rdx12xxj3j5lx4ls2303pwfs7rtfqnyw77uwc9fluz7d3er6x4vp3n2utz/tokens"
              target="_blank"
            >
              account_rdx12xxj3j5l...
              <HiOutlineExternalLink className="text-[#7d7d7d] w-6 h-6" />
            </a>
          </div>
          <div className="container">
            <div className="flex flex-wrap mb-44 mt-12 max-w-4xl mx-auto items-center md:gap-4">
              {!!apiRes &&
                apiRes.fungible_resources.items.map((item) => {
                  return (
                    <div
                      className="w-[200px] flex bg-[#0f0f0f] overflow-hidden rounded-xl flex-col"
                      key={item.resource_address}
                    >
                      <img
                        src={
                          metadatas && metadatas[item.resource_address].image
                        }
                        alt="action"
                      />
                      <div className="p-4">
                        <p className="text-2xl sludge">
                          {metadatas && metadatas[item.resource_address].name}
                        </p>
                        <div className="flex text-3xl items-center gap-1">
                          <img
                            width={20}
                            height={20}
                            src={
                              metadatas &&
                              metadatas[item.resource_address].image
                            }
                          />
                          {item.vaults.items.reduce((acc, val) => {
                            return acc + Number(val.amount);
                          }, 0)}
                        </div>
                      </div>
                    </div>
                  );
                })}
              {!!apiRes &&
                metadatas &&
                apiRes.non_fungible_resources.items
                  .filter(
                    item =>
                    item.resource_address != config.addresses.waterBearResource
                  )
                  .map((item) => {
                    return (
                      <Fragment key={item.resource_address}>
                        {item.vaults.items.map((vault) => (
                          <Fragment key={vault}>
                            {vault.items.map((nftItem) => (
                              <div
                                className="w-[200px] flex bg-[#0f0f0f] overflow-hidden rounded-xl flex-col"
                                key={
                                  metadatas[item.resource_address].name +
                                  nftItem
                                }
                              >
                                <img
                                  src={metadatas[item.resource_address].image}
                                  alt="action"
                                />
                                <div className="p-4">
                                  <p className="text-2xl sludge">
                                    {metadatas[item.resource_address].name +
                                      " " +
                                      nftItem}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </Fragment>
                        ))}
                      </Fragment>
                    );
                  })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Treasury;
