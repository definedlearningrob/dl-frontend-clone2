import { SubmissionsMock } from '@dc/components/Admin/Tasks/PresentationBuilder/Template/Product/ProductForSlide/SubmissionsMock';
import { SubmissionsDL } from '@dc/components/Admin/Tasks/PresentationBuilder/Template/Product/ProductForSlide/SubmissionsDL';

import { TProduct } from '@pbl/components/Project/types';

type Props = {
  product: TProduct;
};

export const SubmissionsWrapper = ({ product }: Props) => {
  const isOnDC = location.pathname.includes('admin');

  if (isOnDC) {
    return <SubmissionsMock />;
  }

  return <SubmissionsDL product={product} />;
};
