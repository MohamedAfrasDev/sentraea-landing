import type { Metadata } from "next";
import Link from "next/link";

import { signIn } from "@/actions/auth";
import { AuthForm } from "@/components/auth/auth-form";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Sign in | Sentraea",
};

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; error?: string }>;
}) {
  const { next, error } = await searchParams;

  return (
    <Card className="w-full gap-6 px-7 py-8 md:px-9">
      <div className="flex flex-col gap-1.5">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-primary">
          Welcome back
        </p>
        <h1 className="font-heading text-2xl font-medium tracking-tight">
          Sign in to Sentraea
        </h1>
        <p className="text-sm text-muted-foreground">
          Pick up where you left off — your weekly move is waiting.
        </p>
      </div>

      {error === "confirmation" ? (
        <p className="rounded-sm bg-destructive/5 px-3 py-2.5 text-sm text-destructive">
          That confirmation link is invalid or expired. Try signing in, or sign
          up again to get a new link.
        </p>
      ) : null}

      <AuthForm
        action={signIn}
        submitLabel="Sign in"
        pendingLabel="Signing in"
        next={next}
      />

      <p className="text-center text-sm text-muted-foreground">
        New to Sentraea?{" "}
        <Link href="/sign-up" className="font-medium text-primary hover:underline">
          Create an account
        </Link>
      </p>
    </Card>
  );
}
