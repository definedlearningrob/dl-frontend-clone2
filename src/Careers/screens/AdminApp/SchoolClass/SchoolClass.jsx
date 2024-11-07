import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import SchoolClass from '@dc/components/Admin/SchoolClass/SchoolClass';
import schoolClassQuery from '@dc/graphql/user/queries/schoolClass';
import SharedMainContent from '@dc/shared/MainContent/MainContent';

import SharedDataLoader from '@shared/components/DataLoader/DataLoader';
import { useNavigation } from '@shared/components/Sidebar/useNavigation';

function AdminAppSchoolClass() {
  const { schoolClassUuid } = useParams();
  const { setBackNavButton } = useNavigation();

  useEffect(() => {
    setBackNavButton(true);

    return () => setBackNavButton(false);
  }, []);

  return (
    <SharedMainContent>
      <SharedDataLoader
        options={{ fetchPolicy: 'network-only', variables: { uuid: schoolClassUuid } }}
        query={schoolClassQuery}>
        {({ schoolClass }) => <SchoolClass schoolClass={schoolClass} />}
      </SharedDataLoader>
    </SharedMainContent>
  );
}

export default AdminAppSchoolClass;
