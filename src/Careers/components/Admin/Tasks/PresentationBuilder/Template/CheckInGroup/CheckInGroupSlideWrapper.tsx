import { isEmpty } from 'lodash-es';

import { CheckInQuestion } from '@dc/components/Admin/Tasks/PresentationBuilder/Template/CheckInQuestion/CheckInQuestion/CheckInQuestion';
import { TTaskPresentationSlide } from '@dc/graphql/user/queries/taskPresentation';
import { CheckInQuestionList } from '@dc/components/Admin/Tasks/PresentationBuilder/Template/CheckInGroup/CheckInQuestionList';
import { NoCheckinQuestionsInGroup } from '@dc/components/Admin/Tasks/PresentationBuilder/Template/CheckInGroup/CheckInGroup/NoCheckinQuestionsInGroup';

import Card from '@shared/components/Card/Card';

type Props = {
  slide: TTaskPresentationSlide;
};

const MAX_CHECKINS_PER_SLIDE = 3;

export const CheckInGroupSlideWrapper = ({ slide }: Props) => {
  const checkInGroup = slide.checkInGroups[0];

  const questions = checkInGroup.questions;

  if (isEmpty(questions)) return <NoCheckinQuestionsInGroup />;

  const hasMoreThanLimitQuestions = questions.length > MAX_CHECKINS_PER_SLIDE;

  const sortedQuestions = [...questions].sort((a, b) => a.step - b.step);

  return (
    <div className='min-h-[650px] mx-auto flex flex-col gap-base justify-center py-base'>
      <Card className='w-full !p-base'>
        {!hasMoreThanLimitQuestions && (
          <>
            <h5 className='text-lg text-left !normal-case'>
              {checkInGroup.displayName || checkInGroup.name}
            </h5>
            <div className='flex flex-col gap-sm'>
              {sortedQuestions.map((question) => (
                <CheckInQuestion key={question.id} checkInQuestion={question} />
              ))}
            </div>
          </>
        )}
        {hasMoreThanLimitQuestions && (
          <CheckInQuestionList
            groupName={checkInGroup.displayName || checkInGroup.name}
            questions={sortedQuestions}
          />
        )}
      </Card>
    </div>
  );
};
