import React from "react";
import PlausibleLogo from "@/public/connectors/plausible_logo.svg";
import HubSpotLogo from "@/public/connectors/hubspot.svg";
import StripeLogo from "@/public/connectors/stripe-ar21.svg";
import Intercom from "@/public/connectors/Intercom_idJ9ed9vTR_0.svg";
import GoogleAds from "@/public/connectors/google-ads-svgrepo-com.svg";
import Image from "next/image";

const connectors = [
  { title: "Plausible", logo: PlausibleLogo },
  { title: "HubSpot", logo: HubSpotLogo },
  { title: "Stripe", logo: StripeLogo },
  { title: "Intercom", logo: Intercom },
  { title: "Google Ads", logo: GoogleAds },
];

/** Render one pass of the connector list */
const ConnectorList = ({ ariaHidden }: { ariaHidden?: boolean }) => (
  <ul
    aria-hidden={ariaHidden}
    className="flex shrink-0 items-center gap-12 px-6"
  >
    {connectors.map((c) => (
      <li key={c.title} className="flex items-center gap-2">
        <Image
          src={c.logo}
          alt={c.title}
          width={120}
          height={40}
          className="h-10 w-auto object-contain opacity-70  transition-all duration-300 hover:opacity-100 hover:grayscale-0"
        />
      </li>
    ))}
  </ul>
);

const IntegrationLayer = () => {
  return (
    <section className="overflow-hidden py-10 text-center">
      <h4 className="font-number mb-8 uppercase tracking-widest text-sm text-muted-foreground">
        Integrations
      </h4>

      {/* Marquee track — mask fades left & right edges */}
      <div
        className="relative flex"
        style={{
          /* gradient mask for fade-out on both edges */
          maskImage:
            "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
        }}
      >
        {/* 4 copies: animate -25% (= 1 copy width). The reset happens off-screen. */}
        <div
          className="flex min-w-max"
          style={{
            animation: "marquee-scroll 28s linear infinite",
            willChange: "transform",
          }}
        >
          <ConnectorList />
          <ConnectorList ariaHidden />
          <ConnectorList ariaHidden />
          <ConnectorList ariaHidden />
        </div>
      </div>

      <style>{`
        @keyframes marquee-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-25%); }
        }
      `}</style>
    </section>
  );
};

export default IntegrationLayer;
