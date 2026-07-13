import { NextResponse, type NextRequest } from "next/server";

import { runAnalysisPipeline } from "@/lib/ai/pipeline";
import { getSessionUser } from "@/lib/auth/session";
import { getResearchRunForUser } from "@/lib/db/queries";

// The pipeline makes several model calls plus live web research.
export const maxDuration = 300;

export async function POST(request: NextRequest) {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let runId: unknown;
  try {
    ({ runId } = await request.json());
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }
  if (typeof runId !== "string") {
    return NextResponse.json({ error: "runId is required." }, { status: 400 });
  }

  const run = await getResearchRunForUser(user.id, runId);
  if (!run) {
    return NextResponse.json({ error: "Run not found." }, { status: 404 });
  }
  if (run.status !== "pending") {
    return NextResponse.json(
      { error: "This run has already been processed." },
      { status: 409 },
    );
  }

  try {
    const recommendationId = await runAnalysisPipeline(runId);
    return NextResponse.json({ recommendationId });
  } catch (err) {
    console.error("Analysis pipeline failed:", err);
    return NextResponse.json(
      { error: "Analysis failed. You can retry from the dashboard." },
      { status: 500 },
    );
  }
}
