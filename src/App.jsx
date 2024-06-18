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
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mint" element={<Mint />} />
          <Route path="*" element={<NoMatch />} />
          <Route path="/breed" element={<Breed />} />
          <Route path="/rarity" element={<RarityPage />} />
          <Route path="/stake" element={<Stake />} />
        </Routes>
      </RadixProvider>
    </>
  );
}

export default App;
