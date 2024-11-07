import { useTranslation } from 'react-i18next';

import Button from '@shared/components/Button/Button';

type Props = {
  isLoading: boolean;
  onCancel: () => void;
};

export const FormActions = ({ isLoading, onCancel }: Props) => {
  const { t } = useTranslation();

  return (
    <div className='flex gap-base justify-end'>
      <Button isLoading={isLoading} minWidth='lg' variant='primary-outlined' onClick={onCancel}>
        {t('common.actions.cancel')}
      </Button>
      <Button isLoading={isLoading} minWidth='lg' type='submit' value='Save' variant='primary'>
        {t('common.actions.save')}
      </Button>
    </div>
  );
};
