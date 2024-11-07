import { MouseEvent, useState } from 'react';
import { t } from 'i18next';

import { ReactComponent as MoreIcon } from '@dc/assets/icons/more_vertical.svg';
import usePresentationBuilder from '@dc/hooks/usePresentationBuilder';

import SharedIcon from '@shared/components/Icon/Icon';

import styles from './Dropdown.module.sass';

type Props = {
  onDeleteClick: () => void;
  onGoToLibraryClick: () => void;
};

function AdminTasksPresentationBuilderSlidesListELementSlideDropdown({
  onGoToLibraryClick,
  onDeleteClick,
}: Props) {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const { isSystemAdminUser } = usePresentationBuilder();

  const toggleDropdown = (event: MouseEvent | null) => {
    event?.stopPropagation();
    setDropdownVisible(!dropdownVisible);
  };

  const handleOpenInLibrary = (event: MouseEvent) => {
    event?.stopPropagation();
    onGoToLibraryClick();
    toggleDropdown(null);
  };

  const handleDelete = (event: MouseEvent) => {
    event.stopPropagation();
    onDeleteClick();
    toggleDropdown(null);
  };

  return (
    <>
      <button className={styles.trigger} onClick={toggleDropdown}>
        <SharedIcon icon={<MoreIcon />} size='sm' />
      </button>
      {dropdownVisible && (
        <ul className={styles.dropdown}>
          {isSystemAdminUser && (
            <li className={styles.dropdownItem} onClick={handleOpenInLibrary}>
              {t('admin.tasks.presentation.openInLibrary')}
            </li>
          )}
          <li className={`${styles.dropdownItem} ${styles.deleteItem}`} onClick={handleDelete}>
            {t('common.actions.delete')}
          </li>
        </ul>
      )}
    </>
  );
}

export default AdminTasksPresentationBuilderSlidesListELementSlideDropdown;
