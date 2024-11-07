import { useTranslation } from 'react-i18next';
import cx from 'classnames';
import {
  forwardRef,
  ForwardRefExoticComponent,
  type HTMLProps,
  type PropsWithChildren,
  ReactElement,
  RefAttributes,
  SVGProps,
  FC,
  useEffect,
} from 'react';
import { DialogContent, DialogOverlay, type DialogProps } from '@reach/dialog';

import { ReactComponent as ClearIcon } from '@dc/svg/clear.svg';
import { AnimateHeight } from '@dc/shared/AnimateHeight/AnimateHeight';

import styles from '@shared/components/Modal/Modal.module.sass';
import SharedButton, { type TSharedButtonProps } from '@shared/components//Button/Button';
import { IconContainer } from '@shared/components/IconContainer/IconContainer';
import { IconButton } from '@shared/components/IconButton/IconButton';

import { ModalContextProvider, useModalContext } from './Context/ModalContext';

type TDialogProps = DialogProps & HTMLProps<HTMLDivElement>;
type TDialogPickedProps = 'className' | 'children' | 'isOpen' | 'onDismiss';
type HTMLDivProps = HTMLProps<HTMLDivElement>;

export type SharedModalProps = Pick<TDialogProps, TDialogPickedProps> & {
  ariaLabel?: string;
  disableAnimation?: boolean;
  scrollable?: boolean;
  bypassFocusLock?: boolean;
  variant?: 'default' | 'wide' | 'ultra-wide';
};

export interface CompoundedComponent
  extends ForwardRefExoticComponent<SharedModalProps & RefAttributes<HTMLDivElement>> {
  Header: (props: TModalHeaderProps) => ReactElement;
  Heading: (props: THeadingProps) => ReactElement;
  Body: (props: HTMLDivProps) => ReactElement;
  Footer: (props: TModalFooterProps) => ReactElement;
  Button: (props: TModalButtonProps) => ReactElement;
}

const SharedModal = forwardRef<HTMLDivElement, SharedModalProps>((props: SharedModalProps, ref) => {
  const {
    ariaLabel,
    bypassFocusLock,
    className,
    children,
    scrollable,
    isOpen,
    onDismiss,
    variant = 'default',
    disableAnimation = true,
  } = props;

  useEffect(() => {
    const closeModal = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && onDismiss) {
        // @ts-ignore
        onDismiss();
      }
    };

    window.addEventListener('keydown', closeModal);

    return () => window.removeEventListener('keydown', closeModal);
  }, []);

  const modalClasses = cx(
    styles.dialogContent,
    'modal',
    'bg-white flex flex-col shadow-300',
    'pb-base xxxl:pb-md',
    'overflow-hidden',
    'my-[40px] xxxl:my-[80px]',
    'transition-[width] duration-500 ease-in-out',
    'rounded-sm',
    'outline-none',
    // TODO: restore after max-height fix
    // 'max-h-[688px] xxxl:max-h-[920px]',
    'w-[800px]',
    {
      'overflow-auto': scrollable,
      'w-[920px] xxxl:w-[1200px]': variant === 'wide',
      'w-[95vw]': variant === 'ultra-wide',
    },
    className
  );

  const overlayClasses = cx(
    styles.dialogOverlay,
    'fixed inset-0',
    'backdrop-blur-modal',
    'flex flex-col items-center justify-center',
    'overflow-visible'
  );

  return (
    <ModalContextProvider onDismiss={onDismiss}>
      <DialogOverlay
        className={overlayClasses}
        dangerouslyBypassFocusLock={bypassFocusLock}
        isOpen={isOpen}
        onDismiss={onDismiss}>
        <DialogContent ref={ref} aria-label={ariaLabel || 'Modal'} className={modalClasses}>
          {disableAnimation ? children : <AnimateHeight>{children}</AnimateHeight>}
        </DialogContent>
      </DialogOverlay>
    </ModalContextProvider>
  );
}) as CompoundedComponent;

type TModalHeaderProps = PropsWithChildren<{
  className?: string;
  withoutPadding?: boolean;
}>;

SharedModal.Header = function ({ className, children, withoutPadding }: TModalHeaderProps) {
  const { onDismiss, isWide } = useModalContext();
  const { t } = useTranslation();

  const headerClasses = cx(
    'modal__header',
    'flex flex-row justify-between items-start',
    'px-base xxxl:px-md pt-base relative',
    'text-neutral-800',
    'xxxl:pt-md xxxl:pb-0 mb-sm',
    className,
    {
      'xxxl:mb-base': isWide,
      '!p-0 !inline-block': withoutPadding,
    }
  );

  return (
    <div className={headerClasses} data-testid='modal-header'>
      {children}
      <IconButton
        Icon={ClearIcon}
        aria-label={t('components.modal.closeAria')}
        data-testid='modal-close-button'
        size='md'
        variant='white'
        onClick={onDismiss}
      />
    </div>
  );
};

type THeadingProps = PropsWithChildren<{
  type?: 'h2' | 'h3' | 'h4';
  className?: string;
}>;

SharedModal.Heading = function ({ children, className, type: Heading = 'h4' }: THeadingProps) {
  const headingClasses = cx('modal__heading mb-0 text-lg', className);

  return (
    <Heading className={headingClasses} data-testid='modal-heading'>
      {children}
    </Heading>
  );
};

SharedModal.Body = function ({ children, className }: HTMLDivProps) {
  const bodyClasses = cx(
    'modal__body',
    'grow',
    'text-font-primary leading-base',
    'scrollbar overflow-y-auto overflow-x-hidden',
    'py-0 px-base xxxl:px-md',
    'mb-sm xxxl:mb-base',
    // TODO: find a way to handle proper max-height with Fromik wrapper
    'max-h-[60vh]',
    className
  );

  return (
    <div className={bodyClasses} data-testid='modal-body'>
      {children}
    </div>
  );
};

type TModalFooterProps = PropsWithChildren<{
  align?: 'right' | 'center' | 'space-between';
  className?: string;
}>;

SharedModal.Footer = function ({ align = 'right', children, className }: TModalFooterProps) {
  const alignMap = {
    right: 'justify-end',
    center: 'justify-center',
    'space-between': 'justify-between',
  };

  const footerClasses = cx(
    'modal__footer',
    `flex items-center gap-xs xxxl:gap-sm ${alignMap[align]}`,
    'py-0 px-base xxxl:px-md',
    className
  );

  return (
    <div className={footerClasses} data-testid='modal-footer'>
      {children}
    </div>
  );
};

type TModalButtonProps = TSharedButtonProps & {
  variant: 'primary' | 'primary-outlined' | 'danger';
};

SharedModal.Button = function ({ children, variant, ...props }: TModalButtonProps) {
  return (
    <SharedButton className='modal__button' variant={variant} {...props}>
      {children}
    </SharedButton>
  );
};

type InformativeModalProps = SharedModalProps & {
  Icon: FC<SVGProps<SVGSVGElement>>;
};

export const ModalWithIcon = ({ children, Icon, isOpen, onDismiss }: InformativeModalProps) => (
  <SharedModal isOpen={isOpen} onDismiss={onDismiss}>
    <div className='flex'>
      <div className='ps-base pt-base xxxl:ps-md xxxl:pt-md'>
        <IconContainer
          Icon={Icon}
          className='bg-info-100 text-info-500 rounded-full h-min'
          paddingSize='xs'
          size='base'
        />
      </div>
      <div className='w-full'>{children}</div>
    </div>
  </SharedModal>
);

export default SharedModal;
