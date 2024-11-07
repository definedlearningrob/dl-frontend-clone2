import { useEffect } from 'react';

import GradingContent from '@pbl/components/User/Grading/Content';
import GradingSidebar from '@pbl/components/User/Grading/GradingSidebar';
import SharedMainContent from '@pbl/shared/MainContent/MainContent';
import GradingProvider from '@pbl/components/User/Grading/GradingContext/GradingContext';
import { GRADING_ITEM_TYPES } from '@pbl/resources/enums';

import { useLti } from '@shared/components/LtiProvider/LtiProvider';
import { useNavigation } from '@shared/components/Sidebar/useNavigation';

import styles from './ProductGradingScreen.module.sass';

const Grading = () => {
  const { isLti } = useLti();
  const { toggleIsHidden, setBackNavButton } = useNavigation();

  useEffect(() => {
    setBackNavButton(true);
    if (isLti) {
      toggleIsHidden(true);
    }

    return () => setBackNavButton(false);
  }, []);

  return (
    <SharedMainContent className={styles.container}>
      <GradingProvider type={GRADING_ITEM_TYPES.PRODUCT}>
        <GradingSidebar />
        <GradingContent type={GRADING_ITEM_TYPES.PRODUCT} />
      </GradingProvider>
    </SharedMainContent>
  );
};

export default Grading;
