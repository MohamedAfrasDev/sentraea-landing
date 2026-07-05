import React from "react";
import Link from "next/link";

import HorizontalLogo from "@/public/logos/SENTRAEA.svg";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-primary border-t border-white/10 pt-10 pb-8 relative overflow-hidden">
      {/* Subtle Background Glow */}

      <div className="container mx-auto px-5 relative z-10">
        <div className="">
          {/* Brand Column */}
          <div className="col-span-2 lg:col-span-2 flex flex-col items-start">
            <Link
              href="/"
              className="text-2xl font-bold text-white tracking-tighter mb-4 flex items-center gap-2"
            >
              <Image
                src={HorizontalLogo}
                alt="Sentraea"
                width={1000}
                height={1000}
                className="invert w-[300px]"
              />
            </Link>
          </div>

          {/* <div className="flex flex-col gap-4">
            <h4 className="text-white font-medium mb-2 tracking-wide text-sm">
              Company
            </h4>
            <Link
              href="#"
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              About
            </Link>
            <Link
              href="#"
              className="text-gray-400 hover:text-white text-sm transition-colors flex items-center gap-1 group"
            >
              Careers
              <ArrowUpRight className="h-3 w-3 opacity-50 group-hover:opacity-100 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
            </Link>
            <Link
              href="#"
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              Contact
            </Link>
            <Link
              href="#"
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              Partners
            </Link>
          </div> */}
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between">
          <p className="text-white text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Sentraea Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="#"
              className="text-white hover:text-white text-sm transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-white hover:text-white text-sm transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="#"
              className="text-white hover:text-white text-sm transition-colors"
            >
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
