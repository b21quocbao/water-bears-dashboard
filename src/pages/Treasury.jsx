import About from "../components/About";
import BearsSlider from "../components/BearsSlider";
import ComingSoon from "../components/ComingSoon";
import Contact from "../components/Contact";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";
import Header from "../components/Header";
import XRD from "../assets/images/xrd.jpg";
import Baby from "../assets/images/Baby2.png";
import Hero from "../components/Hero";
import SCO from "../assets/images/sco.png";
import SCO2 from "../assets/images/sco2.png";
import SCO3 from "../assets/images/sco3.png";
import COIN from "../assets/images/coin.png";
import { HiOutlineExternalLink } from "react-icons/hi";
const Treasury = () => {
  const actions = [
    {
      image: XRD,
      title: "XRD",
      count: 996.5,
      value: "$3,222,222.00",
    },
    {
      image: SCO,
      title: "Scorpion #501",
      value: "$3,222,222.00",
    },
    {
      image: SCO2,
      title: "Scorpion #321",
      value: "$3,222,222.00",
    },
    {
      image: SCO3,
      title: "Scorpion #745",
      value: "$3,222,222.00",
    },
  ];

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
            <div className="px-4 text-md flex mt-2 items-center bg-white rounded-xl p-2 text-[#bbb7b7]">
              Account_xncce43434jjndjf...
              <HiOutlineExternalLink className="text-[#7d7d7d] w-6 h-6" />
            </div>
          </div>

          <div className="container">
            <div className="flex flex-wrap md:flex-nowrap mb-44 mt-12 max-w-4xl mx-auto items-center justify-between md:gap-4">
              {actions.map((action) => {
                return (
                  <div className="w-1/2 md:w-full flex bg-[#0f0f0f] overflow-hidden rounded-xl flex-col">
                    <img src={action.image} alt="action" />
                    <div className="p-4">
                      <p className="text-2xl sludge">{action.title}</p>
                      {action.count ? (
                        <div className="flex text-3xl items-center gap-1">
                          <img width={20} height={20} src={XRD} />
                          {action.count}
                        </div>
                      ) : (
                        <p className="text-sm mt-1 mb-1 text-[#848484]">
                          Estimated Value
                        </p>
                      )}
                      <p className="text-2xl">{action.value}</p>
                    </div>
                  </div>
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
