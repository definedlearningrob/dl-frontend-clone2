import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { ReactComponent as ZoomMoneyIcon } from '@pbl/svg/zoom_money.svg';
import { ReactComponent as MatchIcon } from '@pbl/svg/match.svg';
import { ReactComponent as ListSearchIcon } from '@pbl/svg/test-list-search.svg';
import { ReactComponent as EmptyDetailsCards } from '@pbl/images/empty_cards.svg';
import type { TCourseOnetData } from '@pbl/graphql/fragments/course';

import { ReactComponent as EducationIcon } from '@shared/svg/education_outlined.svg';
import { ReactComponent as BookOpenedIcon } from '@shared/svg/book_opened.svg';
import { ReactComponent as SettingsIcon } from '@shared/svg/settings_outlined.svg';
import { ReactComponent as UserIcon } from '@shared/svg/user_outlined.svg';
import { ReactComponent as ChartIcon } from '@shared/svg/chart_bar_2.svg';

import CourseDetailsCard from '../CourseDetailsCard/CourseDetailsCard';
import ExploreMoreCard from '../ExploreMoreCard';

import styles from './CourseDetailsCardList.module.sass';

type Props = {
  courseData: TCourseOnetData | null;
  isPublic?: boolean;
};

const CourseDetailsCardList = ({ courseData, isPublic }: Props) => {
  const { t } = useTranslation();

  const cardsConfig = useMemo(() => {
    if (!courseData) {
      return null;
    }

    return [
      {
        title: t('courseDetails.education'),
        icon: EducationIcon,
        data: courseData.education,
        variant: 'list' as const,
      },
      {
        title: t('courseDetails.jobOutlook'),
        icon: ZoomMoneyIcon,
        data: courseData.jobOutlook,
        variant: 'jobOutlook' as const,
      },
      {
        title: t('courseDetails.onTheJobYouWould'),
        icon: ListSearchIcon,
        data: courseData.onTheJob,
        variant: 'list' as const,
      },
      {
        title: t('courseDetails.abilities'),
        icon: MatchIcon,
        data: courseData.abilities,
        variant: 'listWithTitle' as const,
      },
      {
        title: t('courseDetails.knowledge'),
        icon: BookOpenedIcon,
        data: courseData.knowledge,
        variant: 'listWithTitle' as const,
      },
      {
        title: t('courseDetails.technology'),
        icon: SettingsIcon,
        data: courseData.technology,
        variant: 'listWithTitle' as const,
        introduction: t('courseDetails.technologyIntroduction'),
      },
      {
        title: t('courseDetails.personality'),
        icon: UserIcon,
        data: courseData.personality
          ? {
              title: t('courseDetails.personalityListTitle'),
              elements: courseData.personality.elements,
            }
          : null,
        variant: 'listWithTitle' as const,
        introduction: courseData.personality?.title,
      },
      {
        title: t('courseDetails.skills'),
        icon: ChartIcon,
        data: courseData.skills,
        variant: 'listWithTitle' as const,
      },
    ];
  }, [t]);

  if (!cardsConfig) {
    return (
      <div className={styles.emptyDetailsWrapper}>
        <EmptyDetailsCards className={styles.emptyDetailsImage} />
        <h6 className={styles.emptyDetailsTitle}>{t('courseDetails.emptyDetails')}</h6>
        <p>{t('courseDetails.noInformationAboutCourse')}</p>
      </div>
    );
  }

  return (
    <>
      <div className={styles.cardsWrapper}>
        {cardsConfig.map(({ title, icon: Icon, ...contentProps }) => (
          <CourseDetailsCard
            key={title}
            contentProps={contentProps}
            icon={<Icon />}
            title={title}
          />
        ))}
      </div>
      <ExploreMoreCard alignedCourses={courseData!.alignedCourses} isPublic={isPublic} />
    </>
  );
};

export default CourseDetailsCardList;
