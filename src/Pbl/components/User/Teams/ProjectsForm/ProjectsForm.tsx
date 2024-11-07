import { Form, useFormikContext } from 'formik';
import { NetworkStatus } from '@apollo/client';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import useProjectsQuery from '@pbl/graphql/user/hooks/useProjectsQuery';
import {
  fetchMoreResults,
  noChangesInForm,
  onInputChange,
} from '@pbl/components/User/Teams/ProjectsForm/helpers';

import SharedModal from '@shared/components/Modal/Modal';
import { SelectList } from '@shared/components/SelectList';
import { useDebounce } from '@shared/hooks/useDebounce';

type FormikValues = {
  projects: { value: string; label: string }[];
};

type Props = {
  handleClose: () => void;
  teamId: string;
};

export const ProjectsForm = ({ handleClose, teamId }: Props) => {
  const { t } = useTranslation();
  const { isSubmitting, values, initialValues } = useFormikContext<FormikValues>();
  const [searchName, setSearchName] = useState('');
  const isButtonDisabled =
    noChangesInForm(initialValues.projects, values.projects, 'value') || isSubmitting;
  const [currentPage, setCurrentPage] = useState(1);
  const debouncedSearchTerm = useDebounce(searchName, 500);

  const { data, fetchMore, networkStatus, refetch } = useProjectsQuery(
    teamId,
    { displayNameCont: debouncedSearchTerm },
    currentPage
  );
  const requestInFlight = networkStatus !== NetworkStatus.ready;

  useEffect(() => {
    refetch({ filter: { displayNameCont: debouncedSearchTerm }, page: 1 });
  }, [debouncedSearchTerm]);

  const projectOptions = useMemo(
    () =>
      data?.projects?.nodes.map(({ displayName, id }) => ({
        label: displayName,
        value: id,
      })) || [],
    [data]
  );

  const handleOnMenuScrollToBottom = () =>
    fetchMoreResults({
      currentPage,
      fetchMore,
      pagesCount: data?.projects?.pagesCount,
      searchName,
      setCurrentPage,
    });

  return (
    <Form>
      <SharedModal.Header>
        <SharedModal.Heading>{t('teams.assignProject')}</SharedModal.Heading>
      </SharedModal.Header>
      <SharedModal.Body>
        <SelectList
          controlShouldRenderValue={false}
          inputValue={searchName}
          isLoading={requestInFlight}
          name='projects'
          options={projectOptions}
          placeholder={t('teams.searchByName')}
          showAvatar={false}
          onInputChange={(value, action) => onInputChange(value, action, setSearchName)}
          onMenuScrollToBottom={handleOnMenuScrollToBottom}
        />
      </SharedModal.Body>
      <SharedModal.Footer>
        <SharedModal.Button variant='primary-outlined' onClick={handleClose}>
          {t('common.actions.cancel')}
        </SharedModal.Button>
        <SharedModal.Button
          disabled={isButtonDisabled}
          isLoading={isSubmitting}
          type='submit'
          variant='primary'>
          {t('common.actions.save')}
        </SharedModal.Button>
      </SharedModal.Footer>
    </Form>
  );
};
