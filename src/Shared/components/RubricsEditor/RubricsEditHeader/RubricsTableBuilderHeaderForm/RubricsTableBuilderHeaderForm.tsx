import { Form, useField, useFormikContext } from 'formik';
import { useTranslation } from 'react-i18next';

import SharedRoleGuard from '@dc/shared/RoleGuard/RoleGuard';
import { ReactComponent as Cancel } from '@dc/svg/clear.svg';

import { TextInput } from '@shared/components/TextInput/TextInput';
import { ReactComponent as DoneIcon } from '@shared/svg/done.svg';
import DeprecatedIconButton from '@shared/components/DeprecatedIconButton/DeprecatedIconButton';

type Props = {
  onClose: () => void;
};

export const RubricsTableBuilderHeaderForm = ({ onClose }: Props) => {
  const [nameInput, nameMeta] = useField('name');
  const [displayNameInput] = useField('displayName');
  const { isSubmitting } = useFormikContext();
  const { t } = useTranslation();

  const nameError = nameMeta.touched && nameMeta.error;

  return (
    <Form className='w-full'>
      <div className='mb-sm flex gap-sm'>
        <div className='flex flex-col gap-xs grow'>
          <TextInput
            data-testid='rubric-header-input'
            errorMessage={nameError || undefined}
            field={nameInput}
            placeholder={t('admin.rubrics.namePlaceholder')}
          />
          <SharedRoleGuard.SystemAdmin>
            <TextInput
              data-testid='rubric-header-display-name-input'
              field={displayNameInput}
              placeholder={t('admin.rubrics.displayNamePlaceholder')}
            />
          </SharedRoleGuard.SystemAdmin>
        </div>
        <div className='rubrics-builder__form-buttons -inline -margin-left mr-sm'>
          <DeprecatedIconButton
            className='rubrics-builder__submit'
            data-testid='rubric-header-submit'
            disabled={isSubmitting}
            icon={<DoneIcon className='rubrics-builder__form-icon' />}
            size='sm'
            square={true}
            type='submit'
          />
          <DeprecatedIconButton
            className='rubrics-builder__cancel'
            data-testid='rubric-header-cancel'
            icon={<Cancel className='rubrics-builder__form-icon' />}
            size='sm'
            square={true}
            onClick={onClose}
          />
        </div>
      </div>
    </Form>
  );
};
