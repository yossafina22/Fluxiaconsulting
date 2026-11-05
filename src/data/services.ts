export type PillarSlug =
  | "intelligent-websites"
  | "website-redesign"
  | "content-creation"
  | "ai-agents"
  | "business-automation";

export type SolutionSlug =
  | "instant-lead-response"
  | "document-processing"
  | "follow-up-sequences"
  | "customer-reactivation"
  | "internal-reporting";

export const pillarSlugs: ReadonlyArray<PillarSlug> = [
  "intelligent-websites",
  "website-redesign",
  "content-creation",
  "ai-agents",
  "business-automation",
] as const;

export const solutionSlugs: ReadonlyArray<SolutionSlug> = [
  "instant-lead-response",
  "document-processing",
  "follow-up-sequences",
  "customer-reactivation",
  "internal-reporting",
] as const;

export const pillarIcons: Record<PillarSlug, string> = {
  "intelligent-websites": "Globe",
  "website-redesign": "RefreshCw",
  "content-creation": "Film",
  "ai-agents": "Bot",
  "business-automation": "Settings",
};

export const solutionIcons: Record<SolutionSlug, string> = {
  "instant-lead-response": "Zap",
  "document-processing": "FileSearch",
  "follow-up-sequences": "Send",
  "customer-reactivation": "UserPlus",
  "internal-reporting": "BarChart3",
};
