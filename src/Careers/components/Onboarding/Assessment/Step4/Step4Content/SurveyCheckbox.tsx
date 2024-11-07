import cx from 'classnames';
import { useField } from 'formik';
import { useTranslation } from 'react-i18next';

import Checkbox from '@shared/components/Checkbox/Checkbox';
import Textarea from '@shared/components/Textarea/Textarea';
type Props = {
  option: string;
  name: string;
  options: { option: string; isDisabled: boolean; step: number }[];
  isDisabled: boolean;
  hasFirstOptionGuard: boolean;
  className?: string;
};

export const SurveyCheckbox = ({
  option,
  name,
  isDisabled,
  className,
  hasFirstOptionGuard,
  options,
}: Props) => {
  const [inputField, , helpers] = useField(name);
  const [otherAnswerField] = useField(name.replace('answers', 'otherAnswer'));
  const { t } = useTranslation();

  const isChecked = inputField.value.includes(option);
  const hasTextArea = option === 'Other' && isChecked;

  const checkboxClassname = cx(
    'bg-white',
    '!text-neutral-700 font-medium leading-lg',
    'rounded-sm cursor-pointer',
    'grow',
    {
      'bg-white': !isChecked && !isDisabled,
      '!bg-neutral-200 border border-neutral-300': isDisabled,
    },
    className
  );

  const handleChange = () => {
    if (isChecked) {
      const nextValue = inputField.value.filter((item: string) => item !== option);

      return helpers.setValue(nextValue);
    }

    const firstOption = options[0].option;

    if (hasFirstOptionGuard && firstOption === option) {
      return helpers.setValue([firstOption]);
    }

    helpers.setValue([...inputField.value, option]);
  };

  return (
    <>
      <li className='list-none last-of-type:mb-0 flex w-full'>
        <Checkbox
          checked={isChecked}
          className={checkboxClassname}
          disabled={isDisabled}
          id={`checkbox-${name}-${option}`}
          label={option}
          labelClassName='!p-sm xxxl:!p-sm after:!left-sm xxxl:after:!left-sm text-xs xxxl:text-sm'
          value={option}
          onChange={handleChange}
        />
      </li>
      {hasTextArea && (
        <div className='other-answer'>
          <p className='mb-xs text-xs xxxl:text-sm text-neutral-700 leading-lg'>
            {t('careerReviewSurvey.otherAnswerDescription')}
          </p>
          <Textarea
            className='[&_textarea]:text-xs xxxl:[&_textarea]:text-sm'
            placeholder={t('careerReviewSurvey.otherAnswerPlaceholder')}
            {...otherAnswerField}
          />
        </div>
      )}
    </>
  );
};
