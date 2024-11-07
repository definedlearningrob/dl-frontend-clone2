import { useTranslation } from 'react-i18next';
import cx from 'classnames';

import { useCheckIns } from '@pbl/components/Project/helpers/CheckInContext';

import { CourseStatusGraph } from '@shared/components/CheckIns/CourseStatus/CourseStatusGraph/CourseStatusGraph';
import SharedIcon from '@shared/components/Icon/Icon';
import { ReactComponent as AcceptedIcon } from '@shared/assets/icons/accepted_icon.svg';
import { ReactComponent as NotStartedIcon } from '@shared/assets/icons/not_started_icon.svg';
import { ReactComponent as RejectedIcon } from '@shared/assets/icons/rejected_icon.svg';
import { ReactComponent as SubmittedIcon } from '@shared/assets/icons/submitted_icon.svg';
import { TCheckInQuestion } from '@shared/components/CheckIns/types';
import { useDetectApplicationType } from '@shared/hooks/useDetectApplicationType';

import styles from './CourseStatus.module.sass';

type Props = {
  allQuestions: TCheckInQuestion[];
};

export const CourseStatus = ({ allQuestions }: Props) => {
  const { t } = useTranslation();
  const { isPblApp } = useDetectApplicationType();
  const { team } = useCheckIns();
  const headingStatus = isPblApp
    ? t('components.checkIns.projectStatus')
    : t('components.checkIns.courseStatus');

  return (
    <div className={styles.statusWrapper}>
      <div className={styles.statusTop}>
        <div className={styles.heading}>
          <h5 className={styles.headingStatus}>{headingStatus}</h5>
          <p className={styles.headingHint}>{t('components.checkIns.courseStatusHint')}</p>
        </div>
        <div className={styles.statusLegend}>
          <SharedIcon
            className={cx(styles.statusLegendIcon, styles.notStarted)}
            icon={<NotStartedIcon />}
            placeholder={t(`components.checkIns.statuses.NOT_STARTED`)}
            size='xxs'
          />
          <SharedIcon
            className={cx(styles.statusLegendIcon, styles.submitted)}
            icon={<SubmittedIcon />}
            placeholder={t('components.checkIns.statuses.SUBMITTED')}
            size='xxs'
          />
          <SharedIcon
            className={styles.statusLegendIcon}
            icon={<AcceptedIcon />}
            placeholder={t('components.checkIns.statuses.ACCEPTED')}
            size='xxs'
          />
          <SharedIcon
            className={styles.statusLegendIcon}
            icon={<RejectedIcon />}
            placeholder={t('components.checkIns.statuses.NOT_ACCEPTED')}
            size='xxs'
          />
        </div>
      </div>
      <div className={styles.statusBottom}>
        {allQuestions.map((question, index) => (
          <CourseStatusGraph
            key={question.id}
            answer={team ? question.teamSubmission : question.answer}
            index={index}
            questionId={question.id}
            questionsLength={allQuestions.length}
          />
        ))}
      </div>
    </div>
  );
};
