import cx from 'classnames';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  ExtensionListModal,
  TAdminEntityInfoExtensionField,
} from '@dc/components/EntityInfoExtensions';
import { TEntity } from '@dc/graphql/user/queries/adminEntityInfo';

import { ReactComponent as PuzzleIcon } from '@shared/svg/puzzle.svg';
import { ReactComponent as ClearIcon } from '@shared/svg/clear.svg';
import SharedIcon from '@shared/components/Icon/Icon';
import { ReactComponent as ChevronDownIcon } from '@shared/svg/chevron_down.svg';
import DeprecatedIconButton from '@shared/components/DeprecatedIconButton/DeprecatedIconButton';
import SharedButton from '@shared/components/Button/Button';
import { useEntity } from '@shared/hooks/useEntity';

import styles from './ExtenstionList.module.sass';

type Props = {
  toggleModal: () => void;
};

export const ExtensionList = ({ toggleModal }: Props) => {
  const [isActive, setActive] = useState(false);
  const { entity } = useEntity<TEntity>();

  const items = entity.extensionFields;

  const [unassignExtensionDetails, setUnassignExtensionDetails] =
    useState<TAdminEntityInfoExtensionField | null>(null);

  const { t } = useTranslation();

  const isModalOpen = unassignExtensionDetails !== null;

  const accordionClasses = {
    button: cx(styles.button, {
      [styles.buttonDisabled]: !items.length,
    }),
    icon: cx(styles.icon, {
      [styles.iconActive]: isActive,
      [styles.iconDisabled]: !items.length,
    }),
    list: cx(styles.list, { [styles.listActive]: isActive }),
  };

  const toggleAccordion = () => setActive(!isActive);

  const closeModal = () => setUnassignExtensionDetails(null);

  return (
    <div className={styles.accordionList} data-testid='entity-info-list'>
      <DeprecatedIconButton
        className={cx(accordionClasses.button, styles.extensionIcon)}
        icon={<PuzzleIcon />}
        size='sm'
        square={true}
        onClick={toggleAccordion}>
        <span className={styles.extensionHeader}>
          {t('entityInfo.extensionFields.extensionFields')}
        </span>
        <SharedIcon className={accordionClasses.icon} icon={<ChevronDownIcon />} size='sm' />
      </DeprecatedIconButton>
      <ul className={accordionClasses.list}>
        <SharedButton
          className={styles.assignButton}
          variant='primary-outlined'
          onClick={toggleModal}>
          <span>{t('entityInfo.extensionFields.assign')}</span>
        </SharedButton>
        {items.map(({ id, name }) => (
          <li key={id} className={styles.item} data-testid='entity-info-list-item'>
            <span>{name}</span>
            <DeprecatedIconButton
              className={styles.clearIcon}
              icon={<ClearIcon />}
              size='sm'
              onClick={() => setUnassignExtensionDetails({ id, name })}
            />
          </li>
        ))}
      </ul>
      {isModalOpen && (
        <ExtensionListModal
          extensionDetails={unassignExtensionDetails}
          isOpen={isModalOpen}
          onDismiss={closeModal}
        />
      )}
    </div>
  );
};
