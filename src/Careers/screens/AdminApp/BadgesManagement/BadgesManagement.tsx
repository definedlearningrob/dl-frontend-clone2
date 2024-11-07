import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import SharedMainContent from '@dc/shared/MainContent/MainContent';
import { BadgeFiltersProvider } from '@dc/components/Admin/BadgeManagement/BadgeFilters/BadgeFiltersProvider';
import { BadgeFilter } from '@dc/components/Admin/BadgeManagement/BadgeFilters/BadgeFilter';
import { BadgesManagementTable } from '@dc/components/Admin/BadgeManagement/BadgesManagementTable';

import Card from '@shared/components/Card/Card';
import { useNavigation } from '@shared/components/Sidebar/useNavigation';
import Link from '@shared/components/Link';

export const BadgesManagement = () => {
  const { setBackNavButton } = useNavigation();
  const { t } = useTranslation();

  useEffect(() => {
    setBackNavButton(true);

    return () => setBackNavButton(false);
  }, []);

  return (
    <BadgeFiltersProvider>
      <SharedMainContent>
        <BadgeFilter />
        <Link className='mb-sm' to='/admin/badges/new' variant='primary'>
          {t('common.actions.new')}
        </Link>
        <Card>
          <BadgesManagementTable />
        </Card>
      </SharedMainContent>
    </BadgeFiltersProvider>
  );
};
