import { useTranslation } from 'react-i18next';
import { useToggle } from 'react-use';

import { useInstitutionApplication } from '@dc/graphql/student/hooks/useInstitutionApplication';

import Button from '@shared/components/Button/Button';

import { ApplicationDetailsModal } from '../ApplicationDetailsModal/ApplicationDetailsModal';

type Props = {
  applicationId: string;
};

export const InstitutionApplicationProgressButton = ({ applicationId }: Props) => {
  const { t } = useTranslation();
  const [isModalOpen, toggleModalOpen] = useToggle(false);
  const { data } = useInstitutionApplication(applicationId);

  const institutionApplication = data?.institutionApplication;

  return (
    <>
      <Button className='ml-md px-xs py-sm' size='sm' variant='primary' onClick={toggleModalOpen}>
        {t('postSecondary.institution.seeProgress')}
      </Button>
      {institutionApplication && (
        <ApplicationDetailsModal
          isOpen={isModalOpen}
          selectedApplication={institutionApplication}
          onCloseModal={toggleModalOpen}
        />
      )}
    </>
  );
};
