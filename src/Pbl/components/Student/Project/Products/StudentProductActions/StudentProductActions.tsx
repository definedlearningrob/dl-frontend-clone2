import { useTranslation } from 'react-i18next';

import { ReactComponent as DoneIcon } from '@shared/svg/done.svg';
import SharedIcon from '@shared/components/Icon/Icon';
import DeprecatedTooltip from '@shared/components/DeprecatedTooltip/DeprecatedTooltip';

import styles from './StudentProductActions.module.sass';

type Props = {
  isGraded: boolean;
};

export const StudentProductActions = ({ isGraded }: Props) => {
  const { t } = useTranslation();

  return (
    <>
      {isGraded && (
        <DeprecatedTooltip message={t('user.grading.productGraded')} variant='dark'>
          <div>
            <SharedIcon className={styles.doneIcon} icon={<DoneIcon />} size='md' />
          </div>
        </DeprecatedTooltip>
      )}
    </>
  );
};
