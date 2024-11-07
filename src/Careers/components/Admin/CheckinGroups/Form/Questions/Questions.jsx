import PropTypes from 'prop-types';
import { useField } from 'formik';
import { useTranslation } from 'react-i18next';

import { PaginationBar } from '@dc/components/Admin/Shared/List/PaginationBar/PaginationBar';
import { SortableAvailableList } from '@dc/components/Admin/Shared/SortableAvailableList/SortableAvailableList';
import { SortableSelectedList } from '@dc/components/Admin/Shared/SortableSelectedList/SortableSelectedList';

import SharedPaginatedLoader from '@shared/components/PaginatedLoader/PaginatedLoader';
import SharedLoadingSpinner from '@shared/components/LoadingSpinner/LoadingSpinner';
import Card from '@shared/components/Card/Card';
import { ListWrapper } from '@shared/components/SelectableList/ListWrapper/ListWrapper';
import { ReactComponent as CheckinIcon } from '@shared/svg/question.svg';

AdminCheckinGroupsQuestions.propTypes = {
  pagingProps: PropTypes.object,
  SearchBar: PropTypes.func,
};

function AdminCheckinGroupsQuestions({ pagingProps, SearchBar }) {
  const { t } = useTranslation();
  const [checkInQuestionsInput] = useField('checkInQuestions');
  const sortedByStep = checkInQuestionsInput.value
    .slice()
    .sort((a, b) => parseInt(a.step) - parseInt(b.step));

  const parseQuestions = (questions) =>
    questions.map((question) => ({
      ...question,
      name: question.question,
    }));

  const handleEditClick = (question) => {
    window.open(`/admin/check-ins/${question.id}/edit`, '_blank', 'noreferrer');
  };

  return (
    <Card>
      <h4>{t('admin.checkInQuestions.label')}</h4>
      <div className='flex gap-base'>
        <ListWrapper
          actions={
            <SearchBar
              field='question'
              placeholder={t('common.placeholders.searchBy', {
                field: t('common.fields.checkins.question').toLowerCase(),
              })}
            />
          }
          title={t('admin.checkInQuestions.allCheckinQuestions')}>
          <div className='min-h-0 flex-1'>
            <SharedPaginatedLoader.Content
              SpinnerComponent={<SharedLoadingSpinner className='sortable-list-spinner' />}
              {...pagingProps}>
              {({ checkInQuestions }) => (
                <SortableAvailableList
                  ListItemIcon={CheckinIcon}
                  field='checkInQuestions'
                  items={parseQuestions(checkInQuestions.nodes)}
                  onEditClick={handleEditClick}
                />
              )}
            </SharedPaginatedLoader.Content>
          </div>
          <PaginationBar pagingProps={pagingProps} />
        </ListWrapper>
        <ListWrapper title={`${t('common.statuses.selected')} (${sortedByStep.length})`}>
          <SortableSelectedList
            ListItemIcon={CheckinIcon}
            field='checkInQuestions'
            items={parseQuestions(sortedByStep)}
            onEditClick={handleEditClick}
          />
        </ListWrapper>
      </div>
    </Card>
  );
}

export default AdminCheckinGroupsQuestions;
