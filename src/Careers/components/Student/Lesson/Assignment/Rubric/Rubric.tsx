import cx from 'classnames';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { isEmpty } from 'lodash-es';
import { useToggle } from 'react-use';

import { TAssignment } from '@dc/components/Student/Lesson/types';

import SharedIcon from '@shared/components/Icon/Icon';
import { ReactComponent as ChevronRightIcon } from '@shared/svg/chevron_right.svg';
import { ReactComponent as Table } from '@shared/svg/table.svg';
import SharedButton from '@shared/components/Button/Button';
import { RubricProvider } from '@shared/components/Rubrics/RubricProvider';
import { RUBRIC_TYPE } from '@shared/components/Rubrics/utils/enums';
import { RubricsViewer } from '@shared/components/Rubrics/RubricsViewer';
import { prepareTableData } from '@shared/components/Rubrics/utils/prepareTableData';
import { defaultRubricData } from '@shared/components/Rubrics/utils/defaultRubricData';

import styles from './Rubric.module.sass';

type Props = {
  assignment: Pick<TAssignment, 'id' | 'displayName' | 'rubrics'>;
};

export const LessonAssignmentRubric = ({ assignment }: Props) => {
  const [isActive, toggleIsActive] = useToggle(false);
  const { t } = useTranslation();

  const rubricClasses = {
    icon: cx(styles.dropdownIcon, { [styles.activeDropdownIcon]: isActive }),
    content: cx(styles.rubricContent, { [styles.expandedRubricContent]: isActive }),
  };

  const rubric = useMemo(() => {
    if (isEmpty(assignment.rubrics)) {
      return {
        name: assignment.displayName,
        id: assignment.id,
        criteriaLabels: defaultRubricData.criteriaLabels,
        criterias: defaultRubricData.criterias.map((criterion) => ({
          ...criterion,
          text: t(criterion.text),
        })),
        headings: defaultRubricData.headings.map((heading) => ({
          ...heading,
          name: t(heading.name),
        })),
      };
    }

    return assignment.rubrics[0];
  }, [assignment]);

  return (
    <div>
      <SharedButton className={styles.rubricButton} variant='link' onClick={toggleIsActive}>
        <SharedIcon icon={<Table />} size='sm' />
        <p className={styles.rubricButtonText}>{t('rubric.heading')}</p>
        <SharedIcon className={rubricClasses.icon} icon={<ChevronRightIcon />} size='sm' />
      </SharedButton>
      <div className={rubricClasses.content}>
        <RubricProvider rubric={prepareTableData(rubric)} type={RUBRIC_TYPE.VIEWER}>
          <RubricsViewer />
        </RubricProvider>
      </div>
    </div>
  );
};
