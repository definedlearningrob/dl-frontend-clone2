import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import DeprecatedIconButton from '@shared/components/DeprecatedIconButton/DeprecatedIconButton';
import { ReactComponent as LeftArrowIcon } from '@shared/svg/arrow_backward.svg';

type Props = {
  destination?: string;
  onBack?: () => void;
  text?: string | null;
};

export const BackNavButton = ({ destination, onBack, text }: Props) => {
  const history = useHistory();
  const { t } = useTranslation();

  const handleClick = () => {
    if (destination) {
      return history.push(destination);
    }

    history.goBack();

    onBack && onBack();
  };

  return (
    <div className='flex items-center text-primary-500 weight-medium' data-testid='back-button'>
      <DeprecatedIconButton
        aria-label={t('common.actions.back')}
        className='app-header-breadcrumbs__back-icon'
        icon={<LeftArrowIcon />}
        size='xs'
        onClick={handleClick}
      />
      <span
        className='app-header-breadcrumbs__back-text'
        data-testid='breadcrumbs-back-text'
        onClick={handleClick}>
        {text || t('navigation.back')}
      </span>
    </div>
  );
};
