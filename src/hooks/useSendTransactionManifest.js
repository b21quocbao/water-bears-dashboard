import { useCallback } from "react"
import { config } from "../config"
import { TransactionManifests } from "../radix/transaction-manifests"
import { useSendTransaction } from "./useSendTransaction"
import { useWellKnownAddresses } from "./useWellKnownAddresses"

export const useSendTransactionManifest = () => {
  const transactionManifests = TransactionManifests(config.addresses)
  const sendTransaction = useSendTransaction()
  const wellKnownAddresses = useWellKnownAddresses()
  const xrdAddress = wellKnownAddresses?.xrd || ""

  return useCallback(
    () => ({
      buyWaterBear: input =>
        sendTransaction(
          transactionManifests.buyWaterBear({ ...input, xrdAddress }),
          "Welcome to WaterBears! Thank you for purchasing the NFT!"
        ),
      stakeWaterBear: input =>
        sendTransaction(
          transactionManifests.stakeWaterBear(input),
          "Thank you for staking the NFT!"
        ),
      withdrawWaterBear: input =>
        sendTransaction(
          transactionManifests.withdrawWaterBear(input),
          "Unstaking NFT!"
        ),
      withdrawOldWaterBear: input =>
        sendTransaction(
          transactionManifests.withdrawOldWaterBear(input),
          "Unstaking old NFT!"
        ),
      claimRewards: input =>
        sendTransaction(
          transactionManifests.claimRewards(input),
          "Claiming rewards!"
        ),
      claimOldRewards: input =>
        sendTransaction(
          transactionManifests.claimOldRewards(input),
          "Claiming old rewards!"
        ),
      createStakingId: input =>
        sendTransaction(
          transactionManifests.createStakingId(input),
          "Creating staking ID!"
        ),
      buyTestTube: input =>
        sendTransaction(
          transactionManifests.buyTestTube(input),
          "Buying test tube!"
        ),
      buySludge: input =>
        sendTransaction(
          transactionManifests.buySludge({ ...input, xrdAddress }),
          "Thank you for purchasing the Sludge NFT!"
        ),
      breedBaby: input =>
        sendTransaction(
          transactionManifests.breedBaby(input),
          "Thank you for breeding BabyWaterBear!"
        ),
      bid: input =>
        sendTransaction(
          transactionManifests.bid(input),
          "Bidding WaterBearDao!"
        ),
      increaseBid: input =>
        sendTransaction(
          transactionManifests.increaseBid(input),
          "Increasing bid amount for WaterBearDao!"
        ),
      claimRewardNft: input =>
        sendTransaction(
          transactionManifests.claimRewardNft(input),
          "Claiming reward WaterBearDao!"
        ),
      claimFunds: input =>
        sendTransaction(
          transactionManifests.claimFunds(input),
          "Claiming bid funds!"
        ),
    }),
    [sendTransaction, transactionManifests, xrdAddress]
  )
}
