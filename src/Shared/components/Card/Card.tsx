import cx from 'classnames';
import {
  ForwardRefExoticComponent,
  ForwardedRef,
  PropsWithChildren,
  ReactElement,
  RefAttributes,
  forwardRef,
} from 'react';

import styles from './Card.module.sass';

type Props = PropsWithChildren<{
  className?: string;
  dataTestId?: string;
  withoutPadding?: boolean;
  roundedCorners?: boolean;
  id?: string;
}>;

export interface CompoundedComponent
  extends ForwardRefExoticComponent<Props & RefAttributes<HTMLDivElement>> {
  Header: (props: THeaderProps) => ReactElement;
  Title: (props: TTitleProps) => ReactElement;
  Body: (props: TBodyProps) => ReactElement;
  Footer: (props: TFooterProps) => ReactElement;
}

const SharedCard = forwardRef(
  (
    { children, className, dataTestId, withoutPadding, roundedCorners, id }: Props,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const classes = cx(
      styles.card,
      { [styles.withoutPadding]: withoutPadding, [styles.roundedCorners]: roundedCorners },
      className
    );

    return (
      <div ref={ref} className={classes} data-testid={dataTestId} id={id}>
        {children}
      </div>
    );
  }
) as CompoundedComponent;

type THeaderProps = PropsWithChildren<{
  className?: string;
  dataTestId?: string;
  withPadding?: boolean;
}>;

SharedCard.Header = ({ children, className, dataTestId, withPadding }: THeaderProps) => {
  const headerClasses = cx(
    'flex justify-between w-full items-start mb-sm',
    { 'px-base pt-base xxxl:px-md xxxl:pt-md': withPadding },
    className
  );

  return (
    <div className={headerClasses} data-testid={dataTestId}>
      {children}
    </div>
  );
};

type TTitleProps = PropsWithChildren<{
  className?: string;
  dataTestId?: string;
  size?: 'small' | 'medium' | 'large';
}>;

SharedCard.Title = ({ children, className, size = 'medium', ...props }: TTitleProps) => {
  const titleClasses = cx(
    'text-font-primary mb-0',
    {
      [styles.titleSmall]: size === 'small',
      [styles.titleMedium]: size === 'medium',
      [styles.titleLarge]: size === 'large',
    },
    className
  );

  const parsedProps = {
    ...props,
    className: titleClasses,
    'data-testid': 'card-title',
  };

  return <h2 {...parsedProps}>{children}</h2>;
};

type TBodyProps = PropsWithChildren<{
  className?: string;
  withPadding?: boolean;
}>;

SharedCard.Body = ({ children, className, withPadding }: TBodyProps) => {
  const bodyClasses = cx('flex flex-col', { 'px-base xxxl:px-md': withPadding }, className);

  return <div className={bodyClasses}>{children}</div>;
};

type TFooterProps = PropsWithChildren<{
  className?: string;
  withPadding?: boolean;
}>;

SharedCard.Footer = ({ children, className, withPadding }: TFooterProps) => (
  <div className={cx({ 'px-base pb-base xxxl:px-md xxxl:pb-md': withPadding }, className)}>
    {children}
  </div>
);

export default SharedCard;
