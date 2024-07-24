import About from "../components/About";
import BearsSlider from "../components/BearsSlider";
import ComingSoon from "../components/ComingSoon";
import Contact from "../components/Contact";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Sludge from "../assets/images/sludge.jpg";
import Baby from "../assets/images/Baby2.png";
import Hero from "../components/Hero";
import WB from "../assets/images/waterbear-_106.png";
import COIN from "../assets/images/coin.png";

const Burn = () => {
  const actions = [
    {
      onClick: () => console.log("burn sludge"),
      image: Sludge,
      supply: 0,
      total: 1000,
    },
    {
      onClick: () => console.log("burn baby"),
      image: Baby,
      supply: 0,
      total: 6666,
    },
    {
      onClick: () => console.log("burn WB"),
      image: WB,
      supply: 0,
      total: 3333,
    },
    {
      onClick: () => console.log("burn DNA"),
      image: COIN,
      supply: 0,
      total: 3333,
    },
  ];

  return (
    <>
      <Header />
      <main>
        <section className="hero py-4">
          <h2
            style={{ color: "#a3d416" }}
            className="text-7xl  text-center mt-2 mx-auto"
          >
            WaterBears are Adapting
          </h2>
          <p className="text-center tracking-widest mx-auto text-3xl">
            Burn your OLD Waterbears for a new DAO one of one NFT
          </p>
          <div className="container">
            <div className="flex flex-wrap md:flex-nowrap mt-12 max-w-4xl mx-auto mb-12 items-center justify-between md:gap-4">
              {actions.map((action) => {
                return (
                  <div className="w-1/2 md:w-full flex  flex-col">
                    <img src={action.image} alt="action" />
                    <button
                      style={{
                        width: "100%",
                        marginTop: "8px",
                        borderRadius: "15px",
                      }}
                      className="hero-mint-btn-dao rounded-4xl w-full"
                      onClick={action.onClick}
                    >
                      Burn
                    </button>
                    <p className="text-center mt-1">
                      {action.supply} / {action.total}
                    </p>
                  </div>
                );
              })}
            </div>
            <div className="text-2xl mb-32">
              <p className="text-center sludge mt-1">
                20 WaterBears = 1 DAO NFT
              </p>
              <p className="text-center sludge mt-1">40 Babys = 1 DAO NFT</p>
              <p className="text-center sludge mt-1">3 sludge = 1 DAO NFT</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Burn;
