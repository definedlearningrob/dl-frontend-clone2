import { Link, LinkProps } from 'react-router-dom';

import {
  GenericCardContent,
  GenericCardContentProps,
} from '@shared/components/GenericCard/GenericCardContent';

export type GenericCardProps = GenericCardContentProps &
  (
    | {
        to: LinkProps['to'];
        onClick?: never;
      }
    | {
        onClick: () => void;
        to?: never;
      }
  );

export const GenericCard = (props: GenericCardProps) => {
  const { to, ...rest } = props;

  if (typeof to === 'string') {
    return (
      <Link to={to}>
        <GenericCardContent {...rest} />
      </Link>
    );
  }

  return <GenericCardContent {...props} />;
};
