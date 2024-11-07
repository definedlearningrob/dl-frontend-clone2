import { useTranslation } from 'react-i18next';

import {
  institutionSizeDescriptionMap,
  institutionSizeTypeMap,
  TInstitutionSizeDescription,
  TInstitutionSizeType,
} from '@dc/resources/types';
import styles from '@dc/shared/InstitutionCard/InstitutionCard.module.sass';

import SharedIcon from '@shared/components/Icon/Icon';
import { ReactComponent as BuildingIcon } from '@shared/svg/building.svg';
import { Tooltip } from '@shared/components/Tooltip';

type Props = {
  sizeType: TInstitutionSizeType | null;
  sizeDescription: TInstitutionSizeDescription | null;
};

export const InstitutionSize = ({ sizeType, sizeDescription }: Props) => {
  const { t } = useTranslation();

  const sizeDescriptionText = sizeDescription
    ? institutionSizeDescriptionMap[sizeDescription]
    : t('postSecondary.institution.notAvailableShort');

  const sizeTypeText = sizeType
    ? institutionSizeTypeMap[sizeType]
    : t('postSecondary.institution.notAvailableShort');

  const institutionSize = sizeType ? (
    <span>
      {sizeTypeText} <span className={styles.sizeCount}>({sizeDescriptionText})</span>
    </span>
  ) : (
    t('postSecondary.institution.notAvailableShort')
  );

  return (
    <Tooltip delayDuration={400} message={t('postSecondary.institution.sizeTooltip')}>
      <span className={styles.metadata}>
        <SharedIcon className={styles.metadataIcon} icon={<BuildingIcon />} size='xs' />
        <div className={styles.singleLineWrapper}>
          <span className={styles.metadataLabel}>
            {t('student.institutionSearch.filters.size')}:
          </span>
          {institutionSize}
        </div>
      </span>
    </Tooltip>
  );
};
