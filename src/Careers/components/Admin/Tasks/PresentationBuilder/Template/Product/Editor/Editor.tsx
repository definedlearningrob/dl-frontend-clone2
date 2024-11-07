import type { TTaskPresentationSlide } from '@dc/graphql/user/queries/taskPresentation';
import { ProductForSlide } from '@dc/components/Admin/Tasks/PresentationBuilder/Template/Product/ProductForSlide/ProductForSlide';

type Props = {
  slide: TTaskPresentationSlide;
};

export const ProductEditor = ({ slide }: Props) => {
  const product = slide.products[0];

  return <ProductForSlide isGradingAllowed={false} product={product} />;
};
