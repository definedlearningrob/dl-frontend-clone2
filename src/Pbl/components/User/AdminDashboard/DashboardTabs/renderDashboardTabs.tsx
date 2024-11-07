import { useTranslation } from 'react-i18next';

export const renderDashboardTabs = () => {
  const { t } = useTranslation();

  const dashboardTabs = [
    {
      id: 'entities',
      label: t('user.dashboard.tables.entities'),
    },
    { id: 'users', label: t('user.dashboard.tables.users') },
  ];

  return dashboardTabs;
};
