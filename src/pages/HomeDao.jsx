import About from "../components/About";
import BearsSlider from "../components/BearsSlider";
import ComingSoon from "../components/ComingSoon";
import Contact from "../components/Contact";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Hero from "../components/Hero";
import WaterBearsLogo from "../assets/images/water-bears.png";

const HomeDao = () => {
  const links = [
    {
      link: "/treasury",
      label: "WaterBears DAO",
    },
    {
      link: "/burn",
      label: "Burn",
    },
    {
      link: "/stake",
      label: "WaterBears Staking",
    },
  ];

  return (
    <>
      <Header />
      <main>
        <section className="hero py-4">
          <div className="container">
            <img
              className="mx-auto pl-12"
              src={WaterBearsLogo}
              alt="Water Bears"
              width="300px"
            />
            <h2
              style={{ color: "#a3d416" }}
              className="text-5xl text-center mt-2 mx-auto"
            >
              WaterBears Don't Cares
            </h2>
            <div className="flex mt-12 max-w-4xl mx-auto mb-44 items-center justify-between gap-12">
              {links.map((link) => {
                return (
                  <a
                    key={link.link}
                    href={link.link}
                    className="hero-mint-btn-dao"
                  >
                    {link.label}
                  </a>
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

export default HomeDao;
