import { useTranslation } from 'react-i18next';

import { ReactComponent as AdminIcon } from '@shared/svg/admin.svg';
import { Tooltip } from '@shared/components/Tooltip';
import { IconContainer } from '@shared/components/IconContainer/IconContainer';

type Props = {
  isAssignedByOtherTeacher: boolean;
};

export const AssignByOtherTeacher = ({ isAssignedByOtherTeacher }: Props) => {
  const { t } = useTranslation();

  if (!isAssignedByOtherTeacher) return null;

  return (
    <Tooltip message={t('user.myProjects.otherTeacherTooltip')}>
      <IconContainer
        Icon={AdminIcon}
        className='bg-secondary-200 text-secondary-500 rounded-full'
        paddingSize='xxs'
        size='sm'
      />
    </Tooltip>
  );
};
