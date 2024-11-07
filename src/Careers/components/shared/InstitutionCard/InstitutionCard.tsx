import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import cx from 'classnames';
import { MouseEvent } from 'react';

import { InstitutionCardThumbnail } from '@dc/shared/InstitutionCard/InstitutionCardThumbnail';
import { currencyFormatter } from '@dc/shared/InstitutionCard/helper/currencyFormatter';
import { useToggleInstitutionFavorite } from '@dc/graphql/student/hooks/useToggleInstitutionFavorite';
import { TInstitution } from '@dc/resources/types';
import { InstitutionSize } from '@dc/shared/InstitutionCard/InstitutionSize/InstitutionSize';
import { ReactComponent as CommonAppLogo } from '@dc/svg/CommonApp.svg';

import { ReactComponent as ArrowIcon } from '@shared/svg/chevron_right.svg';
import { ReactComponent as InfoIcon } from '@shared/svg/info_outlined.svg';
import { ReactComponent as CostsIcon } from '@shared/svg/cost.svg';
import SharedIcon from '@shared/components/Icon/Icon';
import { Tooltip } from '@shared/components/Tooltip';
import { InterestedButton } from '@shared/components/InterestedButton/InterestedButton';
import { callToast } from '@shared/components/Toaster/Toaster';
import { useBreakpointUp } from '@shared/hooks/useBreakpointUp';

import styles from './InstitutionCard.module.sass';

export type InstitutionCardProps = {
  withoutFavorite?: boolean;
  institution: Pick<
    TInstitution,
    | 'cost'
    | 'name'
    | 'isFavorite'
    | 'sizeType'
    | 'sizeDescription'
    | 'thumbnailUrl'
    | 'type'
    | 'id'
    | 'commonAppEnabled'
  > & {
    address: Pick<TInstitution['address'], 'city' | 'stateCode'>;
  };
};

export const InstitutionCard = ({ institution, withoutFavorite }: InstitutionCardProps) => {
  const { cost, name, sizeType, sizeDescription, thumbnailUrl, type, address, id } = institution;
  const [toggleFavorite, { loading, data }] = useToggleInstitutionFavorite();
  const localization = [address.city, address.stateCode].filter(Boolean).join(', ');

  const formattedCurrency = cost && currencyFormatter(cost);
  const { t } = useTranslation();
  const isFavorite =
    data?.toggleInstitutionFavorite.institution.isFavorite || institution.isFavorite;
  const institutionCardClassName = cx('institutionCard', styles.card);

  const isDesktop = useBreakpointUp({ breakpoint: 'xxxl' });
  const handleToggleInstitutionAsFavorite = async (event: MouseEvent) => {
    event.preventDefault();
    try {
      await toggleFavorite({ institutionId: id });
      !loading && isFavorite
        ? callToast('info', t('student.institutionSearch.institutionRemovedFromFavorite'))
        : callToast('favorite', t('student.institutionSearch.institutionAddedToFavorite'));
    } catch (e) {}
  };
  const institutionCity = localization || t('student.institutionSearch.unknownCity');
  const institutionName = name || t('student.institutionSearch.unknownName');
  const institutionType = type || t('student.institutionSearch.unknown');
  const institutionCost = formattedCurrency || t('student.institutionSearch.unknown');
  const iconSize = isDesktop ? 'md' : 'sm';

  const postSecondaryApplicationsEnabled = institution.commonAppEnabled;

  return (
    <Link className={institutionCardClassName} to={`/post-secondary/institutions/${id}`}>
      <div className={styles.imageWrapper}>
        {!withoutFavorite && (
          <InterestedButton
            className={styles.interestedButton}
            isSelected={isFavorite}
            size={iconSize}
            onClick={handleToggleInstitutionAsFavorite}
          />
        )}
        <InstitutionCardThumbnail alt={name} thumbnailUrl={thumbnailUrl} />
        {postSecondaryApplicationsEnabled && (
          <div
            aria-label={t('student.institutionSearch.commonAppIconLabel')}
            className='bg-white rounded-xxs py-xxs px-xs absolute bottom-sm left-sm'>
            <SharedIcon className='h-sm xxxl:h-base' icon={<CommonAppLogo />} />
          </div>
        )}
      </div>
      <div className={styles.cardContent}>
        <section className={styles.body}>
          <div className={styles.header}>
            <p className={styles.headerText}>{institutionCity}</p>
            <h5 className={styles.title}>{institutionName}</h5>
          </div>
          <div className={styles.infoBody}>
            <div className={styles.typeWrapper}>
              <Tooltip delayDuration={400} message={institutionType}>
                <span className={styles.metadata}>
                  <SharedIcon className={styles.metadataIcon} icon={<InfoIcon />} size='xs' />
                  <div className={styles.longTextWrapper}>
                    <span className={styles.metadataLabel}>
                      {t('student.institutionSearch.filters.type')}:
                    </span>
                    <span className={styles.typeDescription}>{institutionType}</span>
                  </div>
                </span>
              </Tooltip>
            </div>
            <div className={styles.typeWrapper}>
              <InstitutionSize sizeDescription={sizeDescription} sizeType={sizeType} />
            </div>
            <span className={styles.metadata}>
              <SharedIcon className={styles.metadataIcon} icon={<CostsIcon />} size='xs' />
              <span className={styles.metadataLabel}>
                {t('student.institutionSearch.filters.costs')}:
              </span>
              {institutionCost}
            </span>
          </div>
        </section>
        <div className={styles.footer}>
          {t('student.institutionSearch.moreDetails')}
          <SharedIcon icon={<ArrowIcon />} size='xs' />
        </div>
      </div>
    </Link>
  );
};
