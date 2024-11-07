import { useParams } from 'react-router-dom';

import { AdminEntity } from '@dc/components/Admin/Entity/Entity';
import entityQuery from '@dc/graphql/user/queries/entity';
import SharedMainContent from '@dc/shared/MainContent/MainContent';

import SharedDataLoader from '@shared/components/DataLoader/DataLoader';

function AdminAppEntity() {
  const { entityUuid } = useParams();

  return (
    <SharedMainContent>
      <SharedDataLoader
        options={{ fetchPolicy: 'network-only', variables: { uuid: entityUuid } }}
        query={entityQuery}>
        {({ entity }) => <AdminEntity entity={entity} />}
      </SharedDataLoader>
    </SharedMainContent>
  );
}

export default AdminAppEntity;
