import React from 'react';
import { useFormikContext } from 'formik';
import { useTranslation } from 'react-i18next';

import styles from '@dc/components/Admin/Entity/CustomMessageCreator/BrandingFormForm.module.sass';
import { LogoDetails, UpdateEntityInput } from '@dc/graphql/user/mutations/updateEntity';
import { useDefaultMessage } from '@dc/components/Admin/Entity/CustomMessageCreator/useDefaultMessage';

import SharedButton from '@shared/components/Button/Button';
type Props = {
  toggleCustomEditorModal: () => void;
};

export const MessageActions = ({ toggleCustomEditorModal }: Props) => {
  const { t } = useTranslation();
  const { studentInitialMessage, teacherInitialMessageDC, teacherInitialMessageDL } =
    useDefaultMessage();
  const { dirty, setFieldValue } = useFormikContext<UpdateEntityInput>();

  const InitialLogoDetails: LogoDetails = { uuid: null, filename: null, url: '' };
  const InitialWelcomeMessage = {
    dcStudent: studentInitialMessage,
    dcTeacher: teacherInitialMessageDC,
    dlStudent: studentInitialMessage,
    dlTeacher: teacherInitialMessageDL,
  };

  const handleFormReset = async () => {
    setFieldValue('dcLogo', InitialLogoDetails);
    setFieldValue('dcIcon', InitialLogoDetails);
    setFieldValue('dlLogo', InitialLogoDetails);
    setFieldValue('dlIcon', InitialLogoDetails);
    setFieldValue('welcomeMessage', InitialWelcomeMessage);
  };

  return (
    <div className='flex justify-end mx-auto mt-md gap-sm'>
      <SharedButton
        className={styles.button}
        size='md'
        variant='primary-outlined'
        onClick={handleFormReset}>
        {t('common.actions.resetToDefault')}
      </SharedButton>
      <SharedButton
        className={styles.button}
        disabled={!dirty}
        size='md'
        variant='primary'
        onClick={toggleCustomEditorModal}>
        {t('common.actions.save')}
      </SharedButton>
    </div>
  );
};
