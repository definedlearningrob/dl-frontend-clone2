import { useParams } from 'react-router-dom';

import PlanEdit from '@dc/components/Admin/Plans/Edit/Edit';
import planQuery from '@dc/graphql/user/queries/plan';
import SharedMainContent from '@dc/shared/MainContent/MainContent';

import SharedDataLoader from '@shared/components/DataLoader/DataLoader';

function AdminAppPlanEdit() {
  const { id } = useParams();

  return (
    <SharedMainContent>
      <SharedDataLoader options={{ variables: { id } }} query={planQuery}>
        {({ plan }) => <PlanEdit plan={plan} />}
      </SharedDataLoader>
    </SharedMainContent>
  );
}

export default AdminAppPlanEdit;
