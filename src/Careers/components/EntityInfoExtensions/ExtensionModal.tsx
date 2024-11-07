import { useMemo, useState } from 'react';
import { useMutation } from '@apollo/client';
import { useTranslation } from 'react-i18next';

import ASSIGN_EXTENSION_FIELD_TO_ENTITY, {
  type TAssignExtensionFieldToEntityData,
  type TAssignExtensionFieldToEntityVariables,
} from '@dc/graphql/user/mutations/assignExtensionFieldToEntity';
import { getFormErrors } from '@dc/utils/graphql';
import { ExtensionsSelect } from '@dc/components/EntityInfoExtensions/ExtensionsSelect';
import { TEntity } from '@dc/graphql/user/queries/adminEntityInfo';
import ADMIN_ENTITY_INFO_QUERY from '@dc/graphql/user/queries/adminEntityInfo';

import SharedModal from '@shared/components/Modal/Modal';
import SharedCheckbox from '@shared/components/Checkbox/Checkbox';
import { useEntity } from '@shared/hooks/useEntity';

import styles from './ExtensionModal.module.sass';

type Props = {
  onDismiss: () => void;
  isOpen: boolean;
};

type TExtensions = {
  id: string;
};

export const ExtensionModal = ({ isOpen, onDismiss }: Props) => {
  const { entity } = useEntity<TEntity>();

  const [assignExtension, { loading }] = useMutation<
    TAssignExtensionFieldToEntityData,
    TAssignExtensionFieldToEntityVariables
  >(ASSIGN_EXTENSION_FIELD_TO_ENTITY);

  const { t } = useTranslation();
  const [assignToChildren, setAssignToChildren] = useState(false);
  const [extension, setExtension] = useState<TExtensions | null>(null);

  const assignedExtensionIds = useMemo(
    () => entity.extensionFields.map((extension) => extension.id),
    [entity.extensionFields]
  );

  const dissmissAndClear = () => {
    setExtension(null);
    onDismiss();
  };

  const handleAssignExtension = async () => {
    if (extension) {
      try {
        await assignExtension({
          variables: {
            input: {
              entityUuid: entity.uuid,
              extensionFieldId: extension.id,
              assignToHierarchy: assignToChildren,
            },
          },
          refetchQueries: [{ query: ADMIN_ENTITY_INFO_QUERY, variables: { uuid: entity.uuid } }],
        });
        dissmissAndClear();
      } catch (e) {
        //@ts-ignore
        getFormErrors(e);
      }
    }
  };

  return (
    <SharedModal isOpen={isOpen} onDismiss={dissmissAndClear}>
      <SharedModal.Header>
        <SharedModal.Heading type='h3'>
          {t('entityInfo.extensionFields.assign')}
        </SharedModal.Heading>
      </SharedModal.Header>
      <SharedModal.Body className={styles.body}>
        <label className={styles.assignLabel}>{t('entityInfo.extensionFields.assignTo')}:</label>
        <span className={styles.entityName}>{entity.name}</span>
        <SharedCheckbox
          checked={assignToChildren}
          className={styles.checkbox}
          label={t('entityInfo.extensionFields.assignToChildren')}
          onChange={() => setAssignToChildren(!assignToChildren)}
        />
        <ExtensionsSelect
          assignedExtensionIds={assignedExtensionIds}
          extension={extension}
          setExtension={setExtension}
        />
      </SharedModal.Body>
      <SharedModal.Footer align='center'>
        <SharedModal.Button variant='primary-outlined' onClick={dissmissAndClear}>
          {t('common.actions.cancel')}
        </SharedModal.Button>
        <SharedModal.Button
          disabled={!extension}
          isLoading={loading}
          variant='primary'
          onClick={handleAssignExtension}>
          {t('common.actions.save')}
        </SharedModal.Button>
      </SharedModal.Footer>
    </SharedModal>
  );
};
