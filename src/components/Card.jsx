import { useSendTransactionManifest } from "../hooks/useSendTransactionManifest";

const Card = ({ accountAddress, waterBearStakeId, id, staked }) => {
  const { stakeWaterBear, withdrawWaterBear } = useSendTransactionManifest()();

  return (
    <div className="flex flex-col gap-[8px] w-[200px] mx-auto md:mx-0 bg-[#2B2B2B] pb-3 rounded-lg">
      <img className="w-full rounded-tr-lg rounded-tl-lg" src={`https://water-bears.s3.amazonaws.com/waterbears-%23${parseInt(id.substr(11))}.png`} alt="" />
      <div className="flex flex-col w-[176px] gap-[20px] mx-auto">
        <div className="w-full gap-[12px]">
          <h1 className="text-[22px] w-[141px]">Water Bears #{parseInt(id.substr(11))}</h1>
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
            if (staked) {
              withdrawWaterBear({
                accountAddress,
                id,
                waterBearStakeId,
              });
            } else {
              stakeWaterBear({
                accountAddress,
                id,
                waterBearStakeId,
              });
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
