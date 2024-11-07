import { Dispatch, ReactNode, SetStateAction, MouseEvent } from 'react';

import { TEvidence } from '@shared/resources/types';

export type TEvidenceListItem = TEvidence & {
  additionalAction?: (evidence: TEvidence) => ReactNode;
  onDelete: Dispatch<SetStateAction<TEvidence | null>>;
  onNavigate: (evidence: TEvidence, event: MouseEvent) => void;
};
