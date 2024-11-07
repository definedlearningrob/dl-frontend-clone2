import { EVIDENCE_CONTEXT_KIND, EVIDENCE_KIND } from '@shared/resources/enums';

export type ManualAddedEvidenceRecord = {
  itemId: string | null;
  itemType: Omit<EVIDENCE_CONTEXT_KIND, 'RUBRIC_GRADE'>;
};

export type EvidenceRecord = {
  itemId: string;
  itemType: EVIDENCE_KIND;
};
