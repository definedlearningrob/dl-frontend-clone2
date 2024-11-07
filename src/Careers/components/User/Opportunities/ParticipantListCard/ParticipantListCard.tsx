import { isEmpty, uniqBy } from 'lodash-es';
import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { OPPORTUNITY_APPLICATION_STATUS } from '@dc/resources/enums';
import { ReactComponent as EmptyParticipantsIcon } from '@dc/svg/empty_opportunity_participants.svg';
import { useOpportunityQuery } from '@dc/graphql/user/hooks/useOpportunityQuery';
import { UpdateStatusModal } from '@dc/components/User/Opportunities/ParticipantListCard/UpdateStatusModal';

import SharedCard from '@shared/components/Card/Card';
import { Kicker } from '@shared/components/Kicker';
import { useBreakpointUp } from '@shared/hooks/useBreakpointUp';
import EmptyState from '@shared/components/EmptyState/EmptyState';

import { ParticipantListSkeleton } from './ParticipantListSkeleton';
import { ParticipantListItem, Student } from './ParticipantListItem';

type ModalProps = {
  applicationId: string;
  applicationStatus: OPPORTUNITY_APPLICATION_STATUS;
  fullName: string;
};

export const ParticipantListCard = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const { data, loading } = useOpportunityQuery({ id });
  const isFullHD = useBreakpointUp({ breakpoint: 'xxxl' });
  const [modalOptions, setModalOptions] = useState<ModalProps | null>(null);

  const studentsApplicationsData = useMemo(() => {
    if (!data) return;

    const {
      opportunity: {
        applications: { nodes: applications },
      },
    } = data;

    const studentsBySchoolClass = applications
      .slice()
      .sort((a, b) => a.student.fullName.localeCompare(b.student.fullName))
      .reduce((acc, application) => {
        const { fullName, schoolClasses, uuid } = application.student;

        schoolClasses.forEach(({ uuid: schoolClassUuid }) => {
          if (!acc[schoolClassUuid]) {
            acc[schoolClassUuid] = [];
          }

          acc[schoolClassUuid].push({
            applicationId: application.id,
            uuid,
            fullName,
            applicationStatus: application.status as OPPORTUNITY_APPLICATION_STATUS,
          });
        });

        return acc;
      }, {} as Record<string, Student[]>);

    const schoolClasses = applications.flatMap(({ student }) => student.schoolClasses);
    const uniqSchoolClasses = uniqBy(schoolClasses, 'uuid')
      .slice()
      .sort((a, b) => a.name.localeCompare(b.name));

    return { studentsBySchoolClass, schoolClasses: uniqSchoolClasses };
  }, [data]);

  if (loading || !studentsApplicationsData) {
    return <ParticipantListSkeleton />;
  }
  if (!data) {
    return null;
  }
  const { studentsBySchoolClass, schoolClasses } = studentsApplicationsData;

  if (isEmpty(schoolClasses)) {
    return (
      <SharedCard className='flex flex-col justify-center h-full'>
        <EmptyState
          heading={t('user.opportunities.emptyParticipantList')}
          icon={<EmptyParticipantsIcon className='w-[180px] xxxl:w-[260px]' />}>
          <p className='text-xs xxxl:text-sm'>{t('user.opportunities.noParticipants')}</p>
        </EmptyState>
      </SharedCard>
    );
  }

  const kickerSize = isFullHD ? 'md' : 'sm';

  const closeUpdateStatusModal = () => setModalOptions(null);

  return (
    <SharedCard className='flex flex-col gap-base h-full !py-base !pr-0 !pl-base xxxl:gap-md xxxl:!py-md xxxl:!pl-md'>
      <h5 className='mb-0 text-sm xxxl:text-lg' id='participants-card-title'>
        {t('user.opportunities.participantList')}
      </h5>
      <div
        aria-labelledby='participants-card-title'
        className='flex flex-col gap-base pr-base xxxl:gap-md xxxl:pr-md scrollbar'>
        {schoolClasses.map(({ name, uuid }) => (
          <section key={uuid} data-testid='school-class-section'>
            <Kicker
              className='sticky top-0 pb-xs mb-0 bg-white'
              size={kickerSize}
              variant='neutral'>
              {name}
            </Kicker>
            <ul className='m-0'>
              {studentsBySchoolClass[uuid].map((student) => (
                <ParticipantListItem
                  key={student.uuid}
                  opportunityName={data.opportunity.name}
                  student={student}
                  onModalOpen={setModalOptions}
                />
              ))}
            </ul>
          </section>
        ))}
      </div>
      {!isEmpty(modalOptions) && (
        <UpdateStatusModal
          applicationId={modalOptions.applicationId}
          applicationStatus={modalOptions.applicationStatus}
          handleClose={closeUpdateStatusModal}
          studentName={modalOptions.fullName}
        />
      )}
    </SharedCard>
  );
};
