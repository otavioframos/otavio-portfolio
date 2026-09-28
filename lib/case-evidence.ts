import type { CaseEvidence, Lang } from './projects';

/**
 * Evidence layer for the three main cases. Every field is optional and the case
 * page only renders a block when its data exists, so this file can be filled in
 * one case at a time. Keep numbers sourced (PostHog, Stripe, store reviews) and
 * name the instrument and window in `note`.
 */
export const caseEvidence: Record<string, Partial<Record<Lang, CaseEvidence>>> = {
  mindyoung: {},
  'content-radar': {},
  avela: {},
};
