import { useTranslation } from 'react-i18next';

import useCourseActivity from '@dc/hooks/useCourseActivity';
import { ReactComponent as Previous } from '@dc/svg/back_ui.svg';
import { ReactComponent as Next } from '@dc/svg/next_ui.svg';

import Button from '@shared/components/Button/Button';

import './BottomNavigation.sass';

export const BottomNavigation = () => {
  const {
    isCurrentItemFirst,
    isCurrentItemLast,
    selectNextItemToGrade,
    selectPreviousItemToGrade,
  } = useCourseActivity();
  const { t } = useTranslation();

  return (
    <div className='flex justify-between'>
      <Button
        Icon={Previous}
        data-testid='previous-btn'
        disabled={isCurrentItemFirst}
        size='md'
        variant='link'
        onClick={selectPreviousItemToGrade}>
        {t('course.tableOfContent.previous')}
      </Button>
      <Button
        Icon={Next}
        data-testid='next-btn'
        disabled={isCurrentItemLast}
        iconPlacement='end'
        size='md'
        variant='link'
        onClick={selectNextItemToGrade}>
        {t('course.tableOfContent.next')}
      </Button>
    </div>
  );
};
