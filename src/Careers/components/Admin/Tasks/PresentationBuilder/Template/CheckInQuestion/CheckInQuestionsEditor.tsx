import { isEmpty } from 'lodash-es';

import type { TTaskPresentationSlide } from '@dc/graphql/user/queries/taskPresentation';
import { CheckInQuestionSlideWrapper } from '@dc/components/Admin/Tasks/PresentationBuilder/Template/CheckInQuestion/CheckInQuestionSlideWrapper';
import { EmptyCheckInSlide } from '@dc/components/Admin/Tasks/PresentationBuilder/Template/CheckInQuestion/CheckInQuestion/EmptyCheckInSlide';

type Props = {
  slide: TTaskPresentationSlide;
  slides?: TTaskPresentationSlide[];
};

export const CheckInQuestionEditor = ({ slide }: Props) => {
  if (isEmpty(slide.checkInQuestions)) return <EmptyCheckInSlide />;

  return <CheckInQuestionSlideWrapper slide={slide} />;
};
