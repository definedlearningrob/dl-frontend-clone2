import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { SubmissionBadge } from '@dc/components/Admin/Tasks/PresentationBuilder/Template/Product/ProductForSlide/SubmissionBadge';
import PresentationModal from '@dc/components/Admin/Tasks/PresentationBuilder/PresentationModal/PresentationModal';
import { ProductRubricsModal } from '@dc/components/Admin/Tasks/PresentationBuilder/Template/Product/ProductForSlide/ProductRubricsModal/ProductRubricsModal';

import { TProduct } from '@pbl/components/Project/types';
import { ProductActions } from '@pbl/components/Project/Products/ProductActions';
import useCustomizeProject from '@pbl/hooks/useCustomizeProject';

import Card from '@shared/components/Card/Card';
import { cleanInjection } from '@shared/utils/cleanInjection';
import { useRole } from '@shared/hooks/useRole';
import Button from '@shared/components/Button/Button';
import { useToggle } from '@shared/hooks/useToggle';
import SharedModal from '@shared/components/Modal/Modal';
import { cx } from '@shared/utils/cx';

import { SubmissionsWrapper } from './SubmissionsWrapper';

type Props = {
  product: TProduct;
  isGradingAllowed: boolean;
};

export const ProductForSlide = ({ product, isGradingAllowed }: Props) => {
  const [pickedProduct, setPickedProduct] = useState<TProduct | null>(null);

  const { t } = useTranslation();

  const { isOwner } = useCustomizeProject();

  const isInBuilder = location.pathname.includes('presentation-builder');

  const { isStudent } = useRole();

  const [isModalOpen, toggleModalOpen] = useToggle(false);

  const openModal = () => {
    setPickedProduct(product);
  };

  const onClose = () => {
    setPickedProduct(null);
  };

  if (!product)
    return (
      <Card className='min-h-[650px] w-full flex flex-col justify-center items-center'>
        <h3>{t('products.noProductSelected')}</h3>
        {!isStudent && isInBuilder && <p>{t('products.chooseProductInElementsTab')}</p>}
        {isOwner && !isInBuilder && <p>{t('products.editPresentation')}</p>}
      </Card>
    );

  const { description, displayName, name } = product;

  const descriptionClassName = cx(
    '[&&_p]:!text-base [&&_li]:!text-base',
    '[&&_p]:!leading-lg [&&_li]:leading-lg',
    '[&&_li]:mb-sm',
    '[&&_ol]:list-decimal [&&_ul]:list-disc',
    '[&&_ol]:pl-sm [&&_ul]:pl-sm',
    '[&&_img]:m-0'
  );

  return (
    <Card className='min-h-[650px] w-full'>
      <div className='text-lg'>
        <div className='flex justify-between'>
          <h2 className='text-left'>{displayName || name}</h2>
          <div className='flex gap-sm justify-center items-start'>
            <div>
              <div className='flex gap-sm'>
                <SubmissionBadge submission={product.submission!} />
                <Button
                  disabled={isInBuilder}
                  size='sm'
                  variant='primary'
                  onClick={toggleModalOpen}>
                  {t('products.submissions')}
                </Button>
              </div>
            </div>
            <ProductActions
              isGradingAllowed={isStudent && isGradingAllowed}
              isStudent={false}
              product={product}
              onModalOpen={openModal}
            />
          </div>
        </div>
        <div className='flex gap-base'>
          <div className='text-left scrollbar max-h-[500px] pr-xs xxxl:pr-sm'>
            <div
              className={descriptionClassName}
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={cleanInjection(description)}
            />
          </div>
        </div>
      </div>
      {pickedProduct && (
        <ProductRubricsModal
          grade={pickedProduct.submission?.grade}
          productName={pickedProduct.displayName || pickedProduct.name}
          rubrics={pickedProduct.rubrics}
          onClose={onClose}
        />
      )}
      {isModalOpen && (
        <PresentationModal
          container={document.getElementById('presentation-custom-container')}
          open={isModalOpen}
          onOpenChange={toggleModalOpen}>
          <PresentationModal.Header>
            <SharedModal.Heading>{t('products.submissions')}</SharedModal.Heading>
          </PresentationModal.Header>
          <PresentationModal.Body className='!mb-0'>
            <SubmissionsWrapper product={product} />
          </PresentationModal.Body>
        </PresentationModal>
      )}
    </Card>
  );
};
