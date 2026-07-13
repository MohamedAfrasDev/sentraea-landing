"use client";

import { Loader2 } from "lucide-react";
import { useActionState } from "react";

import type { AuthActionState } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type AuthFormProps = {
  action: (
    prev: AuthActionState,
    formData: FormData,
  ) => Promise<AuthActionState>;
  submitLabel: string;
  pendingLabel: string;
  next?: string;
};

export function AuthForm({
  action,
  submitLabel,
  pendingLabel,
  next,
}: AuthFormProps) {
  const [state, formAction, isPending] = useActionState(action, {});

  return (
    <form action={formAction} className="flex flex-col gap-4">
      {next ? <input type="hidden" name="next" value={next} /> : null}

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@yourstartup.com"
          required
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          placeholder="••••••••"
          required
        />
      </div>

      {state.error ? (
        <p role="alert" className="text-sm text-destructive">
          {state.error}
        </p>
      ) : null}
      {state.info ? (
        <p role="status" className="rounded-sm bg-primary/5 px-3 py-2.5 text-sm leading-relaxed text-foreground">
          {state.info}
        </p>
      ) : null}

      <Button type="submit" disabled={isPending} className="mt-1 w-full py-5 text-base">
        {isPending ? (
          <>
            {pendingLabel} <Loader2 className="animate-spin" />
          </>
        ) : (
          submitLabel
        )}
      </Button>
    </form>
  );
}
