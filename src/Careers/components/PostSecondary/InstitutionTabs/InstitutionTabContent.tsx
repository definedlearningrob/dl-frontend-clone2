import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { useInstitutionQuery } from '@dc/graphql/student/hooks/useInstitutionQuery';
import { useUserInstitutionQuery } from '@dc/graphql/user/hooks/useUserInstitutionQuery';
import { useInstitutionPrograms } from '@dc/graphql/student/hooks/useInstitutionPrograms';

import { useTabsContext } from '@shared/components/DeprecatedTabs/DeprecatedTabs';
import SharedCard from '@shared/components/Card/Card';
import SharedImage from '@shared/components/Image/Image';
import IPEDSLogo from '@shared/assets/images/IPEDS-logo.jpg';

import { INSTITUTION_TABS } from './Tabs';
import { OverviewTab } from './OverviewTab';
import { AdmissionsTab } from './AdmissionsTab';
import { CostsTab } from './CostsTab';
import { AcademicsTab } from './AcademicsTab';
import styles from './InstitutionTabContent.module.sass';

const tabContentsMap = {
  [INSTITUTION_TABS.OVERVIEW]: OverviewTab,
  [INSTITUTION_TABS.ADMISSIONS]: AdmissionsTab,
  [INSTITUTION_TABS.COSTS]: CostsTab,
  [INSTITUTION_TABS.ACADEMICS]: AcademicsTab,
};

type Props = {
  isTeacher: boolean;
};

export const InstitutionTabContent = ({ isTeacher }: Props) => {
  const { t } = useTranslation();
  const { tab } = useTabsContext();
  const { id } = useParams<{ id: string }>();

  const useProperInstitutionQuery = isTeacher ? useUserInstitutionQuery : useInstitutionQuery;

  const { data } = useProperInstitutionQuery({ id });

  // as a prefetch strategy
  useInstitutionPrograms({ id });

  const tabId = tab?.id as INSTITUTION_TABS;
  const TabContent = tabId && tabContentsMap[tabId];

  if (!data) {
    return null;
  }

  const { institution } = data;

  return (
    <div className={styles.tabContentWrapper}>
      <TabContent institution={institution} />
      {institution.isIpeds && (
        <SharedCard>
          <div className={styles.credits}>
            <SharedImage className={styles.creditsImage} src={IPEDSLogo} />
            <a className={styles.credits} href='https://nces.ed.gov/ipeds/' target='_blank'>
              {t('postSecondary.institution.creditsToIPEDS')}
            </a>
          </div>
        </SharedCard>
      )}
    </div>
  );
};
