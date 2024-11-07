import { isEmpty } from 'lodash-es';

import type { TTaskPresentationSlide } from '@dc/graphql/user/queries/taskPresentation';
import { EmptyCheckInGroupSlide } from '@dc/components/Admin/Tasks/PresentationBuilder/Template/CheckInGroup/CheckInGroup/EmptyCheckInGroupSlide';
import { CheckInGroupSlideWrapper } from '@dc/components/Admin/Tasks/PresentationBuilder/Template/CheckInGroup/CheckInGroupSlideWrapper';

type Props = {
  slide: TTaskPresentationSlide;
};

export const CheckInGroupPreview = ({ slide }: Props) => {
  if (isEmpty(slide.checkInGroups)) return <EmptyCheckInGroupSlide />;

  return <CheckInGroupSlideWrapper slide={slide} />;
};
