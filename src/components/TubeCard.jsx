import { extractNumber } from "../helpers/rarity";
import { useSendTransactionManifest } from "../hooks/useSendTransactionManifest";

const TubeCard = ({ id, accountAddress, reload }) => {
  const { breedBaby } = useSendTransactionManifest()();

  return (
    <div className="flex flex-col gap-[8px] w-[200px] mx-auto md:mx-0 bg-[#2B2B2B] pb-3 rounded-lg">
      <img
        className="w-full rounded-tr-lg rounded-tl-lg"
        src={`/images/tube.png`}
        alt=""
      />
      <div className="flex flex-col w-[176px] gap-[20px] mx-auto">
        <div className="w-full gap-[12px]">
          <h1 className="text-[22px]">Tube #{extractNumber(id)}</h1>
        </div>

        <button
          className="w-full h-[34px] rounded-lg flex justify-center items-center bg-[#42bfe8]"
          onClick={() => {
            breedBaby({ id, accountAddress }).then(() => {
              reload();
            });
          }}
        >
          Open
        </button>
      </div>
    </div>
  );
};

export default TubeCard;
