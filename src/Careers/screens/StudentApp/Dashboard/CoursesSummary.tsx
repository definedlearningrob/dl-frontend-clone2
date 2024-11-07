import { Trans, useTranslation } from 'react-i18next';
import { match } from 'ts-pattern';
import { useToggle } from 'react-use';
import { useDashboardRecentResourcesQuery } from '@graphql/dc/students/hooks';
import { DashboardRecentResourceTypes } from '@graphql/dc/students/types';

import { ReactComponent as ChevronRightIcon } from '@shared/svg/chevron_right.svg';
import { ReactComponent as CourseIcon } from '@shared/svg/book_opened.svg';
import { ReactComponent as LaptopIcon } from '@shared/svg/laptop.svg';
import Modal from '@shared/components/Modal/Modal';
import { GenericCard } from '@shared/components/GenericCard/GenericCard';
import SkeletonRectangle from '@shared/components/Skeleton/Rectangle/Rectangle';
import { cx } from '@shared/utils/cx';
import Button from '@shared/components/Button/Button';

export const CoursesSummary = () => {
  const { t } = useTranslation();

  const [isModalOpen, toggleIsModalOpen] = useToggle(false);

  const { data, loading } = useDashboardRecentResourcesQuery();

  if (loading) {
    return (
      <div className='h-[22px] flex items-center'>
        <SkeletonRectangle className='!w-1/2' size='full-width' />
      </div>
    );
  }

  if (!data) {
    return (
      <p className='mb-0 text-xxs xxxl:text-xs text-neutral-700'>
        {t('student.dashboard.noCourses')}
      </p>
    );
  }

  const coursesCount = data.dashboardRecentResources.length;

  const dashboardCoursesCount = Math.min(coursesCount || 0, 4);

  const translationKey = match(coursesCount)
    .with(0, () => 'student.dashboard.noCourses')
    .when(
      (value) => 1 <= value && value <= 4,
      () => 'student.dashboard.fewCourses'
    )
    .otherwise(() => 'student.dashboard.moreThanFourCourses');

  const modalClassName = cx('!max-h-[85vh]', {
    'h-[480px] xxxl:h-[690px]': coursesCount <= 8,
    'h-[600px] xxxl:h-[800px]': coursesCount > 9,
  });

  return (
    <>
      <p className='mb-0 text-xxs xxxl:text-xs text-neutral-700'>
        <Trans
          components={{
            mediumText: <span className='font-medium' />,
            modalLink: (
              <Button
                children=''
                className='!text-xxs xxxl:!text-xs !inline-block'
                variant='link'
                onClick={toggleIsModalOpen}
              />
            ),
          }}
          i18nKey={translationKey}
          values={{
            coursesCount: dashboardCoursesCount,
            count: coursesCount,
          }}
        />
      </p>
      {isModalOpen && (
        <Modal className={modalClassName} variant='wide' onDismiss={toggleIsModalOpen}>
          <Modal.Header>
            <Modal.Heading>
              <Trans
                components={{
                  neutralText: <span className='text-neutral-600' />,
                }}
                i18nKey='student.dashboard.allActivities'
                values={{
                  count: coursesCount,
                }}
              />
            </Modal.Heading>
          </Modal.Header>
          <Modal.Body className='!max-h-[80vh] !mb-0 !pe-sm'>
            <div className='bg-neutral-200 rounded-sm'>
              <div className='grid grid-cols-3 xxxl:grid-cols-4 gap-sm !h-fit p-sm'>
                {data.dashboardRecentResources.map((resource, index) => {
                  const { name, thumbnailUrl, resourceType, resourceId, pathways, collection } =
                    resource;

                  const collectionName = collection?.name;

                  const isCourse = resourceType === DashboardRecentResourceTypes.COURSE;

                  const typeIconTooltipMessage = isCourse
                    ? t('student.dashboard.course')
                    : t('student.dashboard.virtualInternship');

                  const linkTo = isCourse
                    ? `/courses/${resourceId}`
                    : `/opportunities/${resourceId}`;

                  const TypeIcon = isCourse ? CourseIcon : LaptopIcon;

                  return (
                    <div key={index} className='h-[168px] xxxl:h-[268px]'>
                      <GenericCard
                        Icon={ChevronRightIcon}
                        TypeIcon={TypeIcon}
                        backgroundUrl={thumbnailUrl}
                        pathways={pathways}
                        subTitle={collectionName}
                        title={name}
                        to={linkTo}
                        typeIconTooltipMessage={typeIconTooltipMessage}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </Modal.Body>
        </Modal>
      )}
    </>
  );
};
