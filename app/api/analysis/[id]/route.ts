import { NextResponse, type NextRequest } from "next/server";

import { getSessionUser } from "@/lib/auth/session";
import { getResearchRunForUser } from "@/lib/db/queries";

// Status polling endpoint for the analysis progress screen.
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const run = await getResearchRunForUser(user.id, id);
  if (!run) {
    return NextResponse.json({ error: "Run not found." }, { status: 404 });
  }

  return NextResponse.json({
    status: run.status,
    error: run.errorMessage,
    recommendationId: run.status === "complete" ? run.recommendationId : null,
  });
}
