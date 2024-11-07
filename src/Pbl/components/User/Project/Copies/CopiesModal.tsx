import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import PROJECT_COPIES, {
  type TProjectCopesData,
  type TProjectCopiesVariables,
} from '@pbl/graphql/user/queries/projectCopies';

import SharedDataLoader from '@shared/components/DataLoader/DataLoader';
import SharedModal from '@shared/components/Modal/Modal';

import createListTree from './Tree/Tree';
import styles from './CopiesModal.module.sass';

type Props = {
  displayName: string;
  isOpen: boolean;
  onDismiss: () => void;
};

const UserProjectCopiesModal = ({ displayName, isOpen, onDismiss }: Props) => {
  const { projectId } = useParams<{ projectId: string }>();
  const { t } = useTranslation();

  return (
    <SharedModal isOpen={isOpen} onDismiss={onDismiss}>
      <SharedModal.Header>
        <SharedModal.Heading>
          {t('user.project.copies.header', { displayName })}
        </SharedModal.Heading>
      </SharedModal.Header>
      <SharedModal.Body>
        <p>{t('user.project.copies.description')}</p>
        <SharedDataLoader<TProjectCopesData, TProjectCopiesVariables>
          options={{ variables: { id: projectId }, fetchPolicy: 'network-only' }}
          query={PROJECT_COPIES}>
          {({ project }) => (
            <section className={styles.body}>
              <h4 className={styles.header}>{displayName}</h4>
              <ul>{createListTree(project.copies)}</ul>
            </section>
          )}
        </SharedDataLoader>
      </SharedModal.Body>
      <SharedModal.Footer>
        <SharedModal.Button variant='primary-outlined' onClick={onDismiss}>
          {t('common.actions.cancel')}
        </SharedModal.Button>
      </SharedModal.Footer>
    </SharedModal>
  );
};
export default UserProjectCopiesModal;
