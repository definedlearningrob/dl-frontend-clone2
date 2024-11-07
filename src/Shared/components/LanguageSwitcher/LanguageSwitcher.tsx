import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { useToggle } from 'react-use';
import cx from 'classnames';
import { isEmpty } from 'lodash-es';
import { useTranslation } from 'react-i18next';

import { DropdownContent } from '@shared/components/NewDropdown/DropdownContent';
import { DropdownItem } from '@shared/components/NewDropdown/DropdownItem';
import { ReactComponent as WorldIcon } from '@shared/svg/world_icon.svg';
import { ReactComponent as ChevronDownIcon } from '@shared/svg/chevron_down.svg';
import { ReactComponent as ChevronUpIcon } from '@shared/svg/chevron_up.svg';
import { IconContainer } from '@shared/components/IconContainer/IconContainer';

type Props = {
  languages: string[];
  setLanguage: (language: string) => void;
  selectedLanguage: string;
};

const languageMap = {
  // eslint-disable-next-line camelcase
  es_mx: { label: 'Español (MX)', shortLabel: 'ES' },
  en: { label: 'English (US)', shortLabel: 'US' },
} as const;

export const LanguageSwitcher = ({ selectedLanguage, languages, setLanguage }: Props) => {
  const [isOpen, toggleIsOpen] = useToggle(false);
  const { t } = useTranslation();

  const triggerClassNames = cx(
    'flex gap-xxs items-center bg-neutral-200 rounded-base p-xxs hover:bg-white group focus:bg-white',
    {
      'text-neutral-700': !isOpen,
      'text-primary-500 bg-white': isOpen,
    }
  );
  const labelClassNames = cx('group-hover:text-neutral-800', {
    '!text-primary-500': isOpen,
  });

  if (!selectedLanguage || isEmpty(languages)) {
    return null;
  }

  return (
    <div className='relative'>
      <DropdownMenu.Root modal={false} open={isOpen} onOpenChange={toggleIsOpen}>
        <DropdownMenu.Trigger className={triggerClassNames}>
          <IconContainer
            Icon={WorldIcon}
            className='group-hover:text-primary-500 group-focus:text-primary-500'
            paddingSize='none'
          />
          <span className={labelClassNames}>
            {selectedLanguage &&
              languageMap[selectedLanguage as keyof typeof languageMap].shortLabel}
          </span>
          <IconContainer
            Icon={isOpen ? ChevronUpIcon : ChevronDownIcon}
            className={labelClassNames}
            paddingSize='xxs'
            size='sm'
          />
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content align='end' sideOffset={12}>
            <DropdownContent>
              <DropdownMenu.Label className='pt-xxs mb-xs px-sm text-xs font-bold'>
                {t('appHeader.languages')}
              </DropdownMenu.Label>
              {languages.map((language) => (
                <DropdownMenu.Item key={language} onClick={() => setLanguage(language)}>
                  <DropdownItem isSelected={selectedLanguage === language}>
                    {languageMap[language as keyof typeof languageMap].label}
                  </DropdownItem>
                </DropdownMenu.Item>
              ))}
            </DropdownContent>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </div>
  );
};
