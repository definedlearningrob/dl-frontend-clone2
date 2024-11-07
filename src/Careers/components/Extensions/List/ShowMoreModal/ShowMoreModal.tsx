import { useTranslation } from 'react-i18next';

import { type TExtensionField } from '@dc/graphql/user/queries/extensionFields';

import SharedModal from '@shared/components/Modal/Modal';

import styles from './ShowMoreModal.module.sass';

type Props = {
  extension: TExtensionField;
  isOpen: boolean;
  onDismiss: () => void;
};

type TSource = {
  name: string;
  items: TExtensionField['courses'];
};

const ExtensionsShowMoreModal = ({ extension, isOpen, onDismiss }: Props) => {
  const { t } = useTranslation();

  const sources: TSource[] = [
    {
      name: t('user.dashboard.extensionFields.settings.clusters'),
      items: [...extension.clusters],
    },
    {
      name: t('user.dashboard.extensionFields.settings.pathways'),
      items: [...extension.pathways],
    },
    {
      name: t('user.dashboard.extensionFields.settings.courses'),
      items: [...extension.courses],
    },
  ];

  const renderRow = (source: TSource) => (
    <div key={source.name} className={styles.item}>
      <label className={styles.label}>{source.name}:</label>
      <p className={styles.list}>
        {source.items.map((item, index) => (
          <span key={item.id}>
            <span>{item.name}</span>
            {index < source.items.length - 1 && <span>,{'  '}</span>}
          </span>
        ))}
      </p>
    </div>
  );

  return (
    <SharedModal isOpen={isOpen} onDismiss={onDismiss}>
      <SharedModal.Header>
        <SharedModal.Heading>{extension.name}</SharedModal.Heading>
      </SharedModal.Header>
      <SharedModal.Body>{sources.map((source) => renderRow(source))}</SharedModal.Body>
      <SharedModal.Footer align='center'>
        <SharedModal.Button variant='primary-outlined' onClick={onDismiss}>
          {t('common.actions.cancel')}
        </SharedModal.Button>
      </SharedModal.Footer>
    </SharedModal>
  );
};

export default ExtensionsShowMoreModal;
