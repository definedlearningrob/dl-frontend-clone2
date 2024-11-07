import cx from 'classnames';
import { useTranslation } from 'react-i18next';

import { ReactComponent as BackArrow } from '@dc/svg/back_ui.svg';

import SharedIcon from '@shared/components/Icon/Icon';
import { Tooltip } from '@shared/components/Tooltip';
import { useNavigation } from '@shared/components/Sidebar/useNavigation';

import styles from './ExpandButton.module.sass';

export const ExpandButton = () => {
  const { isExpanded, toggleIsExpanded } = useNavigation();
  const { t } = useTranslation();

  const wrapperClasses = cx(styles.expandButton, {
    [styles.animationOpen]: !isExpanded,
    [styles.animationClose]: isExpanded,
  });
  const iconClasses = cx(styles.icon, {
    [styles.smallIcon]: !isExpanded,
  });
  const textClasses = cx(styles.buttonText, {
    [styles.hidden]: !isExpanded,
  });

  return (
    <>
      <div className={styles.divider} />
      <Tooltip disabled={isExpanded} message={t('sidebar.expandText')} side='right'>
        <div
          className={wrapperClasses}
          data-testid='sidebar-expand-button'
          onClick={() => toggleIsExpanded()}>
          <SharedIcon className={iconClasses} icon={<BackArrow />} size='xs' />
          <span className={textClasses}>{t('sidebar.collapseText')}</span>
        </div>
      </Tooltip>
    </>
  );
};
