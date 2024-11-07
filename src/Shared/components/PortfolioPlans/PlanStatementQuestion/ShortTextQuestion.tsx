import SharedFormTextInput from '@shared/components/FormTextInput/FormTextInput';
import { useBreakpointUp } from '@shared/hooks/useBreakpointUp';

type Props = {
  disabled: boolean;
  name: string;
};

export const ShortTextQuestion = ({ disabled, name }: Props) => {
  const isFullHD = useBreakpointUp({ breakpoint: 'xxxl' });

  return (
    <SharedFormTextInput
      disabled={disabled}
      errorMessage={undefined}
      name={name}
      size={isFullHD ? 'md' : 'sm'}
    />
  );
};
