import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { useUpdateInstitutionApplication } from '@dc/graphql/student/hooks/useUpdateInstitutionApplication';
import { INSTITUTION_APPLICATION_STATUS } from '@dc/resources/enums';

import { StatusSelect } from '@shared/components/StatusSelect';

type Props = {
  currentStatus: INSTITUTION_APPLICATION_STATUS;
  institutionApplicationId: string;
};

export const ApplicationStatusSelector = ({ currentStatus, institutionApplicationId }: Props) => {
  const [updateInstitutionApplication] = useUpdateInstitutionApplication();
  const { t } = useTranslation();

  const handleStatusChange = (status: INSTITUTION_APPLICATION_STATUS) => {
    updateInstitutionApplication({
      institutionApplicationId,
      status,
    });
  };

  const options = useMemo(
    () => [
      {
        status: INSTITUTION_APPLICATION_STATUS.NOT_STARTED,
        badgeType: 'neutral' as const,
        label: t('student.postSecondary.applicationsSection.notStarted'),
      },
      {
        status: INSTITUTION_APPLICATION_STATUS.IN_PROGRESS,
        badgeType: 'secondary' as const,
        label: t('student.postSecondary.applicationsSection.inProgress'),
      },
      {
        status: INSTITUTION_APPLICATION_STATUS.SUBMITTED,
        badgeType: 'success' as const,
        label: t('student.postSecondary.applicationsSection.completed'),
      },
    ],
    []
  );

  return (
    <StatusSelect currentStatus={currentStatus} options={options} onChange={handleStatusChange} />
  );
};
