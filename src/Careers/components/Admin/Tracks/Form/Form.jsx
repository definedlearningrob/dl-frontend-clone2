import PropTypes from 'prop-types';
import { useFormikContext } from 'formik';
import { useHistory } from 'react-router-dom';
import { useMemo } from 'react';

import AffectedResources from '@dc/components/Admin/Shared/AffectedResources/AffectedResources';
import Details from '@dc/components/Admin/Tracks/Form/Details/Details';
import FilterProvider from '@dc/components/Admin/Lessons/Form/Items/Shared/FilterProvider/FilterProvider';
import trackCatalogsQuery from '@dc/graphql/user/queries/trackCatalogs';
import Units from '@dc/components/Admin/Tracks/Form/Units/Units';
import { UNITS } from '@dc/graphql/user/queries/units';
import useScrollToInvalidFormElement from '@dc/hooks/useScrollToInvalidFormElement';
import { AFFECTED_RESOURCES_FILED, ARCHIVABLE_STATUSES } from '@dc/resources/constants';
import { shapeTrackForm } from '@dc/resources/typeDefs';
import { FormActions } from '@dc/components/Admin/FormActions/FormActions';
import { AdminFormWrapper } from '@dc/components/Admin/AdminFormWrapper/AdminFormWrapper';

import SharedPaginatedLoader from '@shared/components/PaginatedLoader/PaginatedLoader';

AdminTracksForm.propTypes = {
  ...shapeTrackForm,
  id: PropTypes.string,
  title: PropTypes.string,
};

function AdminTracksForm({ errors, id, touched, title }) {
  const { isSubmitting, values } = useFormikContext();
  const history = useHistory();

  useScrollToInvalidFormElement();

  return (
    <AdminFormWrapper data-testid='tracks-form' title={title}>
      <Details errors={errors} isEdit={!!id} touched={touched} />
      <FilterProvider omitUrl={true}>
        {({ SearchBar, filter }) => {
          const variables = useMemo(
            () => ({
              filter: {
                ...filter,
                serviceEq: values.service.value,
              },
              scope: ARCHIVABLE_STATUSES.ACTIVE.value,
            }),
            [filter, values.service.value]
          );

          return (
            <SharedPaginatedLoader
              omitUrl={true}
              options={{
                variables,
              }}
              query={UNITS}>
              {(props) => <Units SearchBar={SearchBar} pagingProps={props} />}
            </SharedPaginatedLoader>
          );
        }}
      </FilterProvider>
      {id && (
        <AffectedResources
          id={id}
          query={trackCatalogsQuery}
          resourcesField={AFFECTED_RESOURCES_FILED.CATALOGS}
        />
      )}
      <FormActions isLoading={isSubmitting} onCancel={history.goBack} />
    </AdminFormWrapper>
  );
}

export default AdminTracksForm;
