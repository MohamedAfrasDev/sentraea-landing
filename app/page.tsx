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

export default function Home() {
  return (
    <>
      <SmoothScroll>
        <div className="min-h-full bg-linear-to-b from-white via-[#fafbfe] to-white">
          {/* <Navbar /> */}
          <Header />
          <main className="flex flex-col gap-10">
            <Hero />
            <ProblemAlt />
            {/* <Problem /> */}
            <Solution />
            <HowSentraeaDecides />

            <WhoItsFor />
            <div className="relative">
              <Image
                src={BGOrange}
                alt="works"
                width={1000}
                height={1000}
                className="absolute w-full h-full shadow-xl"
              />
              <div
                className="absolute inset-0 opacity-[0.4] mix-blend-overlay pointer-events-none"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 500 500' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                }}
              />
              <HowEarlyAccessWorks />
              {/* <Waitlist /> */}
            </div>
            <Faq />
          </main>
          <Footer />
        </div>
      </SmoothScroll>
    </>
  );
}
