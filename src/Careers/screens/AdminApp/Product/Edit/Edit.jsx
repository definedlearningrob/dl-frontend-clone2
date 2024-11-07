import { useParams } from 'react-router-dom';

import AdminProductsEdit from '@dc/components/Admin/Products/Edit/Edit';
import SharedMainContent from '@dc/shared/MainContent/MainContent';
import { PRODUCT_QUERY } from '@dc/graphql/user/queries/product';

import SharedDataLoader from '@shared/components/DataLoader/DataLoader';

function AdminAppProductEdit() {
  const { id } = useParams();

  return (
    <SharedMainContent>
      <SharedDataLoader
        options={{ fetchPolicy: 'network-only', variables: { id } }}
        query={PRODUCT_QUERY}>
        {({ product }) => <AdminProductsEdit product={product} />}
      </SharedDataLoader>
    </SharedMainContent>
  );
}

export default AdminAppProductEdit;
