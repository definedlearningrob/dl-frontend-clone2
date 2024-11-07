import { useTranslation } from 'react-i18next';
import { useFormikContext } from 'formik';

import SharedModal from '@shared/components/Modal/Modal';

type Props = {
  onCancel: () => void;
  isReadOnly: boolean;
};

export const ApplicationActions = ({ onCancel, isReadOnly }: Props) => {
  const { t } = useTranslation();
  const { isSubmitting } = useFormikContext();

  const closeButtonKey = isReadOnly ? 'common.actions.close' : 'common.actions.cancel';

  return (
    <>
      <SharedModal.Button
        className='min-w-[120px]'
        size='md'
        variant='primary-outlined'
        onClick={onCancel}>
        {t(closeButtonKey)}
      </SharedModal.Button>
      {!isReadOnly && (
        <SharedModal.Button
          className='min-w-[120px]'
          disabled={isSubmitting}
          size='md'
          type='submit'
          variant='primary'>
          {t('opportunities.opportunitiesModal.send')}
        </SharedModal.Button>
      )}
    </>
  );
};
