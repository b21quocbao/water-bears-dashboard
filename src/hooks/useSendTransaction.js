import { useCallback } from "react";
import { useDappToolkit } from "./useDappToolkit";

export const useSendTransaction = () => {
  const { radixDappToolkit } = useDappToolkit();

  const sendTransaction = (transactionManifest, message) =>
    radixDappToolkit.walletApi.sendTransaction({
      transactionManifest,
      version: 1,
      message,
    });

  return useCallback(sendTransaction, [radixDappToolkit]);
};
