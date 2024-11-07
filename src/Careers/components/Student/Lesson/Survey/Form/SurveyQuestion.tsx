import { useField } from 'formik';

import { SurveyRadio } from '@dc/components/Student/Lesson/Survey/Form/SurveyRadio';
import { SurveyCheckbox } from '@dc/components/Student/Lesson/Survey/Form/SurveyCheckbox';
import { TCareerReviewSurveyQuestion } from '@dc/resources/types';

type Props = {
  question: TCareerReviewSurveyQuestion;
  questionIndex: number;
  version: number;
  disabled?: boolean;
};
export const SurveyQuestion = ({ question, questionIndex, version, disabled }: Props) => {
  const fieldName = `${question.id}.answers`;

  const [inputField] = useField(fieldName);

  const hasFirstOptionGuard = question.type === 'multiple_choice' && version === 2;
  const isFirstOptionGuardEnabled =
    hasFirstOptionGuard && inputField.value.includes(question.options[0].option);

  const options: { option: string; isDisabled: boolean; step: number }[] = question.options.map(
    (option) => {
      const isDisabled = option.step === 1 ? false : isFirstOptionGuardEnabled;

      return { ...option, isDisabled: isDisabled || disabled };
    }
  );

  const label = `${questionIndex + 1}. ${question.question}`;

  return (
    <div className='mb-base'>
      <p className='font-bold leading-base text-xs xxxl:text-base mb-sm'>{label}</p>
      <ul role='group'>
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
  );
};
