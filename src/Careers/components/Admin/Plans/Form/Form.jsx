import PropTypes from 'prop-types';
import { useFormikContext } from 'formik';
import { useHistory } from 'react-router-dom';
import { useMemo } from 'react';

import Details from '@dc/components/Admin/Plans/Form/Details/Details';
import FilterProvider from '@dc/components/Admin/Lessons/Form/Items/Shared/FilterProvider/FilterProvider';
import Groups from '@dc/components/Admin/Plans/Form/Groups/Groups';
import planGroupsQuery from '@dc/graphql/user/queries/planGroups';
import useScrollToInvalidFormElement from '@dc/hooks/useScrollToInvalidFormElement';
import { AdminFormWrapper } from '@dc/components/Admin/AdminFormWrapper/AdminFormWrapper';
import { FormActions } from '@dc/components/Admin/FormActions/FormActions';

import SharedPaginatedLoader from '@shared/components/PaginatedLoader/PaginatedLoader';

AdminPlansForm.propTypes = {
  errors: PropTypes.shape({
    description: PropTypes.string,
    name: PropTypes.string,
  }),
  title: PropTypes.string,
  touched: PropTypes.shape({
    description: PropTypes.bool,
    name: PropTypes.bool,
  }),
};

function AdminPlansForm({ errors, touched, title }) {
  const { isSubmitting } = useFormikContext();
  const history = useHistory();

  useScrollToInvalidFormElement();

  return (
    <AdminFormWrapper data-testid='courses-form' title={title}>
      <Details errors={errors} touched={touched} />
      <FilterProvider omitUrl={true}>
        {({ SearchBar, filter }) => {
          const variables = useMemo(() => ({ filter }), [filter]);

          return (
            <SharedPaginatedLoader
              omitUrl={true}
              options={{ fetchPolicy: 'network-only', variables }}
              query={planGroupsQuery}>
              {(props) => <Groups SearchBar={SearchBar} pagingProps={props} />}
            </SharedPaginatedLoader>
          );
        }}
      </FilterProvider>
      <FormActions isLoading={isSubmitting} onCancel={history.goBack} />
    </AdminFormWrapper>
  );
}

export default AdminPlansForm;
