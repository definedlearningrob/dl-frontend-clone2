import { times } from 'lodash-es';

import { CheckInQuestion } from '@dc/components/Admin/Tasks/PresentationBuilder/Template/CheckInQuestion/CheckInQuestion/CheckInQuestion';
import { TTaskPresentationSlide } from '@dc/graphql/user/queries/taskPresentation';

import { CHECKINS_PER_SLIDE_COUNT } from '@shared/resources/constants';

type Props = {
  slide: TTaskPresentationSlide;
};

export const CheckInQuestionSlideWrapper = ({ slide }: Props) => (
  <div className='min-h-[650px] mx-auto w-3/4 flex flex-col gap-base justify-center py-base'>
    {times(CHECKINS_PER_SLIDE_COUNT, (index) => {
      const checkInQuestion = slide.checkInQuestions[index];

      if (!checkInQuestion) return null;

      return (
        <div
          key={`${index}-${checkInQuestion.id}`}
          className='!text-lg bg-white rounded-sm !px-base !pb-xxs !pt-sm xxxl:pt-base flex flex-col'>
          <CheckInQuestion checkInQuestion={checkInQuestion} />
        </div>
      );
    })}
  </div>
);
