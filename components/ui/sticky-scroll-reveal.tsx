"use client";
import React, { useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const StickyScroll = ({
  content,
  contentClassName,
  title,
}: {
  content: {
    title: string;
    description: string;
    content?: React.ReactNode | any;
  }[];
  contentClassName?: string;
  title?: React.ReactNode;
}) => {
  const [activeCard, setActiveCard] = React.useState(0);
  const ref = useRef<any>(null);
  const { scrollYProgress } = useScroll({
    // uncomment line 22 and comment line 23 if you DONT want the scrollbar to be visible
    // container: ref,
    target: ref,
    offset: ["start start", "end end"],
  });
  const cardLength = content.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const cardsBreakpoints = content.map((_, index) => index / cardLength);
    const closestBreakpointIndex = cardsBreakpoints.reduce(
      (acc, breakpoint, index) => {
        const distance = Math.abs(latest - breakpoint);
        if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
          return index;
        }
        return acc;
      },
      0,
    );
    setActiveCard(closestBreakpointIndex);
  });

  const backgroundColors = [
    "var(--slate-900)",
    "var(--black)",
    "var(--neutral-900)",
  ];
  const linearGradients = [
    "linear-gradient(to bottom right, var(--cyan-500), var(--emerald-500))",
    "linear-gradient(to bottom right, var(--pink-500), var(--indigo-500))",
    "linear-gradient(to bottom right, var(--orange-500), var(--yellow-500))",
  ];

  const [backgroundGradient, setBackgroundGradient] = useState(
    linearGradients[0],
  );

  useEffect(() => {
    setBackgroundGradient(linearGradients[activeCard % linearGradients.length]);
  }, [activeCard]);

  return (
    <div
      ref={ref}
      className="flex gap-10 justify-center relative space-x-10 w-full"
    >
      <div
        className={cn(
          "hidden md:flex h-[60vh] w-1/2 rounded-xl sticky top-[20vh] overflow-hidden items-center justify-center",
          contentClassName,
        )}
      >
        {content.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{
              opacity: activeCard === index ? 1 : 0,
              scale: activeCard === index ? 1 : 0.95,
              zIndex: activeCard === index ? 10 : 0,
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="absolute inset-0 flex items-center justify-center w-full h-full"
          >
            {item.content}
          </motion.div>
        ))}
      </div>
      <div className="relative flex items-start px-4 w-full md:w-1/2">
        <div className="max-w-2xl w-full">
          <div className="py-[10vh] md:py-[20vh]">
            {content.map((item, index) => (
              <div key={item.title + index} className={cn("my-32")}>
                <motion.h2
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: activeCard === index ? 1 : 0.3,
                  }}
                  transition={{ duration: 0.5 }}
                  className={cn(
                    activeCard === index ? "text-primary" : "text-foreground",
                    activeCard === index &&
                      "scale-112 transition-all duration-300 ease-in-out",
                    "text-5xl transition-all font-heading duration-300 font-semibold tracking-tight",
                  )}
                >
                  {item.title}
                </motion.h2>
                {item.description && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: activeCard === index ? 1 : 0.3,
                    }}
                    transition={{ duration: 0.5 }}
                    className={cn(
                      "text-lg text-foreground mt-4 transition-all duration-300 tracking-tight",
                      activeCard === index && "scale-112  ease-in-out",
                    )}
                  >
                    {item.description}
                  </motion.p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
