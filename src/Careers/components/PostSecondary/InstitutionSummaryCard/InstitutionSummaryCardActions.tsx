import { useTranslation } from 'react-i18next';

import { ReactComponent as LinkIcon } from '@shared/svg/link.svg';
import SharedLink from '@shared/components/Link/Link';
import { formatExternalLink } from '@shared/utils/formatExternalLink';
import { InterestedButton } from '@shared/components/InterestedButton/InterestedButton';

type Props = {
  withoutFavorite?: boolean;
  websiteUrl: string | null;
  isFavorite?: boolean;
  toggleFavorite: () => void;
};

export const InstitutionSummaryCardActions = ({
  withoutFavorite,
  websiteUrl,
  isFavorite,
  toggleFavorite,
}: Props) => {
  const { t } = useTranslation();

  return (
    <>
      {!withoutFavorite && (
        <InterestedButton
          isSelected={isFavorite}
          label={t('postSecondary.institution.favorite')}
          size='sm'
          withLabel={true}
          onClick={toggleFavorite}
        />
      )}
      {websiteUrl && (
        <SharedLink
          Icon={LinkIcon}
          className='text-xs'
          size='sm'
          target='_blank'
          to={{ pathname: formatExternalLink(websiteUrl) }}
          variant='primary-outlined'>
          {t('postSecondary.institution.website')}
        </SharedLink>
      )}
    </>
  );
};
