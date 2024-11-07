import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import cx from 'classnames';

import { APPLICATIONS_TYPE } from '@dc/resources/enums';
import { useDeleteInstitutionApplication } from '@dc/graphql/student/hooks/useDeleteInstitutionApplication';

import { ReactComponent as DoneIcon } from '@shared/assets/icons/done.svg';
import Button from '@shared/components/Button/Button';
import SharedIcon from '@shared/components/Icon/Icon';

import { InstitutionApplicationProgressButton } from './InstitutionApplicationProgressButton';

type Props = {
  applicationId: string | null;
  applicationType: APPLICATIONS_TYPE | null;
};

export const InstitutionAppliedActions = ({ applicationId, applicationType }: Props) => {
  const { t } = useTranslation();
  const { id: institutionId } = useParams<{ id: string }>();
  const [deleteInstitutionApplication, { loading }] = useDeleteInstitutionApplication();

  const isCommonAppApplication = applicationType === APPLICATIONS_TYPE.COMMON_APP;
  const isDirectApplication = applicationType === APPLICATIONS_TYPE.DIRECT;

  const shouldDisplayProgressButton = isCommonAppApplication && applicationId;

  const hasAdditionalActions = isDirectApplication || shouldDisplayProgressButton;

  return (
    <div className='border border-neutral-300 p-sm w-fit rounded-sm'>
      <div className={cx('flex items-center gap-xs', { 'mb-sm': hasAdditionalActions })}>
        <div className='bg-primary-200 rounded-md w-fit'>
          <SharedIcon
            className='mb-0 text-primary-500'
            icon={<DoneIcon className='!w-sm !h-sm' />}
            size='sm'
          />
        </div>
        <p className='!mb-0 text-primary-500 text-xs font-medium leading-lg'>
          {t('postSecondary.institution.appliedToCollege')}
        </p>
      </div>
      {shouldDisplayProgressButton && (
        <InstitutionApplicationProgressButton applicationId={applicationId} />
      )}
      {isDirectApplication && (
        <Button
          disabled={loading}
          size='sm'
          variant='primary-outlined'
          onClick={() => deleteInstitutionApplication(applicationId, institutionId)}>
          {t('postSecondary.institution.removeApplication')}
        </Button>
      )}
    </div>
  );
};
