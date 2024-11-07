import MainContent from '@dc/shared/MainContent/MainContent';
import { VirtualInternshipContent } from '@dc/components/Student/VirtualInternship/VirtualInternshipContent/VirtualInternshipContent';

import styles from './VirtualInternship.module.sass';

export const VirtualInternship = () => (
  <MainContent className={styles.mainContent}>
    <VirtualInternshipContent />
  </MainContent>
);
