import { useTranslation } from 'react-i18next';
import cx from 'classnames';

import { TOpportunity } from '@dc/resources/types';

import DefaultImage from '@shared/assets/images/default-thumbnail.svg';
import { ReactComponent as EducatorIcon } from '@shared/svg/educator.svg';
import { ReactComponent as CalendarIcon } from '@shared/svg/calendar.svg';
import { ReactComponent as DeadlineIcon } from '@shared/svg/deadline.svg';
import { ReactComponent as LocationIcon } from '@shared/svg/location-marker.svg';
import SharedImage from '@shared/components/Image/Image';
import TruncatedText from '@shared/components/TruncatedText';
import SharedIcon from '@shared/components/Icon/Icon';
import { formatDateTime, getPeriod } from '@shared/utils/date/date';
import { cleanInjection } from '@shared/utils/cleanInjection';

import styles from './ApplicationDetails.module.sass';

type Props = {
  opportunity: Pick<
    TOpportunity,
    | 'imageUrl'
    | 'name'
    | 'description'
    | 'opportunityType'
    | 'periodEnd'
    | 'periodStart'
    | 'deadline'
    | 'location'
  >;
};

export const ApplicationDetails = ({ opportunity }: Props) => {
  const { t } = useTranslation();
  const imageUrl = opportunity.imageUrl || '';
  const periodValue =
    opportunity.periodStart && opportunity.periodEnd
      ? getPeriod(opportunity.periodStart, opportunity.periodEnd)
      : 'N/A';
  const deadlineValue = opportunity.deadline ? formatDateTime(opportunity.deadline) : 'N/A';

  const detailsClasses = cx(
    styles.opportunityDetails,
    'scrollbar overflow-y-auto overflow-x-hidden'
  );

  return (
    <div className={detailsClasses}>
      <section className={styles.opportunityDescription}>
        <SharedImage
          className={styles.descriptionImage}
          fallbackSrc={DefaultImage}
          src={imageUrl}
        />
        <h5 className={styles.descriptionTitle}>{opportunity.name}</h5>
        <TruncatedText text={opportunity.description} />
      </section>
      <section className={styles.opportunityInfo}>
        <span className={styles.opportunityInfoWrapper}>
          <SharedIcon icon={<EducatorIcon />} size='xs' />
          <span className={styles.infoLabel}>{t('opportunities.type')}</span>
          {t(`opportunities.types.${opportunity.opportunityType}`)}
        </span>
        <span className={styles.opportunityInfoWrapper}>
          <SharedIcon icon={<CalendarIcon />} size='xs' />
          <span className={styles.infoLabel}>{t('opportunities.period')}</span>
          {periodValue}
        </span>
        <span className={styles.opportunityInfoWrapper}>
          <SharedIcon icon={<DeadlineIcon />} size='xs' />
          <span className={styles.infoLabel}>{t('opportunities.deadline')}</span>
          {deadlineValue}
        </span>
        {opportunity.location && (
          <span className={styles.opportunityInfoWrapper}>
            <SharedIcon icon={<LocationIcon />} size='xs' />
            <span className={styles.infoLabel}>{t('opportunities.location')}</span>
            {/* eslint-disable-next-line react/no-danger */}
            <div dangerouslySetInnerHTML={cleanInjection(opportunity.location)} />
          </span>
        )}
      </section>
    </div>
  );
};
