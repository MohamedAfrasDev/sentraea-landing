/**
 * Lightweight event tracking. V1 logs structured events server-side;
 * swap the sink for a real analytics provider later without touching call sites.
 */

export type AnalyticsEvent =
  | "sign_up_completed"
  | "onboarding_completed"
  | "analysis_started"
  | "analysis_completed"
  | "analysis_failed"
  | "recommendation_viewed"
  | "feedback_submitted";

export function track(
  event: AnalyticsEvent,
  properties: Record<string, unknown> = {},
): void {
  try {
    console.log(
      JSON.stringify({
        type: "analytics",
        event,
        ts: new Date().toISOString(),
        ...properties,
      }),
    );
  } catch {
    // Analytics must never break the product path.
  }
}
