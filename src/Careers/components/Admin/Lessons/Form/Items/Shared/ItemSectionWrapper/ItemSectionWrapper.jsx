import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import SharedFormDivider from '@dc/shared/FormDivider/FormDivider';
import { PaginationBar } from '@dc/components/Admin/Shared/List/PaginationBar/PaginationBar';
import useLessonItems from '@dc/hooks/useLessonItems';
import { ReactComponent as ClearIcon } from '@dc/svg/clear.svg';

import SharedButton from '@shared/components/Button/Button';
import { IconButton } from '@shared/components/IconButton/IconButton';

AdminLessonsFormItemsSharedItemSectionWrapper.propTypes = {
  children: PropTypes.object,
  filterField: PropTypes.shape({
    field: PropTypes.string,
    label: PropTypes.string,
  }),
  onClose: PropTypes.func,
  pagingProps: PropTypes.object,
  SearchBar: PropTypes.func,
  title: PropTypes.string,
};

function AdminLessonsFormItemsSharedItemSectionWrapper({
  children,
  filterField,
  onClose,
  pagingProps,
  SearchBar,
  title,
}) {
  const { openForm, formVisible } = useLessonItems();
  const { t } = useTranslation();

  return (
    <div>
      <SharedFormDivider />
      <header className='flex items-center justify-between mb-sm'>
        <h5 className='mb-0'>{title}</h5>
        <div className='flex items-center gap-xs'>
          <SearchBar
            field={filterField.field}
            placeholder={t('common.placeholders.searchBy', {
              field: filterField.label,
            })}
          />
          <IconButton Icon={ClearIcon} data-testid='section-close' size='lg' onClick={onClose} />
        </div>
      </header>
      {children}
      {!formVisible && (
        <>
          <PaginationBar pagingProps={pagingProps} />
          <SharedButton
            className='lessons__items-new-button'
            data-testid='lesson-item-new'
            size='md'
            variant='success'
            onClick={openForm}>
            {t('common.actions.add')}
          </SharedButton>
        </>
      )}
    </div>
  );
}

export default AdminLessonsFormItemsSharedItemSectionWrapper;
