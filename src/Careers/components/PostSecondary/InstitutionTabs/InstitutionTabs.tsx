import { useTranslation } from 'react-i18next';

import SharedTabs, { Tab } from '@shared/components/DeprecatedTabs/DeprecatedTabs';

import { InstitutionTabContent } from './InstitutionTabContent';
import { INSTITUTION_TABS } from './Tabs';

type Props = {
  isIpedsInstitution: boolean;
  isTeacher?: boolean;
};

export const InstitutionTabs = ({ isIpedsInstitution, isTeacher = false }: Props) => {
  const { t } = useTranslation();

  const tabs = [
    { label: t('postSecondary.institution.overview'), id: INSTITUTION_TABS.OVERVIEW },
    { label: t('postSecondary.institution.admissions'), id: INSTITUTION_TABS.ADMISSIONS },
    isIpedsInstitution && {
      label: t('postSecondary.institution.academics'),
      id: INSTITUTION_TABS.ACADEMICS,
    },
  ].filter(Boolean);

  return (
    <div>
      <SharedTabs tabs={tabs as Tab[]}>
        <SharedTabs.Tabs />
        <InstitutionTabContent isTeacher={isTeacher} />
      </SharedTabs>
    </div>
  );
};
