import { isEmpty } from 'lodash-es';
import { useTranslation } from 'react-i18next';

import type { TTaskPresentationSlide } from '@dc/graphql/user/queries/taskPresentation';
import { CheckInQuestionSlideWrapper } from '@dc/components/Admin/Tasks/PresentationBuilder/Template/CheckInQuestion/CheckInQuestionSlideWrapper';

import Card from '@shared/components/Card/Card';

type Props = {
  slide: TTaskPresentationSlide;
  handleSelectSlideContent?: (object: { id: string; type: string }) => void;
  slides?: TTaskPresentationSlide[];
};

export const CheckInQuestionsNav = ({ slide }: Props) => {
  const { t } = useTranslation();

  if (isEmpty(slide.checkInQuestions)) {
    return (
      <Card className='p-2lg !bg-neutral-200 h-[500px] flex justify-center items-center -mt-lg'>
        <h2>{t('presentation.checkInQuestions')}</h2>
      </Card>
    );
  }

  return (
    <div className='px-lg -mt-2lg pointer-events-none'>
      <CheckInQuestionSlideWrapper slide={slide} />
    </div>
  );
};
