import { useParams } from 'react-router-dom';

import projectProductsQuery, {
  TPublicProjectProductsData,
  TPublicProjectProductsVariables,
} from '@pbl/graphql/public/queries/projectProducts';
import { ProjectProducts } from '@pbl/components/Project/Products/Products';

import SharedDataLoader from '@shared/components/DataLoader/DataLoader';
import useQueryParams from '@shared/hooks/useQueryParams';

function SharedProjectProductsLoader() {
  const { projectId } = useParams<{ projectId: string }>();
  const {
    params: { code },
  }: { params: { code: string } } = useQueryParams();

  return (
    <SharedDataLoader<TPublicProjectProductsData, TPublicProjectProductsVariables>
      options={{ variables: { shareId: projectId, code } }}
      query={projectProductsQuery}>
      {({ project: { products } }) => (
        <ProjectProducts isGradingAllowed={false} products={products} />
      )}
    </SharedDataLoader>
  );
}

export default SharedProjectProductsLoader;
