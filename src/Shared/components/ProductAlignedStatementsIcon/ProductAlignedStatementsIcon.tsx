import { IconContainer } from '@shared/components/IconContainer/IconContainer';
import { Tooltip } from '@shared/components/Tooltip';
import { useBreakpointUp } from '@shared/hooks/useBreakpointUp';
import { ReactComponent as CertificateIcon } from '@shared/svg/certificate.svg';
import { cx } from '@shared/utils/cx';

type Props = {
  rubrics: { hasAlignedStatements?: boolean }[] | null;
  message: string;
};

export const ProductAlignedStatementsIcon = ({ rubrics, message }: Props) => {
  const isFullHD = useBreakpointUp({ breakpoint: 'xxxl' });

  const hasAlignedStatements = rubrics?.some((rubric) => rubric.hasAlignedStatements);

  if (!hasAlignedStatements) {
    return null;
  }

  return (
    <Tooltip message={message}>
      <IconContainer
        Icon={CertificateIcon}
        className={cx(
          'text-primary-500 outline outline-1 outline-neutral-300 rounded-sm',
          'hover:text-white hover:bg-primary-500 hover:outline-primary-500'
        )}
        size={isFullHD ? 'base' : 'sm'}
      />
    </Tooltip>
  );
};
