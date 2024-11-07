import { useTranslation } from 'react-i18next';
import { capitalize, isNull } from 'lodash-es';
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';

import { ReactComponent as LocationIcon } from '@dc/svg/location-marker.svg';
import { currencyFormatter } from '@dc/shared/InstitutionCard/helper/currencyFormatter';
import {
  institutionSizeDescriptionMap,
  institutionSizeTypeMap,
  TInstitution,
} from '@dc/resources/types';

import { ReactComponent as PhoneIcon } from '@shared/svg/phone.svg';
import { InfoBox } from '@shared/components/InfoBox';
import { ReactComponent as EducationIcon } from '@shared/svg/education_outlined.svg';
import { ReactComponent as ClassIcon } from '@shared/svg/class.svg';
import SharedIcon from '@shared/components/Icon/Icon';

import { InstitutionCard } from '../../InstitutionCard';
import { ExternalLink } from '../../ExternalLink';

dayjs.extend(isSameOrAfter);

type Props = {
  institution: TInstitution;
};

export const OverviewTab = ({ institution }: Props) => {
  const { t } = useTranslation();
  const { type, sizeType, sizeDescription, cost, address, contact, isIpeds } = institution;

  const title = isIpeds
    ? t('postSecondary.institution.overview')
    : t('postSecondary.institution.generalInformation');

  const formattedCost = isNull(cost)
    ? t('postSecondary.institution.notSpecified')
    : currencyFormatter(cost);

  const sizeDescriptionText = sizeDescription
    ? institutionSizeDescriptionMap[sizeDescription]
    : t('postSecondary.institution.notAvailableShort');

  const sizeTypeText = sizeType
    ? institutionSizeTypeMap[sizeType]
    : t('postSecondary.institution.notAvailableShort');

  const sizeText = sizeType
    ? `${capitalize(sizeTypeText)} (${sizeDescriptionText})`
    : t('postSecondary.institution.notSpecified');

  const metaWrapperClasses = 'flex flex-col gap-xs font-medium';
  const contactInfoClasses = 'flex items-center gap-xs font-regular leading-sm';

  return (
    <InstitutionCard title={title} withSections={false}>
      {isIpeds && (
        <div className='grid gap-sm mb-base grid-cols-1 sm:grid-cols-2 md:grid-cols-3'>
          <InfoBox icon={<EducationIcon />} title={type}>
            {t('postSecondary.institution.type')}
          </InfoBox>
          <InfoBox icon={<ClassIcon />} title={sizeText}>
            {t('postSecondary.institution.size')}
          </InfoBox>
          <InfoBox icon={<EducationIcon />} title={formattedCost}>
            {t('postSecondary.institution.averagePerYear')}
          </InfoBox>
        </div>
      )}
      <section className='flex flex-col max-w-[800px] gap-base'>
        {isIpeds && (
          <h5 className='m-0 text-sm'>{t('postSecondary.institution.generalInformation')}</h5>
        )}
        <div className={metaWrapperClasses}>
          {t('postSecondary.institution.address')}
          <div className={contactInfoClasses}>
            <SharedIcon icon={<LocationIcon />} size='sm' />
            {`${address.street}, ${address.city}, ${address.stateCode} ${address.zip}`}
          </div>
        </div>
        <div className={metaWrapperClasses}>
          {t('postSecondary.institution.phoneNumber')}
          <div className={contactInfoClasses}>
            <SharedIcon icon={<PhoneIcon />} size='sm' />
            {contact.phone}
          </div>
        </div>
        <ExternalLink label={t('postSecondary.institution.webAddress')} url={contact.urlGeneral} />
        <ExternalLink
          label={t('postSecondary.institution.financialAidAddress')}
          url={contact.urlFinancialAid}
        />
        <ExternalLink
          label={t('postSecondary.institution.admissionsAddress')}
          url={contact.urlAdmissions}
        />
        <ExternalLink
          label={t('postSecondary.institution.onlineApplicationAddress')}
          url={contact.urlApplications}
        />
        <ExternalLink
          label={t('postSecondary.institution.priceCalculatorAddress')}
          url={contact.urlNetPriceCalculator}
        />
      </section>
    </InstitutionCard>
  );
};
