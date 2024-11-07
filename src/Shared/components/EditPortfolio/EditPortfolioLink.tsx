import { useTranslation } from 'react-i18next';
import { FieldArrayRenderProps, useField } from 'formik';

import { ContactsAndLinksSectionItem } from '@shared/components/EditPortfolio/PersonalInformation/ContactsAndLinksSectionItem';
import { ReactComponent as Phone } from '@shared/svg/phone.svg';
import { ReactComponent as Mail } from '@shared/svg/mail.svg';
import { ReactComponent as LinkedIn } from '@shared/svg/linkedin.svg';
import { ReactComponent as Plus } from '@shared/svg/add.svg';
import { ReactComponent as Link } from '@shared/svg/link.svg';
import Button from '@shared/components/Button/Button';
import { CONTACT_LINK_TYPES } from '@shared/resources/enums';
import { ContactLink } from '@shared/resources/types';
import { useBreakpointUp } from '@shared/hooks/useBreakpointUp';
import { Tooltip } from '@shared/components/Tooltip';

const iconMap = new Map([
  [CONTACT_LINK_TYPES.EMAIL, Mail],
  [CONTACT_LINK_TYPES.LINKEDIN, LinkedIn],
  [CONTACT_LINK_TYPES.PHONE, Phone],
  [CONTACT_LINK_TYPES.CUSTOM, Link],
]);

export const EditPortfolioLink = ({ push, remove }: FieldArrayRenderProps) => {
  const { t } = useTranslation();
  const isFullHD = useBreakpointUp({ breakpoint: 'xxxl' });
  const [contactLinksField] = useField<ContactLink[]>('contactLinks');

  const placeholdersMap = new Map([
    [CONTACT_LINK_TYPES.EMAIL, t('portfolio.creator.emailPlaceholder', { name: 'Email' })],
    [CONTACT_LINK_TYPES.LINKEDIN, t('portfolio.creator.linkPlaceholder', { name: 'LinkedIn' })],
    [CONTACT_LINK_TYPES.PHONE, t('portfolio.creator.phonePlaceholder')],
    [CONTACT_LINK_TYPES.CUSTOM, t('portfolio.creator.customLinkPlaceholder')],
  ]);

  const handleAddCustomLink = () => {
    push({
      value: '',
      visible: true,
      type: CONTACT_LINK_TYPES.CUSTOM,
    });
  };

  const hasMoreThanFiveCustomLinks = contactLinksField.value.length >= 8;

  return (
    <ul className='flex flex-col gap-xs'>
      {contactLinksField.value.map(({ type }, index) => (
        <ContactsAndLinksSectionItem
          key={`${type}--${index}`}
          Icon={iconMap.get(type) || Link}
          index={index}
          isCustom={type === CONTACT_LINK_TYPES.CUSTOM}
          placeholder={placeholdersMap.get(type) || ''}
          onRemove={remove}
        />
      ))}
      <Tooltip
        className='w-fit !mt-sm'
        contentClassName='!max-w-[260px]'
        delayDuration={300}
        disabled={!hasMoreThanFiveCustomLinks}
        message={t('portfolio.creator.maxLinksInfo')}>
        <Button
          Icon={Plus}
          disabled={hasMoreThanFiveCustomLinks}
          iconPlacement='start'
          size={isFullHD ? 'md' : 'sm'}
          variant='primary'
          onClick={handleAddCustomLink}>
          {t('portfolio.creator.addNew')}
        </Button>
      </Tooltip>
    </ul>
  );
};
