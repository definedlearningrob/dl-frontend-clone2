import cx from 'classnames';
import { useTranslation } from 'react-i18next';

import { ReactComponent as HighSchoolIcon } from '@dc/svg/HS_icon.svg';
import { ReactComponent as MiddleSchoolIcon } from '@dc/svg/MS_icon.svg';
import { AssessmentType, EducationalSettingTypes } from '@dc/resources/enums';

import { Tooltip } from '@shared/components/Tooltip';
import { EDUCATIONAL_STAGE } from '@shared/resources/enums';
import { IconContainer } from '@shared/components/IconContainer/IconContainer';
import { EDUCATIONAL_SETTINGS_TYPES } from '@shared/components/EntityInfo';

type Props = {
  bottom?: boolean;
  inline?: boolean;
  resourceType?: string;
  stage: EDUCATIONAL_STAGE | AssessmentType | EducationalSettingTypes | string;
};

export const StageLabel = ({ inline, resourceType, stage }: Props) => {
  const { t } = useTranslation();
  const classes = cx({ ['ml-xs grow-0 shrink-0 basis-base']: inline });
  const isHighSchool = stage === EDUCATIONAL_SETTINGS_TYPES.HIGH_SCHOOL;
  const stageTranslationKey = isHighSchool ? 'highSchool' : 'middleSchool';
  const tooltipMessage = t(`${stageTranslationKey}.${resourceType}`);

  return (
    <Tooltip className={classes} message={tooltipMessage}>
      <IconContainer
        Icon={isHighSchool ? HighSchoolIcon : MiddleSchoolIcon}
        className='bg-secondary-500 rounded-full text-white'
        paddingSize='xxs'
        size='sm'
      />
    </Tooltip>
  );
};
