import { FormRadio } from '@shared/components/FormRadio';

type Props = {
  options: { option: string; id: string }[];
  disabled: boolean;
  name: string;
};

export const SingleChoiceQuestion = ({ options, disabled, name }: Props) => (
  <fieldset className='p-0' role='radiogroup'>
    {options.map((option) => (
      <FormRadio
        key={option.id}
        className='mb-xs last:mb-0 text-xs xxxl:text-sm'
        disabled={disabled}
        name={name}
        value={option.option}>
        {option.option}
      </FormRadio>
    ))}
  </fieldset>
);
