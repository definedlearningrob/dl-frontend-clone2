import { ChangeEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import SharedTextEditor from '@dc/shared/TextEditor/TextEditor';
import usePresentationBuilder from '@dc/hooks/usePresentationBuilder';
import { StatusSelector } from '@dc/components/Admin/Tasks/PresentationBuilder/Settings/Presentation/StatusSelector';
import { TypographySelector } from '@dc/components/Admin/Tasks/PresentationBuilder/Settings/Presentation/TypographySelector';

import { TextInput } from '@shared/components/TextInput/TextInput';
import { useFeatureFlags } from '@shared/components/FeatureProvider';

import { PresentationTypeSelector } from './PresesntationTypeSelector';

function AdminTasksPresentationBuilderSettingsPresentationSettings() {
  const { projectId } = useParams<{ projectId: string }>();
  const { t } = useTranslation();
  const { currentPresentation, handleUpdatePresentation } = usePresentationBuilder();
  const [name, setName] = useState(currentPresentation.name);
  const [description, setDescription] = useState(currentPresentation.description);

  const { QUICK_PROJECT_ON } = useFeatureFlags();

  const isOnPBL = Boolean(projectId);

  const handleOnBlurEvent = (value: { name: string } | { description: string }) => () => {
    handleUpdatePresentation({
      ...value,
    });
  };

  const handleChangePresentationName = (event: ChangeEvent<HTMLInputElement>) => {
    const newPresentationName = event.target.value;

    setName(newPresentationName);
  };

  return (
    <div className='flex flex-col gap-sm animate-fadeDropIn [&>*:not(:last-child)]:border-b [&>*:not(:last-child)]:pb-sm [&>*:not(:last-child)]:!border-neutral-400'>
      {!isOnPBL && <StatusSelector />}
      <TextInput
        data-testid='presentation-builder-name-input'
        label={t('admin.tasks.presentation.nameLabel')}
        value={name}
        onBlur={handleOnBlurEvent({ name })}
        onChange={handleChangePresentationName}
      />
      {/* if at any point in development it is necessary to export a presentation to pdf,
      all logic is in one component AdminTasksPresentationBuilderSettingsPresentationSettingsExportPdf */}
      <div className='[&_label]:!gap-xxs'>
        <SharedTextEditor
          data-testid='presentation-builder-description-input'
          editorConfig={{
            value: description,
            onChange: setDescription,
            onBlur: handleOnBlurEvent({ description }),
          }}
          label={t('admin.tasks.presentation.descriptionLabel')}
        />
      </div>
      <TypographySelector />
      {QUICK_PROJECT_ON && <PresentationTypeSelector />}
    </div>
  );
}

export default AdminTasksPresentationBuilderSettingsPresentationSettings;
