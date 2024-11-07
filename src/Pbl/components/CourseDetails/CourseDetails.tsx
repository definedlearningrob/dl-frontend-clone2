import { TCourseData } from '@pbl/graphql/fragments/course';

import CourseDetailsSummaryCard from './CourseDetailsSummaryCard';
import CourseDetailsCardList from './CourseDetailsCardList';
import styles from './CourseDetails.module.sass';

type Props = {
  course: TCourseData;
  isPublic?: boolean;
};

const CourseDetails = ({ course, isPublic }: Props) => {
  const { exploreMoreAvailable, thumbnailUrl, pathwayName, onetData, name } = course;

  return (
    <div className={styles.wrapper}>
      <CourseDetailsSummaryCard
        alternativeNames={onetData?.alsoCalled}
        badge={pathwayName}
        description={onetData?.whatTheyDo}
        exploreMoreAvailable={exploreMoreAvailable}
        imageUrl={thumbnailUrl}
        isPublic={isPublic}
        title={onetData?.title ?? name}
      />
      <CourseDetailsCardList courseData={onetData} isPublic={isPublic} />
    </div>
  );
};

export default CourseDetails;
