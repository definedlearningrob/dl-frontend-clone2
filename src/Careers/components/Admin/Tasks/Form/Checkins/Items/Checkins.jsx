import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { PaginationBar } from '@dc/components/Admin/Shared/List/PaginationBar/PaginationBar';
import { SortableAvailableList } from '@dc/components/Admin/Shared/SortableAvailableList/SortableAvailableList';

import SharedPaginatedLoader from '@shared/components/PaginatedLoader/PaginatedLoader';
import SharedLoadingSpinner from '@shared/components/LoadingSpinner/LoadingSpinner';
import { ListWrapper } from '@shared/components/SelectableList/ListWrapper/ListWrapper';
import { ReactComponent as CheckinIcon } from '@shared/svg/question.svg';

export const Checkins = ({ pagingProps, SearchBar, onEditClick }) => {
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
      <SharedPaginatedLoader.Content
        SpinnerComponent={<SharedLoadingSpinner className='sortable-list-spinner' />}
        {...pagingProps}>
        {({ checkInQuestions }) => (
          <SortableAvailableList
            ListItemIcon={CheckinIcon}
            field='checkins'
            items={parseQuestions(checkInQuestions.nodes)}
            narrowedTypename='CheckInQuestion'
            onEditClick={onEditClick}
          />
        )}
      </SharedPaginatedLoader.Content>
      <PaginationBar pagingProps={pagingProps} />
    </ListWrapper>
  );
};

Checkins.propTypes = {
  onEditClick: PropTypes.func,
  pagingProps: PropTypes.object,
  SearchBar: PropTypes.func,
};
