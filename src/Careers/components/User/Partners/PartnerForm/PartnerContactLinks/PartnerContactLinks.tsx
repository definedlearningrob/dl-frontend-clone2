import { useTranslation } from 'react-i18next';
import { FieldArray, useField } from 'formik';

import { SingleCustomContactLink } from '@dc/components/User/Partners/PartnerForm/PartnerContactLinks/SingleCustomContactLink';

import { ReactComponent as PhoneIcon } from '@shared/svg/phone.svg';
import { ReactComponent as MailIcon } from '@shared/svg/mail.svg';
import { ReactComponent as PlusIcon } from '@shared/svg/add.svg';
import { ReactComponent as LocationIcon } from '@shared/svg/location-marker.svg';
import { ReactComponent as WebsiteIcon } from '@shared/svg/world_icon.svg';
import { CONTACT_LINK_TYPES } from '@shared/resources/enums';
import Button from '@shared/components/Button/Button';
import { useBreakpointUp } from '@shared/hooks/useBreakpointUp';
import { TextInput, TextInputProps } from '@shared/components/TextInput/TextInput';

export const PartnerContactLinks = () => {
  const { t } = useTranslation();
  const isFullHD = useBreakpointUp({ breakpoint: 'xxxl' });

  const [urlField] = useField('url');
  const [addressField] = useField('address');
  const [phoneField] = useField('phone');
  const [emailField] = useField('email');
  const [additionalUrlField] = useField<string[]>('additionalUrls');

  const contactLinks = [
    {
      id: 1,
      type: CONTACT_LINK_TYPES.WEBSITE,
      Icon: WebsiteIcon,
      field: urlField,
      placeholder: t('user.partners.links.websitePlaceholder'),
      inputType: 'text',
    },
    {
      id: 2,
      type: CONTACT_LINK_TYPES.LOCATION,
      Icon: LocationIcon,
      field: addressField,
      placeholder: t('user.partners.links.locationPlaceholder'),
      inputType: 'text',
    },
    {
      id: 3,
      type: CONTACT_LINK_TYPES.PHONE,
      Icon: PhoneIcon,
      field: phoneField,
      placeholder: t('user.partners.links.phonePlaceholder'),
      inputType: 'tel',
    },
    {
      id: 4,
      type: CONTACT_LINK_TYPES.EMAIL,
      Icon: MailIcon,
      field: emailField,
      placeholder: t('user.partners.links.emailPlaceholder'),
      inputType: 'email',
    },
  ];

  return (
    <ul className='flex flex-col gap-xs'>
      {contactLinks.map((link) => (
        <div key={link.id} className='flex w-full'>
          <li className='flex flex-1 items-center'>
            <TextInput
              Icon={link.Icon}
              className='flex-1 mr-lg xxxl:mr-[56px]'
              field={link.field}
              iconPlacement='start'
              placeholder={link.placeholder}
              type={link.inputType as TextInputProps['type']}
            />
          </li>
        </div>
      ))}

      <FieldArray
        name='additionalUrls'
        render={({ remove, push }) => (
          <>
            {additionalUrlField.value.map((link, index) => (
              <SingleCustomContactLink key={index} index={index} onRemove={() => remove(index)} />
            ))}
            <Button
              Icon={PlusIcon}
              className='!mt-sm w-max'
              disabled={additionalUrlField.value.length >= 3}
              iconPlacement='start'
              size={isFullHD ? 'md' : 'sm'}
              variant='primary'
              onClick={() => push('')}>
              {t('user.partners.form.addNewLink')}
            </Button>
          </>
        )}
      />
    </ul>
  );
};
