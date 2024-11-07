import { useHistory } from 'react-router-dom';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { useTranslation } from 'react-i18next';

import { useToggle } from '@shared/hooks/useToggle';
import { ReactComponent as ArrowUpIcon } from '@shared/assets/icons/chevron_up.svg';
import { ReactComponent as ArrowDownIcon } from '@shared/assets/icons/chevron_down.svg';
import Button from '@shared/components/Button/Button';

import styles from './CommonAppProfileBarDropdown.module.sass';

export const CommonAppProfileBarDropdown = () => {
  const [isDropdownOpen, toggleDropdownOpen] = useToggle(false);
  const { t } = useTranslation();
  const history = useHistory();
  const goToTeacherProfile = () => {
    history.push('/forms/teacherprofile');
  };
  const goToCounselorProfile = () => {
    history.push('/forms/counselorprofile');
  };

  const dropdownItemClassname =
    'text-font-primary text-xs font-regular p-x focus-visible:outline-none hover:bg-primary-200';

  return (
    <DropdownMenu.Root open={isDropdownOpen} onOpenChange={toggleDropdownOpen}>
      <DropdownMenu.Trigger asChild={true}>
        <div>
          <Button
            Icon={isDropdownOpen ? ArrowUpIcon : ArrowDownIcon}
            className='IconButton'
            iconPlacement='end'
            size='md'
            variant='primary-outlined'>
            <span>{t('user.postSecondary.commonAppRequests.edit')}</span>
          </Button>
        </div>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content align='end' className={styles.dropdownMenuContent} sideOffset={15}>
          <DropdownMenu.Item className={dropdownItemClassname} onClick={goToCounselorProfile}>
            <p className='mb-0'>{t('user.postSecondary.commonAppRequests.counselorProfile')}</p>
          </DropdownMenu.Item>
          <DropdownMenu.Item className={dropdownItemClassname} onClick={goToTeacherProfile}>
            <p className='mb-0'>{t('user.postSecondary.commonAppRequests.teacherProfile')}</p>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};
