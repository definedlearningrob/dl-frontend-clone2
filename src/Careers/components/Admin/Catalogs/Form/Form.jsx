import PropTypes from 'prop-types';
import { useFormikContext } from 'formik';
import { useHistory } from 'react-router-dom';
import { useMemo } from 'react';

import Details from '@dc/components/Admin/Catalogs/Form/Details/Details';
import FilterProvider from '@dc/components/Admin/Lessons/Form/Items/Shared/FilterProvider/FilterProvider';
import Tracks from '@dc/components/Admin/Catalogs/Form/Tracks/Tracks';
import tracksQuery from '@dc/graphql/user/queries/tracks';
import useScrollToInvalidFormElement from '@dc/hooks/useScrollToInvalidFormElement';
import { shapeCatalogForm } from '@dc/resources/typeDefs';
import { ARCHIVABLE_STATUSES } from '@dc/resources/constants';
import { AdminFormWrapper } from '@dc/components/Admin/AdminFormWrapper/AdminFormWrapper';
import { FormActions } from '@dc/components/Admin/FormActions/FormActions';

import SharedPaginatedLoader from '@shared/components/PaginatedLoader/PaginatedLoader';

AdminCatalogsForm.propTypes = {
  ...shapeCatalogForm,
  title: PropTypes.string,
};

function AdminCatalogsForm({ errors, touched, title, id }) {
  const { isSubmitting, values } = useFormikContext();
  const history = useHistory();

  useScrollToInvalidFormElement();

  return (
    <AdminFormWrapper data-testid='catalogs-form' title={title}>
      <Details errors={errors} isEdit={!!id} touched={touched} />
      <FilterProvider omitUrl={true}>
        {({ SearchBar, filter }) => {
          const variables = useMemo(
            () => ({
              filter: { ...filter, serviceEq: values.service.value },
              scope: ARCHIVABLE_STATUSES.ACTIVE.value,
            }),
            [filter, values.service.value]
          );

          return (
            <SharedPaginatedLoader
              omitUrl={true}
              options={{
                fetchPolicy: 'network-only',
                variables,
              }}
              query={tracksQuery}>
              {(props) => <Tracks SearchBar={SearchBar} pagingProps={props} />}
            </SharedPaginatedLoader>
          );
        }}
      </FilterProvider>
      <FormActions isLoading={isSubmitting} onCancel={history.goBack} />
    </AdminFormWrapper>
  );
}

export default AdminCatalogsForm;
