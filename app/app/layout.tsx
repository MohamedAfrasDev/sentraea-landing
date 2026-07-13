import { AppNav } from "@/components/dashboard/app-nav";
import { requireUser } from "@/lib/auth/session";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireUser();

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <AppNav email={user.email} />
      <main className="mx-auto w-full max-w-5xl flex-1 px-5 py-8 md:px-8 md:py-10">
        {children}
      </main>
      <footer className="border-t border-muted-foreground/10 py-5">
        <p className="text-center font-mono text-[11px] tracking-[0.08em] text-muted-foreground">
          One clear move. Every week.
        </p>
      </footer>
    </div>
  );
}
