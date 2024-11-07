import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { isEmpty } from 'lodash-es';

import SharedMainContent from '@dc/shared/MainContent/MainContent';
import { ApplicantFormList } from '@dc/components/User/CommonAppRequests/ApplicantFormList';
import { FormListSkeleton } from '@dc/components/User/CommonAppRequests/FormListSkeleton';
import { OtherStudentApplicationsSkeleton } from '@dc/components/User/CommonAppRequests/OtherStudentApplicationsSkeleton';
import { ReactComponent as NewMessageIcon } from '@dc/svg/comment_text_outlined.svg';
import { StudentsApplication } from '@dc/components/User/CommonAppRequests/ApplicantFormList/OtherStudentsApplication';
import { useRecommendationRequestQuery } from '@dc/graphql/user/hooks/useRecommendationRequestQuery';
import { useStudentApplicationsQuery } from '@dc/graphql/user/hooks/useStudentApplicationsQuery';

import SharedCard from '@shared/components/Card/Card';
import SharedIcon from '@shared/components/Icon/Icon';
import { useNavigation } from '@shared/components/Sidebar/useNavigation';

import styles from './ApplicantFormListScreen.module.sass';

export const ApplicantFormListScreen = () => {
  const { t } = useTranslation();
  const { studentUuid } = useParams<{ studentUuid: string }>();
  const { setBackNavButton } = useNavigation();
  const { data: recommendationRequestData, loading: recommendationRequestLoading } =
    useRecommendationRequestQuery({ studentUuid });
  const { data: studentApplicationsData, loading: studentApplicationsLoading } =
    useStudentApplicationsQuery({ studentUuid });
  const showSkeleton =
    recommendationRequestLoading ||
    !recommendationRequestData ||
    studentApplicationsLoading ||
    !studentApplicationsData;

  useEffect(() => {
    setBackNavButton(true);

    return () => setBackNavButton(false);
  }, []);

  if (showSkeleton) {
    return (
      <SharedMainContent className='flex gap-md'>
        <SharedCard className='w-2/3 xxxl:w-3/4 h-full flex flex-col'>
          <FormListSkeleton />
        </SharedCard>
        <SharedCard className='w-1/3 xxxl:w-1/4 h-full flex flex-col'>
          <OtherStudentApplicationsSkeleton />
        </SharedCard>
      </SharedMainContent>
    );
  }

  const {
    recommendationRequest: { applicant, forms },
  } = recommendationRequestData;
  const { studentApplications } = studentApplicationsData;

  return (
    <SharedMainContent className={styles.container}>
      <SharedCard className='w-2/3 xxxl:w-3/4 h-full flex flex-col' withoutPadding={true}>
        <SharedCard.Header className='mb-sm xxxl:mb-md' withPadding={true}>
          <div>
            <h4 className='text-base mb-sm'>
              {t('user.postSecondary.commonAppRequests.applicationFormList.heading', {
                studentFullName: `${applicant.firstName} ${applicant.lastName}`,
              })}
            </h4>
            <div className={styles.cardSubtitle}>
              <SharedIcon icon={<NewMessageIcon />} size='xs' />
              <span className='text-sm'>{applicant.email}</span>
            </div>
          </div>
        </SharedCard.Header>
        <SharedCard.Body className='min-h-0'>
          <ApplicantFormList forms={forms} />
        </SharedCard.Body>
      </SharedCard>
      <SharedCard
        className='w-1/3 xxxl:w-1/4 h-full flex flex-col items-start gap-base xxxl:gap-md p-md'
        withoutPadding={true}>
        <SharedCard.Header withPadding={true}>
          <h4 className='text-sm xxxl:text-base mb-0'>
            {t('user.postSecondary.commonAppRequests.applicationFormList.otherStudentApplications')}
          </h4>
        </SharedCard.Header>
        <SharedCard.Body className='overflow-auto px-md gap-sm pb-base w-full xxxl:pb-md'>
          {studentApplications
            .filter(({ forms }) => !isEmpty(forms))
            .map((studentApplication) => (
              <StudentsApplication
                key={studentApplication.institution.id}
                studentApplication={studentApplication}
              />
            ))}
        </SharedCard.Body>
      </SharedCard>
    </SharedMainContent>
  );
};
