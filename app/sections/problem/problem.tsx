import { CircleHelp, Layers, ListPlus, Target } from "lucide-react";
import { Container, Section, SectionHeading } from "../shared/section";
import { Reveal } from "../shared/reveal";
import { Card } from "@/components/ui/card";

const PAIN_POINTS = [
  {
    icon: CircleHelp,
    title: "No clear diagnosis",
    body: "Unsure whether demand, conversion or churn is the problem.",
  },
  {
    icon: ListPlus,
    title: "Addition by default",
    body: "Adding more work instead of removing low-leverage work.",
  },
  {
    icon: Layers,
    title: "Signal buried in tools",
    body: "Too many connected tools. Too little clarity.",
  },
  {
    icon: Target,
    title: "No honest priority",
    body: "Want one honest weekly recommendation.",
  },
] as const;

export function Problem() {
  return (
    <Section id="problem" className="relative">
      <div className="absolute inset-0 z-0 bg-[radial-gradient(#cacccf_1px,transparent_1px)] bg-size-[20px_20px] dark:bg-[radial-gradient(#4f5052_1px,transparent_1px)] opacity-70 mask-[radial-gradient(ellipse_80%_60%_at_50%_40%,#000_60%,transparent_100%)]" />
      <Container className="relative z-1">
        <div className="flex flex-col md:flex-row gap-10">
          <div className="flex-3">
            <div>
              <p className="uppercase font-number text-primary">The Problem</p>

              <h2 className=" text-4xl md:text-[3.5rem] font-medium bg-linear-to-r bg-clip-text text-transparent from-foreground/80 via-blue-900/80  to-blue-600 font-heading tracking-[-2px] md:tracking-[-3px]">
                Every week feels busy.
                <br />
                Not every week moves the needle.
              </h2>
            </div>
            <Reveal delay={0.1} className="mx-auto mt-5 text-start">
              <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
                You ship features, write content, chase leads, fix bugs, and
                tweak pricing. But at the end of the week, it&apos;s hard to
                answer one question:
              </p>
              <p className="mt-6 bg-clip-text text-transparent bg-linear-to-r from-black via-black/70 to-black font-heading text-xl font-medium tracking-tight md:text-3xl">
                <span className="text-primary text-5xl">&ldquo;</span>Did we
                work on the thing that actually mattered most?
                <span className="text-primary text-5xl">&rdquo;</span>
              </p>
              <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-xl">
                Dashboards show you everything. Task tools help you do anything.
                None of them tell you:{" "}
                <span className="font-medium text-foreground">
                  &ldquo;This is the one move to prioritize this week.&rdquo;
                </span>
              </p>
            </Reveal>
          </div>

          <div className="mt-2 flex-2 grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
            {PAIN_POINTS.map(({ icon: Icon, title, body }, i) => (
              <Reveal key={title} delay={0.08 * i}>
                <Card className="group h-full bg-card/50 backdrop-blur-sm gap-2 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-[0_20px_48px_-20px_rgba(30,58,138,0.22)]">
                  <div className="inline-flex size-10 items-center justify-center rounded-sm bg-primary/6 text-primary transition-colors duration-300 group-hover:bg-primary/10">
                    <Icon className="size-5" aria-hidden />
                  </div>
                  <h3 className="mt-4 font-heading text-xl font-medium tracking-tight text-foreground">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {body}
                  </p>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
