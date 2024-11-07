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
};

export const SurveyCheckbox = ({
  option,
  name,
  isDisabled,
  hasFirstOptionGuard,
  options,
}: Props) => {
  const [inputField, , helpers] = useField(name);
  const [otherAnswerField] = useField(name.replace('answers', 'otherAnswer'));
  const { t } = useTranslation();

  const isChecked = inputField.value.includes(option);
  const hasTextArea = option === 'Other' && isChecked;

  const checkboxClassname = cx(
    'border border-neutral-300 hover:border-neutral-600',
    '!text-neutral-700 font-medium leading-lg',
    'rounded-xs cursor-pointer',
    {
      ['bg-primary-200 text-primary-500']: isChecked,
      ['bg-neutral-200']: isDisabled,
      ['mb-base']: hasTextArea,
    }
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
      <li className='list-none mb-sm last-of-type:mb-0'>
        <Checkbox
          checked={isChecked}
          className={checkboxClassname}
          disabled={isDisabled}
          id={`checkbox-${name}-${option}`}
          label={option}
          labelClassName='!p-sm xxxl:!p-base after:!left-sm xxxl:after:!left-base'
          value={option}
          onChange={handleChange}
        />
      </li>
      {hasTextArea && (
        <div>
          <p className='mb-xs text-sm text-neutral-700 leading-lg'>
            {t('careerReviewSurvey.otherAnswerDescription')}
          </p>
          <Textarea
            className='[&_textarea]:!mb-base [&_textarea]:xxxl:!mb-md'
            placeholder={t('careerReviewSurvey.otherAnswerPlaceholder')}
            {...otherAnswerField}
          />
        </div>
      )}
    </>
  );
};
