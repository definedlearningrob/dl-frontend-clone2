import { useTranslation } from 'react-i18next';
import { match } from 'ts-pattern';
import { FC, SVGProps } from 'react';

import { TSubmission } from '@dc/graphql/user/queries/studentCourseActivity';

import { ReactComponent as InfoIcon } from '@shared/svg/info_outlined.svg';
import { Kicker } from '@shared/components/Kicker';
import { ReactComponent as NotStartedIcon } from '@shared/svg/not_started_icon.svg';
import { ReactComponent as AcceptedIcon } from '@shared/svg/accepted_icon.svg';
import { ReactComponent as RejectedIcon } from '@shared/svg/rejected_icon.svg';
import { Badge, BadgeType } from '@shared/components/Badge/Badge';

type Props = {
  status: 'not-answered' | 'not-graded' | 'updated' | 'accepted' | 'not-accepted' | 'graded';
  input: TSubmission | null;
  gradedBy?: {
    firstName: string;
    lastName: string;
  };
};

export const GradingStatus = ({ status, gradedBy, input }: Props) => {
  const { t } = useTranslation();

  const pointsCollected = input?.rubricGrade?.pointsScored || 0;
  const pointsAvailable = input?.rubricGrade?.pointsAvailable || 0;

  const showGradedBy = gradedBy && ['accepted', 'not-accepted', 'graded'].includes(status);

  const { Icon, statusText, badgeType } = match(status)
    .returnType<{ Icon?: FC<SVGProps<SVGSVGElement>>; badgeType: BadgeType; statusText: string }>()
    .with('not-graded', () => ({
      Icon: NotStartedIcon,
      statusText: t('user.student.coursesActivity.statuses.needReview'),
      badgeType: 'neutral',
    }))
    .with('updated', () => ({
      Icon: InfoIcon,
      statusText: t('user.student.coursesActivity.statuses.updated'),
      badgeType: 'secondary',
    }))
    .with('accepted', () => ({
      Icon: AcceptedIcon,
      statusText: t('user.student.coursesActivity.statuses.accepted'),
      badgeType: 'success',
    }))
    .with('not-accepted', () => ({
      Icon: RejectedIcon,
      statusText: t('user.student.coursesActivity.statuses.notAccepted'),
      badgeType: 'danger',
    }))
    .with('graded', () => ({
      Icon: AcceptedIcon,
      statusText: t('user.student.coursesActivity.statuses.gradingResult', {
        pointsCollected,
        pointsAvailable,
      }),
      badgeType: 'success',
    }))
    .otherwise(() => ({
      Icon: InfoIcon,
      statusText: t('common.error.unknown'),
      badgeType: 'info',
    }));

  return (
    <div>
      <Kicker className='!mb-xxs'>{t('user.student.coursesActivity.status')}:</Kicker>
      <div className='flex justify-center items-center' data-testid='grading-status'>
        <Badge Icon={Icon} type={badgeType}>
          {statusText}
        </Badge>
        {showGradedBy && (
          <div className='text-font-secondary font-medium leading-lg text-xs ml-xs'>
            {t('user.student.coursesActivity.by', {
              name: `${gradedBy.firstName} ${gradedBy.lastName}`,
            })}
          </div>
        )}
      </div>
    </div>
  );
};
