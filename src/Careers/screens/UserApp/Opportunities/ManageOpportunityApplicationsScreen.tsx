import { useEffect } from 'react';

import { ManageOpportunityApplications } from '@dc/components/User/Opportunities/ManageOpportunityApplications';
import SharedMainContent from '@dc/shared/MainContent/MainContent';

import { useNavigation } from '@shared/components/Sidebar/useNavigation';

export const ManageOpportunityApplicationsScreen = () => {
  const { setBackNavButton } = useNavigation();

  useEffect(() => {
    setBackNavButton(true);

    return () => setBackNavButton(false);
  }, []);

  return (
    <SharedMainContent>
      <ManageOpportunityApplications />
    </SharedMainContent>
  );
};
