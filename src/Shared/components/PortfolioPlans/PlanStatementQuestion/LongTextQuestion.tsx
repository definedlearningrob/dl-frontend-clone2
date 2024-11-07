import SharedFormTextarea from '@shared/components/FormTextarea/FormTextarea';

type Props = {
  disabled: boolean;
  name: string;
};

export const LongTextQuestion = ({ disabled, name }: Props) => (
  <SharedFormTextarea
    disabled={disabled}
    errorMessage={undefined}
    name={name}
    textareaClassName='text-xxs xxxl:text-xs !p-xs !mb-0 disabled:bg-neutral-200'
  />
);
