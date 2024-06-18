import { useSendTransactionManifest } from "../hooks/useSendTransactionManifest";

const Card = ({ accountAddress, waterBearStakeId, id, staked, reload, old }) => {
  const { stakeWaterBear, withdrawWaterBear, withdrawOldWaterBear } = useSendTransactionManifest()();

  return (
    <div className="flex flex-col gap-[8px] w-[200px] mx-auto md:mx-0 bg-[#2B2B2B] pb-3 rounded-lg">
      <img
        className="w-full rounded-tr-lg rounded-tl-lg"
        src={`https://water-bears.s3.amazonaws.com/waterbears-%23${parseInt(
          id.substr(11)
        )}.png`}
        alt=""
      />
      <div className="flex flex-col w-[176px] gap-[20px] mx-auto">
        <div className="w-full gap-[12px]">
          <h1 className="text-[22px] w-[141px]">
            Water Bears #{parseInt(id.substr(11))}
          </h1>
          {/* <div className="w-full gap-[8px]">
            <div className="flex flex-row justify-between">
              <p className="text-[16px]">Staked On</p>
              <p className="text-[16px]">----</p>
            </div>
            <div className="flex flex-row justify-between">
              <p className="text-[16px]">Unlocks On</p>
              <p className="text-[16px]">----</p>
            </div>
          </div> */}
        </div>
        <button
          className="w-full h-[34px] rounded-lg flex justify-center items-center bg-[#42bfe8]"
          onClick={() => {
            if (old) {
              withdrawOldWaterBear({
                accountAddress,
                id,
                waterBearStakeId,
              }).then(reload);
            } else if (staked) {
              withdrawWaterBear({
                accountAddress,
                id: [id],
                waterBearStakeId,
              }).then(reload);
            } else {
              stakeWaterBear({
                accountAddress,
                id: [id],
                waterBearStakeId,
              }).then(reload);
            }
          }}
        >
          {staked ? "Unstake" : "Stake"}
        </button>
      </div>
    </div>
  );
};

export default Card;
