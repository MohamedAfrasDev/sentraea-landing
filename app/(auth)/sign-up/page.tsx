import type { Metadata } from "next";
import Link from "next/link";

import { signUp } from "@/actions/auth";
import { AuthForm } from "@/components/auth/auth-form";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Create your account | Sentraea",
};

export default function SignUpPage() {
  return (
    <Card className="w-full gap-6 px-7 py-8 md:px-9">
      <div className="flex flex-col gap-1.5">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-primary">
          Get started
        </p>
        <h1 className="font-heading text-2xl font-medium tracking-tight">
          Create your account
        </h1>
        <p className="text-sm text-muted-foreground">
          Two minutes of setup, then Sentraea starts working on your first
          weekly move.
        </p>
      </div>

      <AuthForm
        action={signUp}
        submitLabel="Create account"
        pendingLabel="Creating account"
      />

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/sign-in" className="font-medium text-primary hover:underline">
          Sign in
        </Link>
      </p>
    </Card>
  );
}
