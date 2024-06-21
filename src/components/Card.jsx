import { extractNumber } from "../helpers/rarity";
import { useSendTransactionManifest } from "../hooks/useSendTransactionManifest";

const Card = ({
  accountAddress,
  waterBearStakeId,
  id,
  staked,
  reload,
  showRarity,
  rarity,
  hideStake,
  rank,
  old,
}) => {
  const { stakeWaterBear, withdrawWaterBear, withdrawOldWaterBear } =
    useSendTransactionManifest()();

  return (
    <div className="flex flex-col gap-[8px] w-[200px] mx-auto md:mx-0 bg-[#2B2B2B] pb-3 rounded-lg">
      <img
        className="w-full rounded-tr-lg rounded-tl-lg"
        src={`/images/waterbears-#${extractNumber(id)}.png`}
        alt=""
      />
      <div className="flex flex-col w-[176px] gap-[20px] mx-auto">
        <div className="w-full gap-[12px]">
          <h1 className="text-[22px]">Water Bears #{extractNumber(id)}</h1>
          {showRarity && (
            <ul className="bg-gray-700 p-2 rounded mt-2 divide divide-y">
              {Object.keys(rarity).map((key) => {
                const value = rarity[key];
                const atts = key.split("-");
                return (
                  <li
                    key={key}
                    className="flex items-center py-1 w-full justify-between"
                  >
                    <div className="flex gap-0 flex-col">
                      <span
                        className="text-gray-500"
                        style={{ lineHeight: "10px" }}
                      >
                        {atts[0]}
                      </span>
                      <span>{atts[1]}</span>
                    </div>
                    {Number(value).toFixed(2)}%
                  </li>
                );
              })}
              <li className="pt-4 flex w-full items-center justify-between">
                {" "}
                <span>Rank</span> <span>{rank}/3333</span>
              </li>
            </ul>
          )}
        </div>
        {!hideStake && (
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
        )}
      </div>
    </div>
  );
};

export default Card;
