import cx from 'classnames';

import { ReactComponent as AssessmentDone } from '@shared/assets/images/illustration-assessment-done.svg';
import { ReactComponent as AssessmentEmpty } from '@shared/assets/images/illustration-assessment-empty.svg';

import styles from './InteractiveDiploma.module.sass';

type Props = { step: number; className: string };

export const InteractiveDiploma = ({ step, className }: Props) => {
  const assessmentDoneClassName = cx(styles.assessmentDone, styles[`step-${step}`]);
  const diplomaWrapperClassName = cx(styles.diplomaWrapper, className);

  return (
    <div className={diplomaWrapperClassName}>
      <AssessmentEmpty className={styles.assessmentEmpty} />
      <AssessmentDone className={assessmentDoneClassName} />
    </div>
  );
};
