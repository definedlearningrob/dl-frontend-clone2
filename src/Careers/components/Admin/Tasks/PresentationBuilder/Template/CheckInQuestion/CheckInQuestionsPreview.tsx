import type { TTaskPresentationSlide } from '@dc/graphql/user/queries/taskPresentation';
import { CheckInQuestionSlideWrapper } from '@dc/components/Admin/Tasks/PresentationBuilder/Template/CheckInQuestion/CheckInQuestionSlideWrapper';

type Props = {
  slide: TTaskPresentationSlide;
};

export const CheckInQuestionsPreview = ({ slide }: Props) => (
  <CheckInQuestionSlideWrapper slide={slide} />
);
