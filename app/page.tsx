import SmoothScroll from "@/components/SmoothScroll";
import { Navbar } from "./sections/nav/navbar";
import { Hero } from "./sections/hero/hero";
import { Problem } from "./sections/problem/problem";
import { Solution } from "./sections/solution/solution";
import { HowSentraeaDecides } from "./sections/how-sentraea-decides/how-sentraea-decides";
import { WhoItsFor } from "./sections/who-its-for/who-its-for";
import { HowEarlyAccessWorks } from "./sections/how-it-works/how-early-access-works";
import { Waitlist } from "./sections/waitlist/waitlist";
import { Faq } from "./sections/faq/faq";
import { Footer } from "./sections/footer/footer";
import { Header } from "@/components/Header";
import Image from "next/image";
import BGOrange from "@/public/bg-cta-orange.jpg";
import { ProblemAlt } from "./sections/problem/problem-alt";
import { Reveal } from "./sections/shared/reveal";
import { ContinuityMemoryMiniCard } from "./components/mockups/continuity-memory-mini-card";
import IntegrationLayer from "./sections/integration-layer/integration-layer";
import { Hero2 } from "./sections/hero/hero2";
import FeautureSection from "./sections/features/features-section";
import JoinListComponent from "./sections/joinlist-section/join-list-component";
import GrowthConstraint from "./sections/growth/growth-constraint";
import ProblemMain from "./sections/problem/problem-main";

export default function Home() {
  return (
    <>
      <SmoothScroll>
        <div className="min-h-full bg-linear-to-b from-white via-[#fafbfe] to-white">
          <Navbar />
          <Header />
          <main className="flex flex-col gap-10">
            <Hero />

            <ProblemMain />
            <GrowthConstraint />
            <HowSentraeaDecides />

            {/* <ProblemAlt /> */}
            <IntegrationLayer />

            <FeautureSection />

            {/* <Hero2/> */}
            {/* <JoinListComponent /> */}
            {/* <Problem /> */}
            {/* <Solution /> */}
            {/* <WhoItsFor />
            <div className="flex flex-col md:flex-row">
              <div className="flex-1">
                <HowEarlyAccessWorks />
              </div>
              <div className="flex-1">
                <Reveal delay={0.05} className="mt-10">
                  <ContinuityMemoryMiniCard />
                  <p className="mt-3 text-center text-xs text-muted-foreground">
                    Unlike a chat window, Sentraea carries your startup context
                    from week to week.
                  </p>
                </Reveal>
              </div>
            </div> */}
            <Faq />
          </main>
          <Footer />
        </div>
      </SmoothScroll>
    </>
  );
}
