import About from "../components/About";
import BearsSlider from "../components/BearsSlider";
import ComingSoon from "../components/ComingSoon";
import Contact from "../components/Contact";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Hero from "../components/Hero";
import ComingSoonRightDecorator from "../assets/images/coming-soon-right-decorator.png";
import ComingSoonLeftDecorator from "../assets/images/coming-soon-left-decorator.png";

const Home = () => {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <section className="coming-soon">
          <div className="container">
            <div className="coming-soon-content">
              <div className="coming-soon-wrapper">
                <h1 className="coming-soon-title text-center">WaterBears</h1>

                <p> </p>
                <p className="coming-soon-text">
                  A laboratory research team has been tasked with studying and
                  experimenting on a droel of bugs called WaterBears. After
                  several unsuccessful attempts, the chemists succeeded in
                  creating and maintaining a colony of 3333 WaterBears.
                </p>
                <p className="text-center p-12">
                  {" "}
                  Our researchers write a report on each discovery, which you
                  can find here.{" "}
                </p>
                <div className="w-full flex items-center jsutify-center">
                  <a
                    className="p-4 bg-[#43bfe8] rounded mx-auto"
                    href="/research"
                  >
                    More details
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
        <BearsSlider />
        <FAQ />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
};

export default Home;
