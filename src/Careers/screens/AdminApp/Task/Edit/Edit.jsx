import { useParams } from 'react-router-dom';

import AdminTasksEdit from '@dc/components/Admin/Tasks/Edit/Edit';
import SharedMainContent from '@dc/shared/MainContent/MainContent';
import taskQuery from '@dc/graphql/user/queries/task';

import SharedDataLoader from '@shared/components/DataLoader/DataLoader';

function AdminAppTaskEdit() {
  const { id } = useParams();

  return (
    <SharedMainContent>
      <SharedDataLoader options={{ fetchPolicy: 'no-cache', variables: { id } }} query={taskQuery}>
        {({ task }) => <AdminTasksEdit task={task} />}
      </SharedDataLoader>
    </SharedMainContent>
  );
}

export default AdminAppTaskEdit;
