/* eslint-disable react/no-danger */
import { isEmpty } from 'lodash-es';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { TProduct } from '@pbl/components/Project/types';
import useCustomizeProject from '@pbl/hooks/useCustomizeProject';
import { ProductsForm } from '@pbl/components/Project/Products/ProductsForm/ProductsForm';

import EmptyState from '@shared/components/EmptyState/EmptyState';
import { useRole } from '@shared/hooks/useRole';

import { ProductRubricsModal } from './ProductRubricsModal/ProductRubricsModal';
import { Product } from './Product';
import styles from './Products.module.sass';

type Props = {
  isGradingAllowed?: boolean;
  products: TProduct[];
  canSubmit?: boolean;
};
export const ProjectProducts = ({ isGradingAllowed, products = [], canSubmit }: Props) => {
  const [pickedProduct, setPickedProduct] = useState<TProduct | null>(null);
  const { isOwner, editMode } = useCustomizeProject();
  const { t } = useTranslation();
  const { isStudent } = useRole();
  const { productId } = useParams<{ productId?: string }>();

  const openModal = (product: TProduct) => {
    setPickedProduct(product);
  };

  const onClose = () => {
    setPickedProduct(null);
  };

  const visibleProducts = editMode ? products : products.filter((product) => !product.hidden);

  if (isEmpty(visibleProducts) && !editMode) {
    return <EmptyState heading={t('project.emptyState.noProducts')} />;
  }

  const filteredProducts = productId
    ? [visibleProducts.find((product) => product.id === productId)]
    : visibleProducts;

  return (
    <section className={styles.list}>
      {editMode && <ProductsForm />}
      {filteredProducts.map((product) => {
        if (product !== undefined) {
          return (
            <Product
              key={product.id}
              canSubmit={!!canSubmit}
              isGradingAllowed={!!isGradingAllowed}
              isOwner={isOwner}
              isStudent={isStudent}
              product={product}
              onModalOpen={openModal}
            />
          );
        }
      })}
      {pickedProduct && (
        <ProductRubricsModal
          grade={pickedProduct.submission?.grade}
          productName={pickedProduct.displayName || pickedProduct.name}
          rubrics={pickedProduct.rubrics}
          onClose={onClose}
        />
      )}
    </section>
  );
};
