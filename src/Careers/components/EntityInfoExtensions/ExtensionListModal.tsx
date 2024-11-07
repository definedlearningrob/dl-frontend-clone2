import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useTranslation } from 'react-i18next';

import ADMIN_ENTITY_INFO_QUERY from '@dc/graphql/user/queries/adminEntityInfo';
import UNASSIGN_EXTENSION_FIELD_FROM_ENTITY, {
  type TUnassignExtensionFieldFromEntityData,
  type TUnassignExtensionFieldFromEntityVariables,
} from '@dc/graphql/user/mutations/unassignExtensionFieldFromEntity';
import { getFormErrors } from '@dc/utils/graphql';
import { TEntity } from '@dc/graphql/user/queries/adminEntityInfo';

import SharedModal from '@shared/components/Modal/Modal';
import SharedCheckbox from '@shared/components/Checkbox/Checkbox';
import { useEntity } from '@shared/hooks/useEntity';

import styles from './ExtensionListModal.module.sass';

type Props = {
  extensionDetails: {
    id: string;
    name: string;
  };
  onDismiss: () => void;
  isOpen: boolean;
};

export const ExtensionListModal = ({ extensionDetails, isOpen, onDismiss }: Props) => {
  const { entity } = useEntity<TEntity>();

  const [unassignExtension, { loading }] = useMutation<
    TUnassignExtensionFieldFromEntityData,
    TUnassignExtensionFieldFromEntityVariables
  >(UNASSIGN_EXTENSION_FIELD_FROM_ENTITY);

  const { t } = useTranslation();

  const [unassignFromHierarchy, setUnassignFromHierarchy] = useState(false);
  const handleUnassignExtension = async () => {
    if (extensionDetails) {
      try {
        await unassignExtension({
          variables: {
            input: {
              entityUuid: entity.uuid,
              extensionFieldId: extensionDetails.id,
              unassignFromHierarchy: unassignFromHierarchy,
            },
          },
          refetchQueries: [{ query: ADMIN_ENTITY_INFO_QUERY, variables: { uuid: entity.uuid } }],
        });
        onDismiss();
      } catch (e) {
        //@ts-ignore
        getFormErrors(e);
      }
    }
  };

  return (
    <SharedModal isOpen={isOpen} onDismiss={onDismiss}>
      <SharedModal.Header>
        <SharedModal.Heading type='h3'>
          {t('entityInfo.extensionFields.unassign')}
        </SharedModal.Heading>
      </SharedModal.Header>
      <SharedModal.Body className={styles.body}>
        <label className={styles.assignLabel}>
          {t('entityInfo.extensionFields.unassignFrom', { name: extensionDetails.name })}:
        </label>
        <span className={styles.entityName}>{entity.name}</span>
        <SharedCheckbox
          checked={unassignFromHierarchy}
          label={t('entityInfo.extensionFields.unassignFromChildren')}
          onChange={() => setUnassignFromHierarchy(!unassignFromHierarchy)}
        />
      </SharedModal.Body>
      <SharedModal.Footer align='center'>
        <SharedModal.Button isLoading={loading} variant='primary-outlined' onClick={onDismiss}>
          {t('common.actions.cancel')}
        </SharedModal.Button>
        <SharedModal.Button
          disabled={!extensionDetails}
          isLoading={loading}
          variant='primary'
          onClick={handleUnassignExtension}>
          {t('common.actions.save')}
        </SharedModal.Button>
      </SharedModal.Footer>
    </SharedModal>
  );
};
