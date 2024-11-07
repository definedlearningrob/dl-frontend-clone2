import { useTranslation } from 'react-i18next';

import { StudentApplication } from '@dc/graphql/user/queries/studentApplications';
import { APPLICATION_FORM_TYPE, COMMON_APP_FORM_STATUS } from '@dc/resources/enums';

import { ReactComponent as BuildingIcon } from '@shared/svg/building.svg';
import SharedIcon from '@shared/components/Icon/Icon';
import { IconContainer } from '@shared/components/IconContainer/IconContainer';
import { ReactComponent as NotStartedIcon } from '@shared/assets/icons/not_started_icon.svg';
import { ReactComponent as InProgressIcon } from '@shared/assets/icons/submitted_icon.svg';
import { ReactComponent as CompletedIcon } from '@shared/assets/icons/checkmark_circle_outlined.svg';
import { ReactComponent as SubmittedIcon } from '@shared/assets/icons/checkmark_circle_outlined.svg';
import { Tooltip } from '@shared/components/Tooltip';

import styles from './StudentsApplication.module.sass';

type Props = {
  studentApplication: StudentApplication;
};

export const StudentsApplication = ({ studentApplication }: Props) => {
  const { t } = useTranslation();

  const statusesConfigMap = {
    [COMMON_APP_FORM_STATUS.NOT_STARTED]: {
      Icon: NotStartedIcon,
      className: 'bg-neutral-200 rounded-xs color text-neutral-700',
      label: t('user.postSecondary.commonAppRequests.applicationFormList.formValues.notStarted'),
    },
    [COMMON_APP_FORM_STATUS.IN_PROGRESS]: {
      Icon: InProgressIcon,
      className: 'bg-secondary-200 rounded-xs color text-secondary-500',
      label: t('user.postSecondary.commonAppRequests.applicationFormList.formValues.inProgress'),
    },
    [COMMON_APP_FORM_STATUS.COMPLETED]: {
      Icon: CompletedIcon,
      className: 'bg-primary-200 rounded-xs color text-primary-500',
      label: t('user.postSecondary.commonAppRequests.applicationFormList.formValues.readyToSend'),
    },
    [COMMON_APP_FORM_STATUS.SUBMITTED]: {
      Icon: SubmittedIcon,
      className: 'bg-success-100 rounded-xs color text-success-500',
      label: t('user.postSecondary.commonAppRequests.applicationFormList.formValues.submitted'),
    },
    [COMMON_APP_FORM_STATUS.DOWNLOADED]: {
      Icon: SubmittedIcon,
      className: 'bg-success-100 rounded-xs color text-success-500',
      label: t('user.postSecondary.commonAppRequests.applicationFormList.formValues.submitted'),
    },
  } as const;

  return (
    <div className='flex flex-col items-start'>
      <div className='flex text-primary-500 text-xs font-medium gap-xs items-center mb-xs xxxl:text-sm leading-lg'>
        <SharedIcon className={styles.institutionIcon} icon={<BuildingIcon />} size='xs' />
        {studentApplication.institution.name}
      </div>
      <ul className='pl-base list-none gap-xs flex flex-col items-start'>
        {studentApplication.forms.map(({ formType, status }, index) => {
          const formConfig = statusesConfigMap[status];

          return (
            <li key={index} className='flex items-center gap-xs'>
              <Tooltip message={formConfig.label}>
                <IconContainer
                  Icon={formConfig.Icon}
                  className={formConfig.className}
                  paddingSize='xxs'
                  size='sm'
                />
              </Tooltip>
              <span className='text-xs text-neutral-700 font-regular leading-base'>
                {APPLICATION_FORM_TYPE[formType]}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
