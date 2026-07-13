import Image from "next/image";
import Link from "next/link";

import HorizontalLogo from "@/public/logos/SENTRAEA.svg";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-background px-5 py-12">
      {/* subtle dot grid, echoing the landing page */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#d8dbe2_1px,transparent_1px)] bg-size-[22px_22px] opacity-50 mask-[radial-gradient(ellipse_70%_60%_at_50%_40%,#000_50%,transparent_100%)]" />

      <div className="relative z-10 flex w-full max-w-md flex-col items-center">
        <Link href="/" className="mb-8">
          <Image src={HorizontalLogo} alt="Sentraea" width={170} height={44} />
        </Link>
        {children}
        <p className="mt-8 max-w-xs text-center font-mono text-[11px] leading-relaxed tracking-wide text-muted-foreground">
          One evidence-backed move each week. No endless chat.
        </p>
      </div>
    </div>
  );
}
