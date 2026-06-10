import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-950 border-t border-white/10 pt-20 pb-8 relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>

      <div className="container mx-auto px-5 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10 lg:gap-8 mb-16">
          {/* Brand Column */}
          <div className="col-span-2 lg:col-span-2 flex flex-col items-start">
            <Link
              href="/"
              className="text-2xl font-bold text-white tracking-tighter mb-4 flex items-center gap-2"
            >
              <div className="h-7 w-7 rounded-lg bg-linear-to-br from-primary to-primary/60 flex items-center justify-center shadow-lg shadow-primary/20">
                <div className="h-2.5 w-2.5 rounded-sm bg-black"></div>
              </div>
              Sentraea
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm mb-6 pr-4">
              The complete startup workspace. Run stages, validate ideas, and
              build products that people actually want to use.
            </p>
            <div className="flex items-center gap-4">
              <Link
                href="#"
                className="h-10 w-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-white/10 hover:text-white transition-all duration-300"
              >
                <span className="sr-only">Twitter</span>
                {/* <Twitter className="h-4 w-4" /> */}
              </Link>
              <Link
                href="#"
                className="h-10 w-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-white/10 hover:text-white transition-all duration-300"
              >
                <span className="sr-only">GitHub</span>
                {/* <Github className="h-4 w-4" /> */}
              </Link>
              <Link
                href="#"
                className="h-10 w-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-white/10 hover:text-white transition-all duration-300"
              >
                <span className="sr-only">LinkedIn</span>
                {/* <Linkedin className="h-4 w-4" /> */}
              </Link>
            </div>
          </div>

          {/* Links Columns */}
          <div className="flex flex-col gap-4 lg:col-start-4">
            <h4 className="text-white font-medium mb-2 tracking-wide text-sm">
              Product
            </h4>
            <Link
              href="#"
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              Features
            </Link>
            <Link
              href="#"
              className="text-gray-400 hover:text-white text-sm transition-colors flex items-center gap-2"
            >
              Pricing
              <span className="text-[10px] font-semibold bg-primary/10 text-primary border border-primary/20 px-1.5 py-0.5 rounded-full uppercase tracking-wider">
                New
              </span>
            </Link>
            <Link
              href="#"
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              Integrations
            </Link>
            <Link
              href="#"
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              Changelog
            </Link>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="text-white font-medium mb-2 tracking-wide text-sm">
              Resources
            </h4>
            <Link
              href="#"
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              Documentation
            </Link>
            <Link
              href="#"
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              Blog
            </Link>
            <Link
              href="#"
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              Community
            </Link>
            <Link
              href="#"
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              Guides
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
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/10">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Sentraea Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="#"
              className="text-gray-500 hover:text-white text-sm transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-gray-500 hover:text-white text-sm transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="#"
              className="text-gray-500 hover:text-white text-sm transition-colors"
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
