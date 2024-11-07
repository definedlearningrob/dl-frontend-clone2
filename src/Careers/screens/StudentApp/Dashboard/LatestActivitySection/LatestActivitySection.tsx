import { useDashboardRecentResourcesQuery } from '@graphql/dc/students/hooks';
import { cloneDeep, isEmpty, times } from 'lodash-es';
import { DashboardRecentResourceTypes } from '@graphql/dc/students/types';
import { useTranslation } from 'react-i18next';

import { NoActivities } from '@dc/screens/StudentApp/Dashboard/LatestActivitySection/NoActivities';
import { AddNewActivityCard } from '@dc/screens/StudentApp/Dashboard/LatestActivitySection/AddNewActivityCard';

import { ReactComponent as ChevronRightIcon } from '@shared/svg/chevron_right.svg';
import { ReactComponent as CourseIcon } from '@shared/svg/book_opened.svg';
import { ReactComponent as LaptopIcon } from '@shared/svg/laptop.svg';
import SkeletonRectangle from '@shared/components/Skeleton/Rectangle/Rectangle';
import { GenericCard } from '@shared/components/GenericCard/GenericCard';
import { cx } from '@shared/utils/cx';

const MAX_CARD_COUNT = 4;

export const LatestActivitySection = () => {
  const { t } = useTranslation();

  const { data, loading } = useDashboardRecentResourcesQuery();

  if (loading) {
    return (
      <div className='grid grid-cols-2 gap-sm xxxl:gap-base h-full'>
        {times(4, (index) => (
          <SkeletonRectangle key={index} className='min-h-0' radius='sm' size='full-width' />
        ))}
      </div>
    );
  }

  if (!data || isEmpty(data.dashboardRecentResources)) {
    return <NoActivities />;
  }

  const activities = cloneDeep(data.dashboardRecentResources).splice(0, MAX_CARD_COUNT);

  const activitiesLength = activities.length;

  return (
    <div className='grid grid-cols-2 h-full gap-sm xxxl:gap-base auto-rows-fr'>
      {activities.map((resource, index) => {
        const { name, imageUrl, resourceType, resourceId, pathways, collection } = resource;

        const collectionName = collection?.name;

        const isCourse = resourceType === DashboardRecentResourceTypes.COURSE;

        const typeIconTooltipMessage = isCourse
          ? t('student.dashboard.course')
          : t('student.dashboard.virtualInternship');

        const linkTo = isCourse ? `/courses/${resourceId}` : `/opportunities/${resourceId}`;

        const TypeIcon = isCourse ? CourseIcon : LaptopIcon;

        const cardWrapperClassName = cx('min-h-0', {
          'col-span-2': index === 0 && activitiesLength < 3,
        });

        return (
          <div key={index} className={cardWrapperClassName}>
            <GenericCard
              Icon={ChevronRightIcon}
              TypeIcon={TypeIcon}
              backgroundUrl={imageUrl}
              pathways={pathways}
              subTitle={collectionName}
              title={name}
              to={linkTo}
              typeIconTooltipMessage={typeIconTooltipMessage}
            />
          </div>
        );
      })}
      {activitiesLength < MAX_CARD_COUNT && (
        <AddNewActivityCard spanToTwoColumns={activitiesLength === 1} />
      )}
    </div>
  );
};
