import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import FAQRightDecorator from "../assets/images/faq-right-decorator.png";
import FAQLeftDecorator from "../assets/images/faq-left-decorator.png";
import FAQSeperator from "../assets/images/faq-seperator.png";
import ArrowRight from "../assets/svg/arrow-right.svg?react";

export default function FAQ() {
  return (
    <section className="faq">
      <div className="container">
        <h2 className="faq-title">
          Frequently Asked <br /> Questions
        </h2>
        <div className="faq-wrapper">
          <img src={FAQLeftDecorator} alt="" className="faq-left-decorator" />
          <div className="faq-accordion">
            <Accordion className="accordion" allowMultipleExpanded={true}>
              <AccordionItem>
                <AccordionItemHeading>
                  <AccordionItemButton className="accordion-btn">
                    What steps do I take to start earing $DNA?
                    <ArrowRight />
                  </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel className="accordion-panel">
                  <p>
                    WaterBear holders can start earning $DNA right now, click
                    the stake tab to begin.
                  </p>
                </AccordionItemPanel>
              </AccordionItem>
              <AccordionItem>
                <AccordionItemHeading>
                  <AccordionItemButton className="accordion-btn">
                    Can tardigrades survive in outer space?
                    <ArrowRight />
                  </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel className="accordion-panel">
                  <p>yes</p>
                </AccordionItemPanel>
              </AccordionItem>
              <AccordionItem>
                <AccordionItemHeading>
                  <AccordionItemButton className="accordion-btn">
                    What is an Test tube? How does it work?
                    <ArrowRight />
                  </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel className="accordion-panel">
                  <p>
                    An test tube is an NFT that represents a Baby WaterBear.
                    Test tubes can be left unopened (unrevealed Baby) and traded
                    like any other WaterBear. In order to reveal your Baby, you
                    can go to the Breed section and open your test tube.
                  </p>
                </AccordionItemPanel>
              </AccordionItem>
              <AccordionItem>
                <AccordionItemHeading>
                  <AccordionItemButton className="accordion-btn">
                    How do I get a WaterBear?
                    <ArrowRight />
                  </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel className="accordion-panel">
                  <p>
                    Mint is sold out ! But you can always buy Waterbears on the
                    &nbsp;
                    <a
                      className="underline"
                      href="https://swap.trove.tools/all-swaps/"
                    >
                      secondary market
                    </a>
                  </p>
                </AccordionItemPanel>
              </AccordionItem>
              <AccordionItem>
                <AccordionItemHeading>
                  <AccordionItemButton className="accordion-btn">
                    What are the contract addresses?
                    <ArrowRight />
                  </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel className="accordion-panel">
                  <p>
                    WaterBears NFT:{" "}
                    <a
                      className="underline"
                      href="https://dashboard.radixdlt.com/resource/resource_rdx1nguyesjve2e0wql8d9cepx7u63jtevdg05a7n5fc5m767mn4vkxpeq/summary"
                    >
                      Contract
                    </a>
                  </p>
                  <p>
                    $DNA token:{" "}
                    <a
                      className="underline"
                      href="https://ociswap.com/resource_rdx1th9txt2hxdlc740ypf9uj8ghgwwmhf7wdnxafhxa3uxmmus56nusxs"
                    >
                      Ociswap
                    </a>
                  </p>
                </AccordionItemPanel>
              </AccordionItem>
            </Accordion>
          </div>
          <img src={FAQRightDecorator} alt="" className="faq-right-decorator" />
        </div>
      </div>
      <div className="faq-sperator">
        <img src={FAQSeperator} alt="" className="faq-seprator-image" />
      </div>
    </section>
  );
}
