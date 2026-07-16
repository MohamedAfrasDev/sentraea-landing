import Image from "next/image";
import Link from "next/link";
import HorizontalLogo from "@/public/logos/SENTRAEA-FULL-LOGO.svg";
import { Container } from "../shared/section";

import BGOrange from "@/public/bg-cta-orange.jpg";
import { IconBrandYoutube } from "@tabler/icons-react";

function XIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.119 20.452H3.555V9h3.564zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="relative min-w-full">
      <Image
        src={BGOrange}
        alt="work"
        width={1000}
        height={1000}
        className="absolute z-0 w-full max-h-[calc(40vh)]"
      />
      <Container className="relative w-full items-center justify-center py-10">
        <div className="flex flex-col relative z-1  items-center justify-between gap-6 md:flex-row">
          <div>
            <Image
              src={HorizontalLogo}
              alt="Sentraea"
              className="h-20 w-auto"
            />
            <div className="flex gap-5 justify-start mt-5">
              <a href="https://x.com/sentraea" target="_blank">
                <Image
                  src={"https://img.icons8.com/ios-glyphs/120/twitterx--v2.png"}
                  alt="X"
                  width={25}
                  height={25}
                />
              </a>
              <a href="https://instagram.com/sentraea.ai" target="_blank">
                <Image
                  src={
                    "https://img.icons8.com/fluency-systems-regular/96/instagram-new--v1.png"
                  }
                  alt="Instagram"
                  width={25}
                  height={25}
                />
              </a>
              <Image
                src={"https://img.icons8.com/ios/100/youtube-play--v1.png"}
                alt="Youtube"
                width={25}
                height={25}
              />
            </div>

            <a href="mailto:sentraea.ai@gmail.com">sentraea.ai@gmail.com</a>
          </div>
          <nav
            className="flex items-center gap-6 text-sm text-muted-foreground"
            aria-label="Footer"
          >
            <Link
              href="/privacy"
              className="transition-colors hover:text-foreground"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="transition-colors hover:text-foreground"
            >
              Terms
            </Link>
          </nav>
        </div>

        <p className="mt-8 text-center text-xs text-muted-foreground/70">
          © {new Date().getFullYear()} Sentraea. All rights reserved.
        </p>
      </Container>
    </footer>
  );
}
