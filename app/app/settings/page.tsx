import type { Metadata } from "next";

import { signOut } from "@/actions/auth";
import { SettingsForm } from "@/components/settings/settings-form";
import { Eyebrow } from "@/components/shared/brief-bits";
import { Card } from "@/components/ui/card";
import { requireOnboardedUser } from "@/lib/auth/session";

export const metadata: Metadata = {
  title: "Settings | Sentraea",
};

export default async function SettingsPage() {
  const { user, profile } = await requireOnboardedUser();

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-8">
      <div className="flex flex-col gap-2">
        <Eyebrow>Settings</Eyebrow>
        <h1 className="font-heading text-3xl font-medium tracking-tight md:text-4xl">
          Startup profile
        </h1>
        <p className="max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
          This context feeds every weekly analysis — keep it current and the
          recommendations stay sharp.
        </p>
      </div>

      <Card className="px-6 py-7 md:px-9 md:py-8">
        <SettingsForm
          initial={{
            startupName: profile.startupName,
            productSummary: profile.productSummary,
            customerType: profile.customerType,
            stage: profile.stage,
            mainGoal30d: profile.mainGoal30d,
            bottleneck: profile.bottleneck,
            priorities: profile.priorities,
            websiteUrl: profile.websiteUrl ?? "",
            productUrl: profile.productUrl ?? "",
            competitorUrls: profile.competitorUrls,
            recentChanges: profile.recentChanges ?? "",
            notes: profile.notes ?? "",
          }}
        />
      </Card>

      <Card className="gap-4 px-6 py-6 md:px-9">
        <div className="flex flex-col gap-1">
          <h2 className="font-heading text-lg font-medium tracking-tight">
            Account
          </h2>
          <p className="text-sm text-muted-foreground">
            Signed in as <span className="text-foreground">{user.email}</span>
          </p>
        </div>
        <form action={signOut}>
          <button
            type="submit"
            className="cursor-pointer rounded-sm border border-border bg-card px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
          >
            Sign out
          </button>
        </form>
      </Card>
    </div>
  );
}
