import PropTypes from 'prop-types';
import { useFormikContext } from 'formik';
import { useHistory } from 'react-router-dom';
import { useMemo } from 'react';

import checkInQuestionsQuery from '@dc/graphql/user/queries/checkinQuestions';
import FilterProvider from '@dc/components/Admin/Lessons/Form/Items/Shared/FilterProvider/FilterProvider';
import useScrollToInvalidFormElement from '@dc/hooks/useScrollToInvalidFormElement';
import { BadgesSelector } from '@dc/components/Admin/BadgeManagement/BadgesSelector/BadgesSelector';
import { FormActions } from '@dc/components/Admin/FormActions/FormActions';
import { AdminFormWrapper } from '@dc/components/Admin/AdminFormWrapper/AdminFormWrapper';

import SharedPaginatedLoader from '@shared/components/PaginatedLoader/PaginatedLoader';
import Card from '@shared/components/Card/Card';

import CheckInQuestions from './Questions/Questions';
import { AdminCheckinGroupsFormDetails } from './Details/Details';

export const AdminCheckinGroupForm = ({ title }) => {
  const { isSubmitting } = useFormikContext();
  const history = useHistory();

  const returnToGroups = () => {
    history.push('/admin/checkin-groups');
  };

  useScrollToInvalidFormElement();

  return (
    <AdminFormWrapper title={title}>
      <AdminCheckinGroupsFormDetails />
      <FilterProvider omitUrl={true}>
        {({ SearchBar, filter }) => {
          const variables = useMemo(() => ({ filter }), [filter]);

          return (
            <SharedPaginatedLoader
              omitUrl={true}
              options={{
                variables,
              }}
              query={checkInQuestionsQuery}>
              {(props) => <CheckInQuestions SearchBar={SearchBar} pagingProps={props} />}
            </SharedPaginatedLoader>
          );
        }}
      </FilterProvider>
      <Card>
        <BadgesSelector />
      </Card>
      <FormActions isLoading={isSubmitting} onCancel={returnToGroups} />
    </AdminFormWrapper>
  );
};

AdminCheckinGroupForm.propTypes = {
  title: PropTypes.string,
};
