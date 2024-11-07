import { useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import { useField, useFormikContext } from 'formik';
import { useTranslation } from 'react-i18next';

import duplicateRubricMutation from '@dc/graphql/user/mutations/duplicateRubric';
import archiveRubricMutation from '@dc/graphql/user/mutations/archiveRubric';
import { removeFromCache } from '@dc/utils/graphql';
import SharedTextEditor from '@dc/shared/TextEditor/TextEditor';

import { RubricsEditHeaderValues } from '@shared/components/RubricsEditor/RubricsEditHeader/RubricsEditHeader';
import { ReactComponent as Delete } from '@shared/svg/delete_outlined.svg';
import { ReactComponent as Duplicate } from '@shared/svg/duplicate.svg';
import { Tooltip } from '@shared/components/Tooltip';
import { TextInput } from '@shared/components/TextInput/TextInput';
import { callToast } from '@shared/components/Toaster/Toaster';
import { useUserRole } from '@shared/graphql/user/hooks/useUserRole';
import { IconButton } from '@shared/components/IconButton/IconButton';

export const RubricsEditHeaderForm = () => {
  const history = useHistory();

  const [duplicateRubric] = useMutation(duplicateRubricMutation);
  const [archiveRubric] = useMutation(archiveRubricMutation);

  const { t } = useTranslation();
  const { isSystemAdmin } = useUserRole();

  const {
    values: { id, description },
    setFieldValue,
    submitForm,
    errors,
  } = useFormikContext<RubricsEditHeaderValues>();

  const [nameField] = useField('name');
  const [displayNameField] = useField('displayName');

  const handleDuplicateRubric = async () => {
    try {
      const { data } = await duplicateRubric({
        variables: {
          input: {
            id,
          },
        },
      });
      callToast('success', t('admin.rubrics.duplicate.success'));
      const newId = data.duplicateRubric.rubric.id;
      history.push(`/admin/rubrics/${newId}/edit`);
    } catch (error) {
      callToast('error', t('admin.rubrics.duplicate.error'));
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

  const handleArchiveRubric = async () => {
    try {
      await archiveRubric({
        variables: {
          input: {
            id,
          },
        },
        update: removeFromCache(id, 'Rubric'),
      });
      callToast(
        'success',
        t('common.notifications.success.archived', { name: t('admin.rubrics.label') })
      );
      history.goBack();
    } catch (error) {
      callToast('error', t('admin.rubrics.archive.error'));
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };
  const handleDescriptionChange = (value: string) => {
    setFieldValue('description', value);
  };

  return (
    <>
      <div className='rubrics-builder__header' data-testid='rubric-header'>
        <h5 className='text-xs xxxl:text-sm'>{t('components.rubric.mainInformation')}</h5>
        {isSystemAdmin && (
          <div className='flex gap-xxs'>
            <Tooltip delayDuration={200} message={t('common.actions.duplicate')}>
              <IconButton
                Icon={Duplicate}
                aria-label={t('common.actions.duplicate')}
                className='rubrics-builder__duplicate'
                data-testid='rubric-duplicate-button'
                size='md'
                onClick={handleDuplicateRubric}
              />
            </Tooltip>
            <Tooltip delayDuration={200} message={t('common.actions.archive')}>
              <IconButton
                Icon={Delete}
                aria-label={t('common.actions.archive')}
                data-testid='rubric-archive-button'
                size='md'
                variant='danger'
                onClick={handleArchiveRubric}
              />
            </Tooltip>
          </div>
        )}
      </div>
      <div className='mb-sm xxxl:mb-base flex flex-col gap-sm'>
        <div className='flex w-full gap-sm items-start'>
          <TextInput
            className='basis-1/2'
            data-testid='rubric-name-input'
            errorMessage={errors.name}
            field={nameField}
            isRequired={true}
            label={t('components.rubric.name')}
            onBlur={submitForm}
          />
          {isSystemAdmin && (
            <TextInput
              className='basis-1/2'
              data-testid='rubric-displayname-input'
              errorMessage={errors.displayName}
              field={displayNameField}
              isRequired={false}
              label={t('components.rubric.displayName')}
              onBlur={submitForm}
            />
          )}
        </div>
        <SharedTextEditor
          data-testid='rubric-description-input'
          editorConfig={{
            value: description,
            onChange: handleDescriptionChange,
            onBlur: submitForm,
          }}
          errorMessage={errors.description}
          isRequired={true}
          label={t('common.fields.common.description')}
          labelClass='!text-xs'
        />
      </div>
    </>
  );
};
