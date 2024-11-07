import { TProduct } from '@pbl/components/Project/types';
import { EditableProduct } from '@pbl/components/User/Project/EditableProduct';

import Card from '@shared/components/Card/Card';

import { UneditableProduct } from '../UneditableProduct';

type Props = {
  isGradingAllowed: boolean;
  isOwner?: boolean;
  isStudent: boolean;
  product: TProduct;
  onModalOpen: (product: TProduct) => void;
  canSubmit: boolean;
};

export const Product = ({
  isGradingAllowed,
  isOwner,
  isStudent,
  product,
  onModalOpen,
  canSubmit,
}: Props) => {
  const CorrectProduct = isOwner ? EditableProduct : UneditableProduct;

  return (
    <Card key={product.id} className='user-project__product' dataTestId='user-project-product'>
      <CorrectProduct
        canSubmit={canSubmit}
        isGradingAllowed={isGradingAllowed}
        isStudent={isStudent}
        product={product}
        onModalOpen={onModalOpen}
      />
    </Card>
  );
};
