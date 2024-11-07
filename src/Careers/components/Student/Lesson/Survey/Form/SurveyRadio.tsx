import cx from 'classnames';
import { useField } from 'formik';

import { RadioButton } from '@shared/components/RadioButton/RadioButton';

type Props = {
  option: string;
  name: string;
  isDisabled?: boolean;
};

export const SurveyRadio = ({ option, name, isDisabled }: Props) => {
  const [inputField, , helpers] = useField(name);

  const radioClassName = cx(
    'border border-neutral-300 hover:border-neutral-600',
    'text-neutral-700 rounded-xs cursor-pointer',
    'flex items-center leading-lg font-medium',
    'p-sm xxxl:p-base',
    {
      ['bg-neutral-200 !cursor-not-allowed']: isDisabled,
      ['bg-primary-200 text-primary-500']: option === inputField.value,
    }
  );

  const textClassName = cx({ ['text-primary-500']: option === inputField.value });

  const handleChange = () => {
    helpers.setValue(option);
  };

  return (
    <li className='list-none mb-sm last-of-type:mb-0'>
      <RadioButton
        checked={inputField.value === option}
        className={radioClassName}
        disabled={isDisabled}
        name={option}
        textClassName={textClassName}
        value={option}
        onChange={handleChange}>
        {option}
      </RadioButton>
    </li>
  );
};
