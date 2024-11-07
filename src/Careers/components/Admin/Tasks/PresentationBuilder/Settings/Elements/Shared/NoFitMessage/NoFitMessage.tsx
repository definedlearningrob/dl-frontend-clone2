import cx from 'classnames';
import { useTranslation } from 'react-i18next';

import { ReactComponent as WarningIcon } from '@dc/svg/warning_outlined.svg';

import SharedIcon from '@shared/components/Icon/Icon';

import styles from './NoFitMessage.module.sass';

type Props = {
  visible: boolean;
};

function AdminTasksPresentationBuilderTemplateSharedNoFitMessage({ visible }: Props) {
  const { t } = useTranslation();
  const classes = cx(styles.message, {
    [styles.visible]: visible,
  });

  return (
    <span className={classes}>
      <SharedIcon icon={<WarningIcon />} size='xs' />
      {t('admin.tasks.presentation.noFitMessage')}
    </span>
  );
}

export default AdminTasksPresentationBuilderTemplateSharedNoFitMessage;
