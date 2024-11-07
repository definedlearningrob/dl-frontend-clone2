import { useTranslation } from 'react-i18next';
import { useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import { GraphQLError } from 'graphql';

import ARCHIVE_EXTENSION_FIELD, {
  type TArchiveExtensionFieldData,
  type TArchiveExtensionFieldVariables,
} from '@dc/graphql/user/mutations/archiveExtensionField';
import RESTORE_EXTENSION_FIELD, {
  type TRestoreExtensionFieldData,
  type TRestoreExtensionFieldVariables,
} from '@dc/graphql/user/mutations/restoreExtensionField';
import { getFormErrors, removeFromCache } from '@dc/utils/graphql';

import useClearCacheKey from '@shared/hooks/useClearCacheKey';
import SharedModal from '@shared/components/Modal/Modal';

import styles from './ArchiveModal.module.sass';

type Props = {
  id: string;
  isArchived: boolean;
  name: string;
  isOpen: boolean;
  onDismiss: () => void;
  redirectToList?: boolean;
};

type TErrorFields = {
  id: string;
};

const ExtensionFieldArchiveModal = ({
  id,
  isArchived,
  name,
  isOpen,
  redirectToList,
  onDismiss,
}: Props) => {
  const [archiveExtensionField, { loading: archiveLoading }] = useMutation<
    TArchiveExtensionFieldData,
    TArchiveExtensionFieldVariables
  >(ARCHIVE_EXTENSION_FIELD);
  const [restoreExtensionField, { loading: restoreLoading }] = useMutation<
    TRestoreExtensionFieldData,
    TRestoreExtensionFieldVariables
  >(RESTORE_EXTENSION_FIELD);
  const { clearCache } = useClearCacheKey();

  const { t } = useTranslation();
  const history = useHistory();
  const loading = archiveLoading || restoreLoading;

  const handleArchiveItem = async () => {
    try {
      await archiveExtensionField({
        variables: { input: { id } },
        update: removeFromCache(id, 'ExtensionField'),
      });

      if (redirectToList) {
        history.goBack();
      } else {
        onDismiss();
      }
    } catch (e) {
      getFormErrors<TErrorFields>(e as { graphQLErrors: GraphQLError[] });
    }
  };

  const handleUnarchiveItem = async () => {
    try {
      await restoreExtensionField({
        variables: { input: { id } },
      });

      clearCache('extensionFields');

      if (redirectToList) {
        history.goBack();
      } else {
        onDismiss();
      }
    } catch (e) {
      getFormErrors<TErrorFields>(e as { graphQLErrors: GraphQLError[] });
    }
  };

  const properAction = isArchived ? handleUnarchiveItem : handleArchiveItem;

  const headingText = isArchived
    ? t('user.dashboard.extensionFields.unarchiveTitle')
    : t('user.dashboard.extensionFields.archiveTitle');
  const bodyText = isArchived
    ? t('user.dashboard.extensionFields.unarchiveText')
    : t('user.dashboard.extensionFields.archiveText');
  const actionText = isArchived ? t('common.actions.unarchive') : t('common.actions.archive');
  const buttonVariant = isArchived ? 'primary' : 'danger';

  return (
    <SharedModal isOpen={isOpen} onDismiss={onDismiss}>
      <SharedModal.Header>
        <SharedModal.Heading type='h3'>{headingText}</SharedModal.Heading>
      </SharedModal.Header>
      <SharedModal.Body>
        <p>
          {bodyText}
          <span className={styles.extensionName}>{name}?</span>
        </p>
      </SharedModal.Body>
      <SharedModal.Footer>
        <SharedModal.Button variant='primary-outlined' onClick={onDismiss}>
          {t('common.actions.cancel')}
        </SharedModal.Button>
        <SharedModal.Button isLoading={loading} variant={buttonVariant} onClick={properAction}>
          {actionText}
        </SharedModal.Button>
      </SharedModal.Footer>
    </SharedModal>
  );
};

export default ExtensionFieldArchiveModal;
