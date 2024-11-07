import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { EntitySettingsModal } from '@shared/components/EntityInfo';
import SharedButton from '@shared/components/Button/Button';
import { useEntity } from '@shared/hooks/useEntity';

export const EntitySettings = () => {
  const { t } = useTranslation();
  const { saveEntitySetting, entity } = useEntity();
  const { name, settings } = entity;

  const [toggleEntitySettingsModal, setToggleEntitySettingsModal] = useState(false);

  return (
    <>
      <SharedButton
        data-testid='entity-settings-button'
        variant='primary-outlined'
        onClick={() => setToggleEntitySettingsModal(true)}>
        {t('entityInfo.entitySettings')}
      </SharedButton>
      <EntitySettingsModal
        entityName={name}
        settings={settings}
        showModal={toggleEntitySettingsModal}
        onClose={() => setToggleEntitySettingsModal(!toggleEntitySettingsModal)}
        onSave={saveEntitySetting}
      />
    </>
  );
};
