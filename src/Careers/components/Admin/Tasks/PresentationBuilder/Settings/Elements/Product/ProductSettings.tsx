import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { isEmpty } from 'lodash-es';
import { useTranslation } from 'react-i18next';
import { useProductsOverviewQuery } from '@graphql/shared/users/hooks';

import usePresentationBuilder from '@dc/hooks/usePresentationBuilder';

import { Select } from '@shared/components/Select';
import { handleError } from '@shared/utils/handleError';

export const ProductSettings = () => {
  const { t } = useTranslation();
  const { taskId, projectId } = useParams<{ taskId: string; projectId: string }>();

  const { data } = useProductsOverviewQuery({
    variables: { id: taskId || projectId },
  });

  const { currentSlide, isSaving, handleUpdateSlide } = usePresentationBuilder();
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

  const options =
    data?.task?.products.map((product) => ({
      value: product.id,
      label: product.displayName || product.name,
    })) || [];

  useEffect(() => {
    if (currentSlide && !isEmpty(currentSlide.products)) {
      setSelectedProduct(currentSlide.products[0].id);
    } else {
      setSelectedProduct(null);
    }
  }, [currentSlide]);

  const handleProductSelect = async (productId: string) => {
    if (currentSlide) {
      try {
        await handleUpdateSlide(null, {
          products: [{ productId: productId }],
        });
        setSelectedProduct(productId);
      } catch (error) {
        handleError(error);
      }
    }
  };

  return (
    <Select
      isDisabled={isSaving}
      label={t('products.typename')}
      options={options}
      placeholder={t('products.select')}
      value={options.find((option) => option.value === selectedProduct) || null}
      onChange={(option) => handleProductSelect(option?.value ?? '')}
    />
  );
};
