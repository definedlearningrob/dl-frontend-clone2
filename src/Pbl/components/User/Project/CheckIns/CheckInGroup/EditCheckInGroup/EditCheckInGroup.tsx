import { useTranslation } from 'react-i18next';

import { TCheckInGroup } from '@pbl/components/Project/types';

import SharedIcon from '@shared/components/Icon/Icon';
import DeprecatedIconButton from '@shared/components/DeprecatedIconButton/DeprecatedIconButton';
import DeprecatedTooltip from '@shared/components/DeprecatedTooltip/DeprecatedTooltip';
import { ReactComponent as InfoIcon } from '@shared/assets/icons/info_outlined.svg';
import { ReactComponent as RemoveIcon } from '@shared/svg/delete_outlined.svg';

import styles from './EditCheckInGroup.module.sass';

type Props = {
  checkInGroup: TCheckInGroup;
  setCheckInGroupIdToArchive: (checkInGroupId: string) => void;
};

const EditCheckInGroup = ({ checkInGroup, setCheckInGroupIdToArchive }: Props) => {
  const { t } = useTranslation();

  return (
    <div className={styles.checkInGroupActions}>
      <DeprecatedTooltip message={t('project.checkIns.checkInGroupInfo')} variant='dark'>
        <SharedIcon className={styles.infoIcon} icon={<InfoIcon />} size='sm' />
      </DeprecatedTooltip>
      <DeprecatedTooltip
        message={t('common.actions.deleteEntity', { name: 'check in group' })}
        variant='dark'>
        <DeprecatedIconButton
          className={styles.removeIcon}
          icon={<RemoveIcon />}
          size='sm'
          square={true}
          variant='danger'
          onClick={() => setCheckInGroupIdToArchive(checkInGroup.id)}
        />
      </DeprecatedTooltip>
    </div>
  );
};

export default EditCheckInGroup;
