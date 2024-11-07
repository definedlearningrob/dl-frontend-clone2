import { useTranslation } from 'react-i18next';
import { ChangeEvent, useState } from 'react';
import { useField } from 'formik';
import { useParams } from 'react-router-dom';
import { isEmpty } from 'lodash-es';

import { useCreateTag } from '@dc/graphql/user/hooks/useCreateTag';
import { TagTypes } from '@dc/resources/enums';

import { ReactComponent as TagsIcon } from '@shared/assets/icons/tag_icon.svg';
import SharedModal from '@shared/components/Modal/Modal';
import { TextInput } from '@shared/components/TextInput/TextInput';

type Props = {
  onClose: () => void;
};

export const AddTagModal = ({ onClose }: Props) => {
  const { t } = useTranslation();
  const [itemsInput, , itemsHelpers] = useField('tags');
  const [newTagName, setNewTagName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { createTag } = useCreateTag();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setErrorMessage('');
    setNewTagName(event.target.value);
  };

  const { entityUuid } = useParams<{ entityUuid: string }>();

  const saveTag = async () => {
    if (isEmpty(newTagName)) {
      setErrorMessage(t('validation.messages.required'));

      return;
    }

    const tag = {
      name: newTagName,
      isDefault: false,
      type: TagTypes.ENTITY,
    };

    const res = await createTag(tag, {
      update: (cache, { data }) => {
        const tag = data?.createTag.tag;

        if (!tag) return;

        cache.modify({
          id: cache.identify({ uuid: entityUuid, __typename: 'Entity' }),
          fields: {
            tags: (existingTags) => {
              const newTagRef = { __ref: cache.identify(tag) };

              return [...existingTags, newTagRef];
            },
          },
        });
      },
    });

    if (res.result) {
      const { data } = res.result;
      itemsHelpers.setValue([...itemsInput.value, data?.createTag.tag]);
      onClose();
    }
  };

  return (
    <SharedModal data-testid='settings-modal' isOpen={true} onDismiss={onClose}>
      <SharedModal.Header>
        <SharedModal.Heading>
          {t('admin.performanceIndicators.addNewPerformanceIndicators')}
        </SharedModal.Heading>
      </SharedModal.Header>
      <SharedModal.Body>
        <p className='text-neutral-700 block text-base mb-sm'>
          {t('admin.performanceIndicators.addNewPerformanceIndicatorsInfo')}
        </p>
        <div className='justify-center'>
          <TextInput
            Icon={TagsIcon}
            errorMessage={errorMessage}
            iconPlacement='start'
            isRequired={true}
            label={t('admin.performanceIndicators.performanceIndicatorName')}
            placeholder={t('admin.performanceIndicators.enterName')}
            type='text'
            value={newTagName}
            onChange={handleChange}
          />
        </div>
      </SharedModal.Body>
      <SharedModal.Footer>
        <SharedModal.Button variant='primary-outlined' onClick={onClose}>
          {t('common.actions.cancel')}
        </SharedModal.Button>
        <SharedModal.Button data-testid='save-settings-button' variant='primary' onClick={saveTag}>
          {t('common.actions.create')}
        </SharedModal.Button>
      </SharedModal.Footer>
    </SharedModal>
  );
};
