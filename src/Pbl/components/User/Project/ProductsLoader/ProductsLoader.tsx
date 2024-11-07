import { useParams } from 'react-router-dom';

import projectProductsQuery, {
  TProjectProductsData,
  TProjectProductsVariables,
} from '@pbl/graphql/user/queries/projectProducts';
import { ProjectProducts } from '@pbl/components/Project/Products/Products';

import SharedDataLoader from '@shared/components/DataLoader/DataLoader';
import useQueryParams from '@shared/hooks/useQueryParams';

export function UserProductsLoader() {
  const { projectId } = useParams<{ projectId: string }>();
  const {
    params: { code },
  } = useQueryParams<{ code: string }>();

  return (
    <SharedDataLoader<TProjectProductsData, TProjectProductsVariables>
      options={{ variables: { projectId, code } }}
      query={projectProductsQuery}>
      {({ project: { products, assignedStudentsCount } }) => (
        <ProjectProducts isGradingAllowed={!!assignedStudentsCount} products={products} />
      )}
    </SharedDataLoader>
  );
}
