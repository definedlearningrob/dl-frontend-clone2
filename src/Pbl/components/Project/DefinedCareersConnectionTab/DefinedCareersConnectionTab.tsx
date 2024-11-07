import { useTranslation } from 'react-i18next';
import { useHistory, useLocation, useParams } from 'react-router-dom';

import { PROJECT_USER_TYPES } from '@pbl/resources/enums';

import Card from '@shared/components/Card/Card';
import CourseCard from '@shared/components/CourseCard';
import { ReactComponent as ArrowIcon } from '@shared/svg/arrow_forward.svg';
import useQueryParams from '@shared/hooks/useQueryParams';

import { TDefinedCareer } from '../types';

import styles from './DefinedCareersConnectionTab.module.sass';

type Props = {
  courses: TDefinedCareer[];
  type: PROJECT_USER_TYPES;
};

const DefinedCareersConnectionTab = ({ courses, type }: Props) => {
  const history = useHistory();
  const {
    params: { code },
  } = useQueryParams<{ code?: string }>();
  const { projectId } = useParams<{ projectId: string }>();
  const { pathname } = useLocation();
  const { t } = useTranslation();

  const goToCourseDetails = (courseId: string) => {
    history.push({
      pathname:
        type === PROJECT_USER_TYPES.PUBLIC
          ? `/shared/student/projects/${projectId}/courses/${courseId}`
          : `/projects/${projectId}/courses/${courseId}`,
      search: code && `?code=${code}`,
      state: {
        projectPathname: pathname,
      },
    });
  };

  return (
    <Card>
      <Card.Header>
        <Card.Title size='medium'>{t('project.definedCareersConnections')}</Card.Title>
      </Card.Header>
      <Card.Body>
        <p className={styles.definedCareerInfo}>{t('project.definedCareersInfo')}</p>
        <div className={styles.cardsWrapper}>
          {courses.map((course) => (
            <CourseCard
              key={course.id}
              backgroundUrl={course.thumbnailUrl}
              buttonIcon={ArrowIcon}
              buttonLabel={t('project.viewDetails')}
              category={course.pathwayName}
              isMiddleSchool={course.type}
              title={course.name}
              onClick={() => goToCourseDetails(course.id)}
            />
          ))}
        </div>
      </Card.Body>
    </Card>
  );
};

export default DefinedCareersConnectionTab;
