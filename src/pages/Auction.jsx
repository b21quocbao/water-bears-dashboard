import { HiArrowLeft, HiArrowRight } from "react-icons/hi";
import About from "../components/About";
import BearsSlider from "../components/BearsSlider";
import ComingSoon from "../components/ComingSoon";
import Contact from "../components/Contact";
import XRD from "../assets/images/xrd.jpg";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";
import { FaShare } from "react-icons/fa";
import Header from "../components/Header";
import { IoIosHelpCircle } from "react-icons/io";
import { CiMenuBurger } from "react-icons/ci";

import { useEffect, useRef, useState } from "react";
const Auction = () => {
  const [height, setHeight] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeight(ref.current?.clientHeight);
    }, 20);

    return () => clearInterval(interval);
  }, [ref]);

  const bids = [
    {
      name: "toto.xrd",
      value: 1.74,
    },
    {
      name: "loudriou.xrd",
      value: 1.65,
    },
    {
      name: "account_4343...",
      value: 1.43,
    },
  ];

  return (
    <>
      <Header />
      <main>
        <section className="hero py-4">
          <div className="mx-auto max-w-5xl p-4 mb-44">
            <div className="flex-row md:flex items-center gap-8">
              <div className="relative mx-auto w-3/4 md:w-1/2">
                <img
                  ref={ref}
                  src="/images/waterbears4.png"
                  style={{ maxWidth: "95%", zIndex: 2 }}
                  className="relative mx-auto"
                />
                <div
                  style={{
                    width: "100%",
                    top: "15%",
                    zIndex: 1,
                    height: `${height + 20}px`,
                    background: "transparent",
                    border: "1px #a3d416 solid",
                  }}
                  className="absolute rounded-xl"
                ></div>
              </div>
              <div>
                <div className="flex gap-2 justify-center mt-2 md:mt-0 md:justify-start items-center">
                  <p
                    style={{
                      width: "120px",
                      height: "30px",
                      color: "white",
                      margin: "inherit",
                    }}
                    className="hero-mint-btn-dao"
                  >
                    July 10-2024
                  </p>
                  <button
                    style={{
                      color: "white",
                      margin: "inherit",
                      background: "transparent",
                      borderRadius: "9999px",
                      width: "40px",
                    }}
                    className="hero-mint-btn-dao"
                  >
                    <HiArrowLeft />
                  </button>
                  <button
                    style={{
                      color: "white",
                      margin: "inherit",
                      borderRadius: "9999px",
                      width: "40px",
                    }}
                    className="hero-mint-btn-dao"
                  >
                    <HiArrowRight />
                  </button>
                </div>
                <p className="text-7xl mt-6 md:mt-2">WaterBears 1175</p>
                <div className="flex mt-3">
                  <div className="flex flex-col items-start border-r-2 pr-6">
                    <p className="sludge text-2xl">WaterBears 1175</p>
                    <div className="flex text-5xl items-center gap-1">
                      <img width={30} height={30} src={XRD} />
                      1.73
                    </div>
                  </div>
                  <div className="flex flex-col items-start pl-6">
                    <p className="sludge text-2xl">Auction end in</p>
                    <div className="flex text-5xl items-center gap-1">
                      5h 35min 8sec
                    </div>
                  </div>
                </div>
                <p className="sludge flex my-4 items-center gap-1">
                  <IoIosHelpCircle /> help mint the next noun
                </p>
                <div
                  className="p-1 flex bg-[#4b4949] mb-2 rounded-xl"
                  style={{ border: "1px gray solid" }}
                >
                  <input
                    type="number"
                    className="bg-transparent text-xl rounded-xl px-4 w-1/2"
                    placeholder={"1.75 or more"}
                  />
                  <button
                    style={{
                      color: "white",
                      height: "50px",
                      margin: 0,
                    }}
                    className="hero-mint-btn-dao"
                  >
                    Place Bid
                  </button>
                </div>
                {bids.map((bid) => {
                  return (
                    <div className="flex p-3 bg-[#2f2f2f] items-center mb-2 justify-between rounded-xl w-full">
                      <p>{bid.name}</p>
                      <div className="flex gap-3 items-center">
                        <CiMenuBurger />
                        {bid.value}
                        <button>
                          <FaShare />
                        </button>
                      </div>
                    </div>
                  );
                })}
                <div className="flex justify-center mt-4">
                  <a
                    className="sludge underline text-center w-full mx-auto"
                    href="#"
                  >
                    View all bids
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Auction;
