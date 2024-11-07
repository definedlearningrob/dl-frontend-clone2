import cx from 'classnames';
import { useHistory, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { first } from 'lodash-es';

import Card from '@dc/components/Student/Lesson/shared/Card/Card';
import UserStudentSettings from '@dc/components/User/Student/Settings/Settings';
import useUserInfo from '@dc/hooks/useUserInfo';
import { EDUCATIONAL_RESOURCE_TYPES } from '@dc/resources/constants';
import { ReactComponent as AssessmentIcon } from '@dc/svg/test-checkmark-done.svg';
import { ReactComponent as FinalReport } from '@dc/svg/file_document.svg';
import { ReactComponent as MessagesIcon } from '@dc/svg/messages.svg';
import type { TStudent } from '@dc/graphql/user/queries/studentCurrentCoursesPreview';
import { ReactComponent as ExperiencesSummaryIcon } from '@dc/svg/experiencesSummary.svg';

import { ReactComponent as GoalPerformanceIcon } from '@shared/assets/icons/bar_graph.svg';
import { useMessaging } from '@shared/hooks/useMessaging';
import { ReactComponent as ArrowIcon } from '@shared/svg/arrow_forward.svg';
import { StageLabel } from '@shared/components/StageLabel';
import { ReactComponent as InfoIcon } from '@shared/svg/info_outlined.svg';
import { ReactComponent as EyeIcon } from '@shared/svg/visible_outlined.svg';
import { callToast } from '@shared/components/Toaster/Toaster';
import SharedAvatar from '@shared/components/Avatar/Avatar';
import SharedButton from '@shared/components/Button/Button';
import SharedIcon from '@shared/components/Icon/Icon';
import Link from '@shared/components/Link';
import { IconContainer } from '@shared/components/IconContainer/IconContainer';

import './StudentInfo.sass';

type Props = {
  student: TStudent;
};

const linkClassName = cx(
  '!px-sm w-full !justify-between !text-primary-500',
  'hover:bg-primary-200 hover:!no-underline',
  '!rounded-none !border-b-neutral-300 group'
);

const contentClassName = 'w-full !justify-start !gap-base text-primary-500';
const iconClassName = 'text-primary-500 bg-primary-200 rounded-xs group-hover:bg-white';

export const StudentInfo = ({ student }: Props) => {
  const {
    assessmentCompleted,
    firstName,
    lastName,
    schoolClasses,
    settings,
    uuid,
    hasPlans,
    plans,
  } = student;
  const history = useHistory();
  const { messagingState, setMessagingState } = useMessaging();
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const { impersonateStart } = useUserInfo();

  const goToResults = () => {
    history.push(`/students/${id}/assessment-results`);
  };
  const goToReport = () => {
    history.push(`/students/${id}/final-report`);
  };
  const goToMessages = () => {
    history.push(`/students/${id}/messages`);
  };

  const startImpresonate = async () => {
    try {
      await impersonateStart('Student', id);
      history.replace('/');
    } catch (error) {
      callToast('error', t('common.error', { error }));
    }
  };

  const avatarClasses = cx('user-student__info__avatar', {
    '-archived': student.archivedAt,
  });

  const setupMessageModal = () => {
    setMessagingState({
      ...messagingState,
      show: true,
      receiver: { ...student, name: `${student.firstName} ${student.lastName}` },
    });
  };

  const firstPlan = first(plans);

  return (
    <Card className='user-student__info' data-testid='student-info-card'>
      <div className='user-student__info__avatar-wrapper'>
        {student.archivedAt && (
          <div className='user-student__info__archived-icon'>
            <SharedIcon icon={<InfoIcon />} size='sm' />
          </div>
        )}
        <SharedAvatar className={avatarClasses} size='80' user={student} />
        <div className='user-student__info__educational-logo-wrapper'>
          <StageLabel
            resourceType={EDUCATIONAL_RESOURCE_TYPES.STUDENT}
            stage={settings.assessmentType.value}
          />
        </div>
      </div>
      <span className='user-student__info__name' data-testid='student-name'>
        {firstName} {lastName}
      </span>
      <span className='user-student__info__class' data-testid='student-class'>
        {schoolClasses.length > 0 && schoolClasses[0].name}
      </span>
      {!student.assessmentResult && (
        <div
          className='user-student__info__additional-info -no-assesment'
          data-testid='student-no-assesment'>
          {t('user.student.noAssessmentInfo')}
        </div>
      )}
      {student.archivedAt && (
        <div className='user-student__info__additional-info -archived'>
          {t('user.student.info.archived')}
        </div>
      )}
      <div>
        <SharedButton className='w-full mb-base' variant='primary' onClick={setupMessageModal}>
          {t('user.student.info.sendMessage')}
        </SharedButton>
        {assessmentCompleted && (
          <>
            <SharedButton
              Icon={ArrowIcon}
              className={linkClassName}
              contentClassName={contentClassName}
              iconPlacement='end'
              onClick={goToResults}>
              <IconContainer Icon={AssessmentIcon} className={iconClassName} />
              <span>{t('user.student.info.results')}</span>
            </SharedButton>

            <SharedButton
              Icon={ArrowIcon}
              className={linkClassName}
              contentClassName={contentClassName}
              iconPlacement='end'
              onClick={goToReport}>
              <IconContainer Icon={FinalReport} className={iconClassName} />
              {t('user.student.info.report')}
            </SharedButton>
          </>
        )}
        <SharedButton
          Icon={ArrowIcon}
          className={linkClassName}
          contentClassName={contentClassName}
          iconPlacement='end'
          onClick={goToMessages}>
          <IconContainer Icon={MessagesIcon} className={iconClassName} />
          {t('user.student.info.previewMessages')}
        </SharedButton>
        <Link
          Icon={ArrowIcon}
          className={linkClassName}
          contentClassName={contentClassName}
          iconPlacement='end'
          size='md'
          to={`/students/${uuid}/portfolio/experiences`}>
          <IconContainer Icon={ExperiencesSummaryIcon} className={iconClassName} />
          {t('student.navigation.experiencesSummary')}
        </Link>
        {hasPlans && (
          <Link
            Icon={ArrowIcon}
            className={linkClassName}
            contentClassName={contentClassName}
            iconPlacement='end'
            to={`/students/${uuid}/plans`}>
            <IconContainer Icon={FinalReport} className={iconClassName} />
            {t('user.student.info.plans')}
          </Link>
        )}
        <SharedButton
          Icon={ArrowIcon}
          className={linkClassName}
          contentClassName={contentClassName}
          data-testid='student-impersonate-button'
          iconPlacement='end'
          onClick={startImpresonate}>
          <IconContainer
            Icon={EyeIcon}
            className='bg-secondary-200 text-secondary-500 group-hover:bg-white rounded-xs'
          />
          {t('user.student.info.loginAs')}
        </SharedButton>
        <UserStudentSettings
          student={{
            firstName,
            lastName,
            settings,
            uuid,
          }}
        />
        {hasPlans && (
          <Link
            Icon={ArrowIcon}
            className={linkClassName}
            contentClassName={contentClassName}
            iconPlacement='end'
            size='md'
            to={`/reports/student-progress/${firstPlan?.id}/${uuid}`}>
            <IconContainer Icon={GoalPerformanceIcon} className={iconClassName} />
            {t('student.navigation.goalsProgressReport')}
          </Link>
        )}
      </div>
    </Card>
  );
};
