import { isEmpty } from 'lodash-es';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

import { StudentProductActions } from '@pbl/components/Student/Project/Products/StudentProductActions';

import SharedButton from '@shared/components/Button/Button';
import { useFeatureFlags } from '@shared/components/FeatureProvider';

import RubricsActions from '../RubricsActions/RubricsActions';
import { TProduct } from '../../types';

import styles from './ProductActions.module.sass';

type Props = {
  isGradingAllowed: boolean;
  isStudent: boolean;
  product: TProduct;
  onModalOpen: (product: TProduct) => void;
};

export const ProductActions = ({ isGradingAllowed, isStudent, product, onModalOpen }: Props) => {
  const isGraded = !!product.submission?.grade;
  const { t } = useTranslation();
  const history = useHistory();
  const { QUICK_PROJECT_ON } = useFeatureFlags();

  return (
    <div className={styles.wrapper}>
      {!isEmpty(product.quickTask) && QUICK_PROJECT_ON && (
        <SharedButton
          size='sm'
          variant='primary-outlined'
          onClick={() => history.push(`/projects/${product.quickTask?.id}`)}>
          {t('project.viewQuickProject')}
        </SharedButton>
      )}
      {!isEmpty(product.rubrics) && (
        <RubricsActions
          isGraded={isGraded}
          isGradingAllowed={isGradingAllowed}
          openModal={onModalOpen}
          product={product}
        />
      )}
      {isStudent && <StudentProductActions isGraded={isGraded} />}
    </div>
  );
};
