import { useTranslation } from 'react-i18next';

import { Roles } from '@dc/resources/enums';
import SharedRoleGuard from '@dc/shared/RoleGuard/RoleGuard';
import { ARCHIVABLE_STATUSES } from '@dc/resources/constants';

import useClearCacheKey from '@shared/hooks/useClearCacheKey';
import SharedButton from '@shared/components/Button/Button';
import { ToStringLiteral } from '@shared/utils/types';
import { Select } from '@shared/components/Select';

import styles from './Header.module.sass';

type Props = {
  onModalOpen: () => void;
  scope: ToStringLiteral<typeof ARCHIVABLE_STATUSES>;
  setPage: (page: number) => void;
  setScope: (scope: ToStringLiteral<typeof ARCHIVABLE_STATUSES>) => void;
};

const ExtensionListHeader = ({ onModalOpen, scope, setPage, setScope }: Props) => {
  const { t } = useTranslation();
  const { clearCache } = useClearCacheKey();

  //@ts-ignore
  const selectScope = (scope) => {
    setPage(1);
    setScope(scope);
    clearCache('extensionFields');
    setTimeout(() => {}, 0);
  };

  return (
    <header className={styles.header}>
      <h1 className={styles.heading}>{t('user.dashboard.extensionFields.extensions')}</h1>
      <SharedRoleGuard allowedFor={[Roles.ENTITY_ADMIN, Roles.SYSTEM_ADMIN]}>
        <div className={styles.actions}>
          <SharedButton size='md' variant='primary' onClick={onModalOpen}>
            {t('user.dashboard.extensionFields.newExtension')}
          </SharedButton>
          <Select
            options={Object.values(ARCHIVABLE_STATUSES)}
            value={scope}
            onChange={selectScope}
          />
        </div>
      </SharedRoleGuard>
    </header>
  );
};

export default ExtensionListHeader;
