import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { NetworkStatus } from '@apollo/client';
import cx from 'classnames';

import { useInstitutionQuery } from '@dc/graphql/student/hooks/useInstitutionQuery';

import { formatExternalLink } from '@shared/utils/formatExternalLink';
import Link from '@shared/components/Link';

type Props = {
  commonAppApplicationUrl: string | null;
  commonAppEnabled: boolean;
  directApplicationURL: string | null;
  onCommonAppApplication: () => void;
};

export const ApplyToInstitutionButton = ({
  commonAppApplicationUrl,
  directApplicationURL,
}: Props) => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const { networkStatus } = useInstitutionQuery({ id, notifyOnNetworkStatusChange: true });

  const isInstitutionRefetching = networkStatus === NetworkStatus.refetch;

  const commonClasses = cx(
    'button flex items-center justify-center gap-xs rounded-sm',
    'cursor-pointer text-sm font-medium no-underline py-xs px-sm',
    '!text-xs leading-[14px] !gap-xxs border'
  );

  if (commonAppApplicationUrl) {
    return (
      <div className='flex gap-xs xxxl:gap-sm'>
        <Link
          className={commonClasses}
          size='md'
          target='_blank'
          to={{ pathname: formatExternalLink(`${commonAppApplicationUrl}`) }}
          variant='primary'>
          {t('postSecondary.institution.commonAppApplication')}
        </Link>
        <Link
          className={commonClasses}
          size='md'
          target='_blank'
          to={{ pathname: formatExternalLink(`${directApplicationURL}`) }}
          variant='primary-outlined'>
          {t('postSecondary.institution.directApplication')}
        </Link>
      </div>
    );
  }

  return (
    <Link
      disabled={isInstitutionRefetching}
      size='md'
      target='_blank'
      to={{ pathname: formatExternalLink(`${directApplicationURL}`) }}
      variant='primary'>
      {t('postSecondary.institution.directApplication')}
    </Link>
  );
};
