import { useTranslation } from 'react-i18next';

import { TVirtualInternshipLesson } from '@dc/resources/types';

import SharedIcon from '@shared/components/Icon/Icon';
import { ReactComponent as CalendarIcon } from '@shared/assets/icons/calendar.svg';
import { ReactComponent as StarsIcon } from '@shared/svg/stars.svg';

import styles from './VirtualInternshipCardContent.module.sass';

type Props = {
  readinessSkillsLessons: Pick<TVirtualInternshipLesson, 'id'>[];
  roadmapItemsCount: number;
};

export const VirtualInternshipCardContent = ({
  roadmapItemsCount,
  readinessSkillsLessons,
}: Props) => {
  const { t } = useTranslation();

  const skillsValue = readinessSkillsLessons.length;

  return (
    <>
      {roadmapItemsCount > 0 && (
        <span className={styles.metadata}>
          <SharedIcon className={styles.metadataIcon} icon={<CalendarIcon />} size='xs' />
          <span className={styles.metadataLabel}>
            {t('opportunities.roadmap', {
              count: roadmapItemsCount,
            })}
          </span>
        </span>
      )}
      {skillsValue > 0 && (
        <span className={styles.metadata}>
          <SharedIcon className={styles.metadataIcon} icon={<StarsIcon />} size='xs' />
          <span className={styles.metadataLabel}>
            {t('opportunities.relatedSkills', {
              count: skillsValue,
            })}
          </span>
        </span>
      )}
    </>
  );
};
