import { useToggle } from 'react-use';
import { useTranslation } from 'react-i18next';

import { TOpportunity } from '@dc/graphql/user/queries/opportunities';
import useUserInfo from '@dc/hooks/useUserInfo';
import { TUserInfo } from '@dc/graphql/user/queries/userInfo';
import { OPPORTUNITY_APPLICATION_STATUS } from '@dc/resources/enums';

import SharedAvatar from '@shared/components/Avatar/Avatar';
import { Badge, BadgeType } from '@shared/components/Badge/Badge';
import { cx } from '@shared/utils/cx';
import { useBreakpointUp } from '@shared/hooks/useBreakpointUp';

import { ParticipantContextMenu } from './ParticipantContextMenu';

type Application = TOpportunity['applications']['nodes'][number];

export type Student = Pick<Application['student'], 'fullName' | 'uuid'> & {
  applicationId: string;
  applicationStatus: OPPORTUNITY_APPLICATION_STATUS;
};

type Props = {
  student: Student;
  opportunityName: string;
  onModalOpen: (options: {
    applicationId: string;
    applicationStatus: OPPORTUNITY_APPLICATION_STATUS;
    fullName: string;
  }) => void;
};

const badgeTypeByStatus = {
  [OPPORTUNITY_APPLICATION_STATUS.ACCEPTED]: 'primary',
  [OPPORTUNITY_APPLICATION_STATUS.FINISHED]: 'success',
  [OPPORTUNITY_APPLICATION_STATUS.STARTED]: 'neutral',
  [OPPORTUNITY_APPLICATION_STATUS.PENDING]: 'secondary',
  [OPPORTUNITY_APPLICATION_STATUS.REJECTED]: 'danger',
  [OPPORTUNITY_APPLICATION_STATUS.EXPIRED]: 'default',
} as const;

export const ParticipantListItem = ({ student, onModalOpen, opportunityName }: Props) => {
  const { t } = useTranslation();
  const { userInfo } = useUserInfo<TUserInfo>();
  const [isMenuOpen, toggleMenuOpen] = useToggle(false);
  const isFullHD = useBreakpointUp({ breakpoint: 'xxxl' });
  const isWBLAdmin = userInfo.permissions.wblAdmin;

  return (
    <li
      key={student.uuid}
      className={cx(
        'flex gap-xs items-center py-x px-xs cursor-pointer border-b border-solid border-neutral-300 hover:bg-primary-200 xxxl:py-sm xxxl:px-x last:border-b-0 group',
        { 'bg-primary-200': isMenuOpen }
      )}>
      <SharedAvatar
        avatarClassName={cx('group-hover:!bg-white transition-colors', {
          '!bg-white': isMenuOpen,
        })}
        className='rounded-lg basis-auto border border-solid border-neutral-300'
        label={student.fullName}
        size={isFullHD ? '32' : '24'}
      />
      <p className='flex-1 mb-0 text-neutral-700 text-xxs font-medium leading-lg xxxl:text-xs tracking-[0.01em]'>
        {student.fullName}
      </p>
      <Badge
        className={cx('group-hover:bg-white transition-colors', {
          '!bg-white': isMenuOpen,
        })}
        size={isFullHD ? 'base' : 'small'}
        type={badgeTypeByStatus[student.applicationStatus] as BadgeType}>
        {t(`opportunityDetails.statuses.${student.applicationStatus}`)}
      </Badge>
      {isWBLAdmin && (
        <ParticipantContextMenu
          isOpen={isMenuOpen}
          opportunityName={opportunityName}
          setUpdateStatusModalOpen={onModalOpen}
          student={student}
          toggleOpen={toggleMenuOpen}
        />
      )}
    </li>
  );
};
