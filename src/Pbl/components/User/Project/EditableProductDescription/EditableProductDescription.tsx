/* eslint-disable react/no-danger */
import { useTranslation } from 'react-i18next';

import useCustomizeProject from '@pbl/hooks/useCustomizeProject';

import { cleanInjection } from '@shared/utils/cleanInjection';
import SharedFormTextEditor from '@shared/components/FormTextEditor/FormTextEditor';

import styles from './EditableProductDescription.module.sass';

type Props = {
  description: string;
  isEditing: boolean;
};

export const EditableProductDescription = ({ description, isEditing }: Props) => {
  const { editMode } = useCustomizeProject();
  const { t } = useTranslation();

  if (!editMode || !isEditing) {
    return (
      <div
        dangerouslySetInnerHTML={cleanInjection(description)}
        className={styles.description}
        data-testid='user-project-description'
      />
    );
  }

  return (
    <SharedFormTextEditor
      label='Description'
      name='description'
      placeholder={t('common.fields.common.description')}
    />
  );
};
