import { useTranslation } from 'react-i18next';

import type { TTaskPresentationSlide } from '@dc/graphql/user/queries/taskPresentation';
import { ProductForSlide } from '@dc/components/Admin/Tasks/PresentationBuilder/Template/Product/ProductForSlide/ProductForSlide';

import Card from '@shared/components/Card/Card';

type Props = {
  slide: TTaskPresentationSlide;
  handleSelectSlideContent?: (object: { id: string; type: string }) => void;
  slides?: TTaskPresentationSlide[];
};

export const AdminProductNav = ({ slide }: Props) => {
  const { t } = useTranslation();

  const product = slide.products?.[0];

  if (!('products' in slide)) {
    return (
      <Card className='p-lg !bg-neutral-200 h-[500px] flex justify-center items-center -mt-lg'>
        <h2>{t('presentation.product')}</h2>
      </Card>
    );
  }

  return (
    <div className='p-lg pointer-events-none'>
      <ProductForSlide isGradingAllowed={false} product={product} />
    </div>
  );
};
