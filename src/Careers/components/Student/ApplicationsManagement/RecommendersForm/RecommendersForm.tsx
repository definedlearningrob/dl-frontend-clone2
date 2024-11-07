import { Form, useFormikContext } from 'formik';
import { useTranslation } from 'react-i18next';

import SharedModal from '@shared/components/Modal/Modal';
import { ProgressBarWithSteps } from '@shared/components/ProgressBarWithSteps';
import { SelectList } from '@shared/components/SelectList';
import { SelectOption } from '@shared/components/Select';

import styles from './RecommendersForm.module.sass';

type Props = {
  availableTeachersOptions: SelectOption[];
  closeModal: () => void;
  maxSelectedRecommenders: number;
  minSelectedRecommenders: number;
};

export const RecommendersForm = ({
  availableTeachersOptions,
  closeModal,
  maxSelectedRecommenders,
  minSelectedRecommenders,
}: Props) => {
  const { t } = useTranslation();
  const { dirty, isSubmitting, values } = useFormikContext<{ recommenders: SelectOption[] }>();
  const currentlySelectedRecommendersCount = values.recommenders.length;
  const isSubmitDisabled = currentlySelectedRecommendersCount < minSelectedRecommenders || !dirty;
  const isOptionDisabled = (option: SelectOption) =>
    currentlySelectedRecommendersCount === maxSelectedRecommenders &&
    !values.recommenders.some((recommender) => recommender?.value === option?.value);

  return (
    <Form>
      <SharedModal.Header>
        <SharedModal.Heading>
          {t('student.postSecondary.recommendersSection.recommendersHeading')}
        </SharedModal.Heading>
      </SharedModal.Header>
      <SharedModal.Body className={styles.modalBody}>
        <p className={styles.message}>
          {minSelectedRecommenders === maxSelectedRecommenders
            ? t('student.postSecondary.recommendersSection.equalRecommendersMessage', {
                value: minSelectedRecommenders,
              })
            : t('student.postSecondary.recommendersSection.recommendersMessage', {
                minSelectedRecommenders,
                maxSelectedRecommenders,
              })}
        </p>
        <ProgressBarWithSteps
          className={styles.progressBar}
          currentStep={currentlySelectedRecommendersCount}
          minSteps={minSelectedRecommenders}
          totalSteps={maxSelectedRecommenders}
        />
        <p className={styles.selectedInfo}>
          {t('student.postSecondary.recommendersSection.selected')}
          <span>{`${currentlySelectedRecommendersCount}/${maxSelectedRecommenders}`}</span>
        </p>
        <SelectList
          className={styles.selectList}
          data-showAvatar={true}
          hideSelectedOptions={false}
          id='recommenders'
          isClearable={false}
          isMulti={true}
          isOptionDisabled={isOptionDisabled}
          maxMenuHeight={200}
          menuIsOpen={true}
          minMenuHeight={200}
          name='recommenders'
          options={availableTeachersOptions}
          placeholder={t('student.postSecondary.recommendersSection.selectPlaceholder')}
        />
      </SharedModal.Body>
      <SharedModal.Footer>
        <SharedModal.Button
          data-testid='close-button'
          variant='primary-outlined'
          onClick={closeModal}>
          {t('common.actions.cancel')}
        </SharedModal.Button>
        <SharedModal.Button
          data-testid='submit-button'
          disabled={isSubmitDisabled}
          isLoading={isSubmitting}
          type='submit'
          variant='primary'>
          {t('student.postSecondary.recommendersSection.recommendersButton')}
        </SharedModal.Button>
      </SharedModal.Footer>
    </Form>
  );
};
