import cx from 'classnames';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { TProduct } from '@pbl/components/Project/types';

import SharedButton from '@shared/components/Button/Button';
import DeprecatedTooltip from '@shared/components/DeprecatedTooltip/DeprecatedTooltip';
import Link from '@shared/components/Link';

type Props = {
  isGradingAllowed?: boolean;
  product: TProduct;
  isGraded?: boolean;
  openModal: (product: TProduct) => void;
};

const RubricsActions = ({ isGradingAllowed, product, isGraded, openModal }: Props) => {
  const { t } = useTranslation();
  const { projectId } = useParams<{ projectId: string }>();

  const gradingCount = product.submissionsGradingNeededCount;

  return (
    <>
      <DeprecatedTooltip message={t('products.rubrics')} variant='dark'>
        <SharedButton
          className='whitespace-nowrap'
          size='sm'
          variant='primary-outlined'
          onClick={() => openModal(product)}>
          {isGraded ? t('products.viewGrading') : t('products.rubrics')}
        </SharedButton>
      </DeprecatedTooltip>
      {isGradingAllowed && (
        <DeprecatedTooltip
          className='grading-tooltip'
          disabled={product.submissionsGradingNeededCount > 0}
          message={t('user.grading.nothingToGrade')}
          variant='dark'>
          <Link
            className={cx('whitespace-nowrap', {
              ['opacity-70']: gradingCount < 1,
            })}
            size='sm'
            to={`/projects/${projectId}/grading/products/${product.id}`}
            variant='secondary'>
            {t('project.rubric.grade', { count: gradingCount })}
          </Link>
        </DeprecatedTooltip>
      )}
    </>
  );
};

export default RubricsActions;
