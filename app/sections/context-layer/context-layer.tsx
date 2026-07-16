import { Card } from "@/components/ui/card";
import Image from "next/image";
import React from "react";

const ContextLayer = () => {
  const connectors = [
    {
      title: "HubSpot",
      icon: "https://img.icons8.com/external-tal-revivo-color-tal-revivo/96/external-hubspot-a-developer-and-marketer-of-software-products-logo-color-tal-revivo.png",
    },
    {
      title: "Notion",
      icon: "https://img.icons8.com/color/144/notion--v1.png",
    },
    {
      title: "Intercom",
      icon: "https://img.icons8.com/color/144/intercom.png",
    },
    {
      title: "Slack",
      icon: "https://img.icons8.com/color/144/slack.png",
    },
    {
      title: "GitHub",
      icon: "https://img.icons8.com/fluency/96/github.png",
    },
    {
      title: "Gmail",
      icon: "https://img.icons8.com/fluency/96/gmail-new.png",
    },
    {
      title: "Drive",
      icon: "https://img.icons8.com/fluency/96/google-drive--v1.png",
    },
    {
      title: "Stripe",
      icon: "https://img.icons8.com/external-tal-revivo-shadow-tal-revivo/96/external-stripe-a-suite-of-payment-apis-that-powers-commerce-for-online-businesses-logo-shadow-tal-revivo.png",
    },
  ];

  const weekly = [
    "your metrics",
    "your pipeline",
    "your product and customer signals",
    "your past experiments",
    "what changed this week",
  ];
  return (
    <div className="px-10">
      <div>
        <h2 className=" text-4xl md:text-[3.4rem] font-medium bg-linear-to-r bg-clip-text text-transparent from-foreground via-blue-400  to-blue-400 font-heading tracking-[-2px] md:tracking-[-3px] leading-[45px] md:leading-[80px]">
          The context layer behind your weekly move
        </h2>
        <p className="text-muted-foreground text-xl">
          Sentraea doesn’t guess from a single prompt. It connects your existing
          tools, stores your weekly history, and builds a living model of your
          SaaS.
        </p>
      </div>

      <div className="mt-10 flex gap-10">
        <Card className="w-fit bg-transparent p-0 gap-0 flex-2">
          <div className="justify-start px-5 py-4 flex flex-col items-start bg-linear-to-br from-card via-blue-200/20 to-blue-200/40">
            <h4 className="font- text-2xl font-medium">Integrations</h4>
            <div className="grid grid-cols-2 items-start gap-7 mt-7">
              {connectors.map((connector) => (
                <div
                  key={connector.title}
                  className="flex flex-row justify-start items-center gap-2 group hover:scale-110 transition-all duration-300 cursor-default"
                >
                  <Image
                    src={connector.icon}
                    alt={connector.title}
                    width={1000}
                    height={1000}
                    className="w-10"
                  />
                  <p className="font-medium text-lg">{connector.title}</p>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card className="flex-6 p-0">
          <div className="px-5 py-5 flex flex-col justify-between h-full">
            <h3 className="text-xl font-medium">
              That means your weekly recommendation is based on:
            </h3>

            <div className="grid grid-cols-4 gap-10">
              {weekly.map((w, index) => {
                return (
                  <div
                    key={index}
                    className="justify-center flex flex-col items-center text-center gap-2"
                  >
                    <div className="bg-primary/10 flex items-center justify-center rounded-sm p-2 min-w-7 h-9 w-fit font-number text-primary text-xl">
                      {index + 1}
                    </div>
                    <p className="text-xl capitalize leading-[30px]">{w}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ContextLayer;
