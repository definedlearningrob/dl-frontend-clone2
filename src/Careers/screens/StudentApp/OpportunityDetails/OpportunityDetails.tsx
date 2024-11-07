import { OpportunityDetailsContent } from '@dc/components/OpportunityDetails/OpportunityDetailsContent';
import MainContent from '@dc/shared/MainContent/MainContent';

import styles from './OpportunityDetails.module.sass';

export const OpportunityDetails = () => (
  <MainContent className={styles.mainContent}>
    <OpportunityDetailsContent />
  </MainContent>
);
