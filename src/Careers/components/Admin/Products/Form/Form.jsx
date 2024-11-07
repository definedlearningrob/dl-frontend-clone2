import PropTypes from 'prop-types';
import { useFormikContext } from 'formik';
import { useHistory } from 'react-router-dom';

import AffectedResources from '@dc/components/Admin/Shared/AffectedResources/AffectedResources';
import Details from '@dc/components/Admin/Products/Form/Details/Details';
import FilterProvider from '@dc/components/Admin/Lessons/Form/Items/Shared/FilterProvider/FilterProvider';
import Rubrics from '@dc/components/Admin/Products/Form/Rubrics/Rubrics';
import productTasksQuery from '@dc/graphql/user/queries/productTasks';
import { RUBRICS } from '@dc/graphql/user/queries/rubrics';
import useScrollToInvalidFormElement from '@dc/hooks/useScrollToInvalidFormElement';
import { AFFECTED_RESOURCES_FILED, ARCHIVABLE_STATUSES } from '@dc/resources/constants';
import { shapeProductForm } from '@dc/resources/typeDefs';
import { FormActions } from '@dc/components/Admin/FormActions/FormActions';
import { AdminFormWrapper } from '@dc/components/Admin/AdminFormWrapper/AdminFormWrapper';
import { BadgesSelector } from '@dc/components/Admin/BadgeManagement/BadgesSelector/BadgesSelector';

import SharedPaginatedLoader from '@shared/components/PaginatedLoader/PaginatedLoader';
import { useToggle } from '@shared/hooks/useToggle';
import Card from '@shared/components/Card/Card';

export const AdminProductsForm = ({ errors, id, touched, title }) => {
  const history = useHistory();
  const { isSubmitting } = useFormikContext();
  const [isWithCopies, toggleIsWithCopies] = useToggle(false);
  useScrollToInvalidFormElement();

  return (
    <AdminFormWrapper title={title}>
      <Details errors={errors} touched={touched} />
      <FilterProvider omitUrl={true}>
        {({ SearchBar, filter }) => (
          <SharedPaginatedLoader
            omitUrl={true}
            options={{
              variables: {
                filter,
                scope: ARCHIVABLE_STATUSES.ACTIVE.value,
                withCopies: isWithCopies,
              },
            }}
            query={RUBRICS}>
            {(props) => (
              <Rubrics
                SearchBar={SearchBar}
                isWithCopies={isWithCopies}
                pagingProps={props}
                toggleIsWithCopies={toggleIsWithCopies}
              />
            )}
          </SharedPaginatedLoader>
        )}
      </FilterProvider>
      <Card>
        <BadgesSelector />
      </Card>

      {id && (
        <AffectedResources
          id={id}
          query={productTasksQuery}
          resourcesField={AFFECTED_RESOURCES_FILED.TASKS}
        />
      )}
      <FormActions isLoading={isSubmitting} onCancel={history.goBack} />
    </AdminFormWrapper>
  );
};

AdminProductsForm.propTypes = {
  ...shapeProductForm,
  id: PropTypes.string,
  title: PropTypes.string,
};
