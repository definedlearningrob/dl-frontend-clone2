import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { PaginationBar } from '@dc/components/Admin/Shared/List/PaginationBar/PaginationBar';
import { SortableAvailableList } from '@dc/components/Admin/Shared/SortableAvailableList/SortableAvailableList';

import { ReactComponent as QuestionIcon } from '@shared/svg/question.svg';
import SharedPaginatedLoader from '@shared/components/PaginatedLoader/PaginatedLoader';
import SharedLoadingSpinner from '@shared/components/LoadingSpinner/LoadingSpinner';
import { ListWrapper } from '@shared/components/SelectableList/ListWrapper/ListWrapper';

AdminLessonFormCheckins.propTypes = {
  onEditClick: PropTypes.func,
  pagingProps: PropTypes.object,
  SearchBar: PropTypes.func,
};

function AdminLessonFormCheckins({ pagingProps, SearchBar, onEditClick }) {
  const { t } = useTranslation();

  const parseQuestions = (questions) =>
    questions.map((question) => ({
      ...question,
      name: question.question,
    }));

  return (
    <ListWrapper
      actions={
        <SearchBar
          field='question'
          placeholder={t('common.placeholders.searchBy', {
            field: t('common.fields.checkins.question').toLowerCase(),
          })}
        />
      }
      title={t('admin.lessons.checkins.checkInQuestions')}>
      <div className='min-h-0 flex-1'>
        <SharedPaginatedLoader.Content
          SpinnerComponent={<SharedLoadingSpinner className='sortable-list-spinner' />}
          {...pagingProps}>
          {({ checkInQuestions }) => (
            <SortableAvailableList
              ListItemIcon={QuestionIcon}
              field='checkins'
              items={parseQuestions(checkInQuestions.nodes)}
              narrowedTypename='CheckInQuestion'
              onEditClick={onEditClick}
            />
          )}
        </SharedPaginatedLoader.Content>
      </div>
      <PaginationBar pagingProps={pagingProps} />
    </ListWrapper>
  );
}

export default AdminLessonFormCheckins;
