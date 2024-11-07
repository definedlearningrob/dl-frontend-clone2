import { useHistory } from 'react-router-dom';
import { useWizard } from 'react-use-wizard';
import { useTranslation } from 'react-i18next';
import { t } from 'i18next';

import Button from '@shared/components/Button/Button';

import styles from './ActionButtons.module.sass';

type Props = {
  isDataEmpty: boolean;
  canGoForward: boolean;
  onGoBack?: () => void;
};
const buttonLabelMap: { [index: number]: string } = {
  0: t('user.standardSearch.backToDashboard'),
  1: t('user.standardSearch.previous'),
  2: t('user.standardSearch.previous'),
  3: t('user.standardSearch.back'),
};

const ActionButtons = ({ isDataEmpty, canGoForward, onGoBack }: Props) => {
  const { t } = useTranslation();
  const { nextStep, previousStep, isLastStep, isFirstStep, activeStep } = useWizard();
  const history = useHistory();

  const handleOnClick = () => {
    onGoBack && onGoBack();
    if (isFirstStep) {
      history.goBack();
    } else {
      previousStep();
    }
  };

  const buttonLabelKey = isLastStep ? 'cancel' : 'previous';
  const buttonText = t(`user.standardSearch.${buttonLabelKey}`);

  if (isDataEmpty) {
    return (
      <div className={styles.container}>
        <Button className={styles.button} size='md' variant='primary' onClick={handleOnClick}>
          {buttonLabelMap[activeStep]}
        </Button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Button
        className={styles.button}
        size='md'
        variant='primary-outlined'
        onClick={handleOnClick}>
        {buttonText}
      </Button>
      {!isLastStep && (
        <Button
          className={styles.button}
          disabled={!canGoForward}
          size='md'
          variant='primary'
          onClick={nextStep}>
          {t('user.standardSearch.next')}
        </Button>
      )}
    </div>
  );
};

export default ActionButtons;
