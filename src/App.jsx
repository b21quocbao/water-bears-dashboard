import {
  DataRequestBuilder,
  RadixDappToolkit,
  createLogger,
} from "@radixdlt/radix-dapp-toolkit";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { config } from "./config.js";
import "./index.css";
import Breed from "./pages/Breed";
import Home from "./pages/Home";
import Mint from "./pages/Mint";
import NoMatch from "./pages/NoMatch";
import Stake from "./pages/Stake";
import { RadixProvider } from "./radix/RadixProvider";
import RarityPage from "./pages/RarityPage";
import MintSludge from "./pages/MintSludge.jsx";
import Nursery from "./pages/nursery.jsx";

function App() {
  const [state, setState] = useState();

  // Initialize Radix Dapp Toolkit in the client
  useEffect(() => {
    const radixDappToolkit = RadixDappToolkit({
      networkId: config.network.networkId,
      dAppDefinitionAddress: config.dAppDefinitionAddress,
      logger: createLogger(2),
    });

    radixDappToolkit.walletApi.setRequestData(
      DataRequestBuilder.accounts().atLeast(1)
    );

    setState(radixDappToolkit);

    return () => {
      radixDappToolkit.destroy();
    };
  }, []);

  if (!state) return null;

  return (
    <>
      <RadixProvider value={state}>
        <div
          style={{ background: "#a3d416" }}
          className="w-full text-center text-black bg-green p-4"
        >
          <span className="text-xl">☣️ ALERT ☣️</span> <br></br> Something
          strange happened in the labo, around 10pm a thud and a flash of
          lightning made the walls vibrate ! The chemist in charge of WaterBears
          research was found lifeless. It seems that a never-before-seen viscous
          material is responsible for this, but what could it be?
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mint" element={<Mint />} />
          <Route path="/mintSludge" element={<MintSludge />} />
          <Route path="*" element={<NoMatch />} />
          <Route path="/breed" element={<Breed />} />
          <Route path="/rarity" element={<RarityPage />} />
          <Route path="/nursery" element={<Nursery />} />
          <Route path="/stake" element={<Stake />} />
        </Routes>
      </RadixProvider>
    </>
  );
}

export default App;
