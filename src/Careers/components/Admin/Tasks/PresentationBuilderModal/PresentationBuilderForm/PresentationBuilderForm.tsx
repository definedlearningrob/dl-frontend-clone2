import { Form, useField } from 'formik';
import { useTranslation } from 'react-i18next';

import SharedTextEditor from '@dc/shared/TextEditor/TextEditor';

import SharedModal from '@shared/components/Modal/Modal';
import SharedButton from '@shared/components/Button/Button';
import SharedFormTextInput from '@shared/components/FormTextInput/FormTextInput';

type Props = {
  errors: {
    description?: string;
    name?: string;
  };
  handleCloseModal: () => void;
  touched: {
    description?: boolean;
    name?: boolean;
  };
};

function PresentationBuilderForm({ errors, handleCloseModal, touched }: Props) {
  const { t } = useTranslation();
  const [descriptionInput, , descriptionHelpers] = useField('description');

  return (
    <Form>
      <SharedModal.Body className='flex flex-col gap-sm'>
        <SharedFormTextInput
          data-testid='presentation-builder-name-input'
          isRequired={true}
          label={t('admin.tasks.presentation.nameLabel')}
          name='name'
        />
        <SharedTextEditor
          data-testid='presentation-builder-description-input'
          editorConfig={{ value: descriptionInput.value, onChange: descriptionHelpers.setValue }}
          errorMessage={touched.description && errors.description}
          label={t('admin.tasks.presentation.descriptionLabel')}
        />
      </SharedModal.Body>
      <SharedModal.Footer>
        <SharedButton
          className='image-input__preview-button'
          data-testid='presentation-builder-modal-cancel'
          variant='primary-outlined'
          onClick={handleCloseModal}>
          {t('common.actions.cancel')}
        </SharedButton>
        <SharedButton
          className='image-input__preview-button'
          data-testid='presentation-builder-modal-create'
          type='submit'
          variant='primary'>
          {t('common.actions.create')}
        </SharedButton>
      </SharedModal.Footer>
    </Form>
  );
}

export default PresentationBuilderForm;
