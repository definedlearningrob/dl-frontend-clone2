import { useField } from 'formik';

import { SurveyRadio } from '@dc/components/Onboarding/Assessment/Step4/Step4Content/SurveyRadio';
import { SurveyCheckbox } from '@dc/components/Onboarding/Assessment/Step4/Step4Content/SurveyCheckbox';
import { TCareerReviewSurveyQuestion } from '@dc/resources/types';

type Props = {
  question: TCareerReviewSurveyQuestion;
  description: string;
};

export const CareerReviewWizardQuestion = ({ question, description }: Props) => {
  const fieldName = `${question.id}.answers`;

  const [inputField] = useField<string | string[]>(fieldName);

  const hasFirstOptionGuard = question.type === 'multiple_choice';

  const isFirstOptionGuardEnabled =
    hasFirstOptionGuard && inputField.value.includes(question.options[0].option);

  const options = question.options.map((option) => {
    const isDisabled = option.step !== 1 && isFirstOptionGuardEnabled;

    return { ...option, isDisabled };
  });

  return (
    <div className='w-[848px] mx-auto pt-base xxxl:pt-[60px]'>
      <div className='text-center'>
        <h3 className='text-base xxxl:text-2lg mb-xs xxxl:mb-base'>{question.question}</h3>
        <p className='leading-lg mb-sm xxxl:mb-md text-xs xxxl:text-sm'>{description}</p>
      </div>
      <div className='mb-base'>
        <ul
          className='grid grid-cols-2 gap-y-[20px] xxxl:gap-y-[40px] gap-x-base xxxl:gap-x-lg [&_.other-answer]:col-span-2'
          role='group'>
          {options.map(({ option, isDisabled, step }) => {
            const commonProps = {
              key: `${question.id}-option-${step}`,
              name: `${question.id}.answers`,
              option,
              isDisabled,
            };

            if (question.type === 'single_choice') {
              return <SurveyRadio {...commonProps} />;
            }

            return (
              <SurveyCheckbox
                {...commonProps}
                hasFirstOptionGuard={hasFirstOptionGuard}
                options={options}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
};
