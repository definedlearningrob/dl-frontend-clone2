/* eslint-disable react/no-danger */
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { ProductIndividualSubmissions } from '@pbl/components/Student/Project/Products/ProductIndividualSubmission/ProductIndividualSubmissions';
import { ProductTeamSubmissions } from '@pbl/components/Student/Project/Products/ProductTeamSubmission/ProductTeamSubmissions';
import { TProduct } from '@pbl/components/Project/types';
import useUserInfo from '@pbl/hooks/useUserInfo';

import { ProductAlignedStatementsIcon } from '@shared/components/ProductAlignedStatementsIcon';
import Card from '@shared/components/Card/Card';
import { cleanInjection } from '@shared/utils/cleanInjection';

import { ProductActions } from '../ProductActions';

import styles from './UneditableProduct.module.sass';

type Props = {
  isGradingAllowed: boolean;
  isStudent: boolean;
  product: TProduct;
  onModalOpen: (product: TProduct) => void;
  canSubmit: boolean;
};
export const UneditableProduct = ({
  isGradingAllowed,
  isStudent,
  product,
  onModalOpen,
  canSubmit,
}: Props) => {
  const { t } = useTranslation();
  const { teamId } = useParams<{ teamId?: string }>();

  const { userInfo } = useUserInfo();
  const uuid = userInfo?.uuid;

  const SubmissionComponent = teamId ? ProductTeamSubmissions : ProductIndividualSubmissions;

  return (
    <>
      <Card.Header className={styles.header}>
        <div className='flex items-center gap-x xxxl:gap-sm'>
          <ProductAlignedStatementsIcon
            message={t('user.project.products.alignedStatements')}
            rubrics={product.rubrics}
          />
          <Card.Title className={styles.title} size='medium'>
            {product.displayName || product.name}
          </Card.Title>
        </div>
        <div className='flex items-center gap-sm'>
          <ProductActions
            isGradingAllowed={isGradingAllowed}
            isStudent={isStudent}
            product={product}
            onModalOpen={onModalOpen}
          />
        </div>
      </Card.Header>
      <Card.Body className={styles.body}>
        <div
          dangerouslySetInnerHTML={cleanInjection(product.description)}
          data-testid='user-project-description'
        />
        {isStudent && canSubmit && (
          <SubmissionComponent
            openModal={() => onModalOpen(product)}
            productId={product.id}
            submission={product.submission!}
            uuid={uuid}
          />
        )}
      </Card.Body>
    </>
  );
};
