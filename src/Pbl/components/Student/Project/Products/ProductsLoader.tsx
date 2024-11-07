import { useParams } from 'react-router-dom';
import { isEmpty } from 'lodash-es';

import projectProductsQuery, {
  TStudentProjectProductsData,
  TStudentProjectProductsVariables,
} from '@pbl/graphql/student/queries/projectProducts';
import { ProjectProducts } from '@pbl/components/Project/Products/Products';

import SharedDataLoader from '@shared/components/DataLoader/DataLoader';

type Params = {
  projectId: string;
  teamId?: string;
};

type Props = {
  assignedAt?: string | null;
};

function StudentProjectProductsLoader({ assignedAt }: Props) {
  const { projectId, teamId } = useParams<Params>();

  const canSubmit = !isEmpty(assignedAt);

  return (
    <SharedDataLoader<TStudentProjectProductsData, TStudentProjectProductsVariables>
      options={{
        variables: { id: projectId, teamId },
      }}
      query={projectProductsQuery}>
      {({ project: { products } }) => <ProjectProducts canSubmit={canSubmit} products={products} />}
    </SharedDataLoader>
  );
}

export default StudentProjectProductsLoader;
