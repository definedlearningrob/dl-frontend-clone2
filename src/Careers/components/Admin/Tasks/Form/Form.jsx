import PropTypes from 'prop-types';
import { Form, useFormikContext } from 'formik';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useToggle } from 'react-use';

import AffectedResources from '@dc/components/Admin/Shared/AffectedResources/AffectedResources';
import Details from '@dc/components/Admin/Tasks/Form/Details/Details';
import FilterProvider from '@dc/components/Admin/Lessons/Form/Items/Shared/FilterProvider/FilterProvider';
import Products from '@dc/components/Admin/Tasks/Form/Products/Products';
import productsQuery from '@dc/graphql/user/queries/products';
import SharedFormDivider from '@dc/shared/FormDivider/FormDivider';
import taskUnitsQuery from '@dc/graphql/user/queries/taskUnits';
import useScrollToInvalidFormElement from '@dc/hooks/useScrollToInvalidFormElement';
import { PresentationBuilderModal } from '@dc/components/Admin/Tasks/PresentationBuilderModal/PresentationBuilderModal';
import { AFFECTED_RESOURCES_FILED, ARCHIVABLE_STATUSES } from '@dc/resources/constants';
import { shapeTask } from '@dc/resources/typeDefs';
import { shapeTaskForm } from '@dc/resources/typeDefs';
import ConnectedCourses from '@dc/components/Admin/Tasks/ConnectedCourses/ConnectedCourses';
import { Pathways } from '@dc/components/Admin/Tasks/Form';
import { BadgesSelector } from '@dc/components/Admin/BadgeManagement/BadgesSelector/BadgesSelector';

import SharedPaginatedLoader from '@shared/components/PaginatedLoader/PaginatedLoader';
import Button from '@shared/components/Button/Button';
import Card from '@shared/components/Card/Card';

import Checkins from './Checkins/Checkins';

export const AdminTasksForm = ({
  disabledTaskFileInput,
  errors,
  id,
  onTaskFileRemove,
  task,
  title,
  touched,
}) => {
  const history = useHistory();
  const { t } = useTranslation();
  const { isSubmitting } = useFormikContext();
  const [showNewPresentationModal, setShowNewPresentationModal] = useState(false);
  const [showCopies, toggleShowCopies] = useToggle(false);

  const returnToTasks = () => {
    history.goBack();
  };

  useScrollToInvalidFormElement();

  const handleClosePresentationBuilder = () => setShowNewPresentationModal(false);

  return (
    <>
      <Form className='rounded-base border border-primary-500 my-md p-md' data-testid='task-form'>
        <h3 className='capitalize' data-testid='task-form-title'>
          {title}
        </h3>
        <Details
          disabledTaskFileInput={disabledTaskFileInput}
          errors={errors}
          setShowNewPresentationModal={setShowNewPresentationModal}
          task={task}
          touched={touched}
          onTaskFileRemove={onTaskFileRemove}
        />
        <SharedFormDivider />
        <Pathways />
        <SharedFormDivider />
        <Checkins />
        <SharedFormDivider />
        <FilterProvider omitUrl={true}>
          {({ SearchBar, filter }) => (
            <SharedPaginatedLoader
              omitUrl={true}
              options={{
                variables: {
                  filter,
                  scope: ARCHIVABLE_STATUSES.ACTIVE.value,
                  withCopies: showCopies,
                },
              }}
              query={productsQuery}>
              {(props) => (
                <Products
                  SearchBar={SearchBar}
                  pagingProps={props}
                  showCopies={showCopies}
                  toggleShowCopies={toggleShowCopies}
                />
              )}
            </SharedPaginatedLoader>
          )}
        </FilterProvider>
        <SharedFormDivider />
        <ConnectedCourses error={errors.courses} />
        {id && (
          <AffectedResources
            id={id}
            query={taskUnitsQuery}
            resourcesField={AFFECTED_RESOURCES_FILED.UNITS}
          />
        )}
        <SharedFormDivider />
        <Card>
          <BadgesSelector />
        </Card>
        <SharedFormDivider />
        <div className='flex gap-md'>
          <Button
            className='grow'
            data-testid='task-form-submit'
            isLoading={isSubmitting}
            type='submit'
            value='Save'
            variant='primary'>
            {t('common.actions.save')}
          </Button>
          <Button
            className='grow'
            data-testid='task-form-cancel'
            isLoading={isSubmitting}
            onClick={returnToTasks}>
            {t('common.actions.cancel')}
          </Button>
        </div>
      </Form>
      {showNewPresentationModal && (
        <PresentationBuilderModal closeModal={handleClosePresentationBuilder} taskId={task.id} />
      )}
    </>
  );
};

AdminTasksForm.propTypes = {
  ...shapeTaskForm,
  disabledTaskFileInput: PropTypes.bool,
  id: PropTypes.string,
  onTaskFileRemove: PropTypes.func,
  task: shapeTask,
  title: PropTypes.string,
};
