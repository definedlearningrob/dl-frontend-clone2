import { isEmpty } from 'lodash-es';
import { useTranslation } from 'react-i18next';

import type { TTaskPresentationSlide } from '@dc/graphql/user/queries/taskPresentation';
import { CheckInGroupSlideWrapper } from '@dc/components/Admin/Tasks/PresentationBuilder/Template/CheckInGroup/CheckInGroupSlideWrapper';

import Card from '@shared/components/Card/Card';

type Props = {
  slide: TTaskPresentationSlide;
  handleSelectSlideContent?: (object: { id: string; type: string }) => void;
  slides?: TTaskPresentationSlide[];
};

export const CheckInGroupNav = ({ slide }: Props) => {
  const { t } = useTranslation();

  if (isEmpty(slide.checkInGroups)) {
    return (
      <Card className='p-2lg !bg-neutral-200 h-[500px] flex justify-center items-center -mt-lg'>
        <h2>{t('presentation.checkInGroup')}</h2>
      </Card>
    );
  }

  return (
    <div className='px-lg -mt-2lg pointer-events-none'>
      <CheckInGroupSlideWrapper slide={slide} />;
    </div>
  );
};
