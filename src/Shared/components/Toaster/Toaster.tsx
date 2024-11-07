import { ToastContainer, toast } from 'react-toastify';
import { ToastOptions, TypeOptions } from 'react-toastify/dist/types';
import cx from 'classnames';
import { ReactNode } from 'react';
import { t } from 'i18next';
import { createPortal } from 'react-dom';

import { ReactComponent as AcceptedIcon } from '@shared/svg/accepted_icon.svg';
import { ReactComponent as FavoriteIcon } from '@shared/svg/heart-fill.svg';
import { ReactComponent as InfoIcon } from '@shared/svg/info_outlined.svg';
import { ReactComponent as WarningIcon } from '@shared/svg/warning_outlined.svg';
import { ReactComponent as ClearIcon } from '@shared/svg/clear_circle_outlined.svg';
import { IconContainer } from '@shared/components/IconContainer/IconContainer';

import './ToasterOverrides.sass';

const toastClassname = cx(
  '!p-sm !xxxl:p-base',
  '!text-neutral-800 !text-md !font-medium',
  '!shadow-200 !bg-white'
);

export const callPromiseToast = (
  promise: Promise<unknown>,
  { pendingText, successText, errorText } = {
    pendingText: t('common.notifications.pending.generic'),
    successText: t('common.notifications.success.generic'),
    errorText: t('common.notifications.error.generic'),
  },
  toastOptions: ToastOptions = {}
) => {
  const isFullHD = window.innerWidth >= 1920;
  const iconSize = isFullHD ? 'base' : 'sm';

  return toast.promise(promise, {
    pending: {
      render: <h5 className='mt-xs xxxl:mt-x mb-xs text-xs xxxl:text-sm'>{pendingText}</h5>,
      icon: () => (
        <IconContainer
          Icon={InfoIcon}
          className='bg-info-100 text-info-500 p-xs rounded-sm'
          size={iconSize}
        />
      ),
      ...toastOptions,
      className: toastClassname,
    },
    success: {
      render: <h5 className='mt-xs xxxl:mt-x mb-xs text-xs xxxl:text-sm'>{successText}</h5>,
      icon: () => (
        <IconContainer
          Icon={AcceptedIcon}
          className='bg-success-100 text-success-500 rounded-sm'
          size={iconSize}
        />
      ),
      ...toastOptions,
      className: toastClassname,
    },
    error: {
      //TODO: need some help here, not sure what it wants
      // eslint-disable-next-line react/prop-types
      render: ({ data }) => (
        // @ts-ignore
        // eslint-disable-next-line react/prop-types
        <h5 className='mt-xs xxxl:mt-x mb-xs text-xs xxxl:text-sm'>{`${errorText} ${data.message}`}</h5>
      ),
      icon: () => (
        <IconContainer
          Icon={ClearIcon}
          className='bg-danger-100 text-danger-500 p-xs rounded-sm'
          size={iconSize}
        />
      ),
      ...toastOptions,
      className: toastClassname,
    },
  });
};

export const callToast = (
  type: TypeOptions | 'favorite',
  content: string | ReactNode,
  description?: string | ReactNode,
  toastOptions?: ToastOptions
) => {
  const isFullHD = window.innerWidth >= 1920;
  const iconSize = isFullHD ? 'base' : 'sm';
  const conditionalOptions = {
    ...(toastOptions && { toastOptions }),
  };
  const className = cx(toastClassname, { '!font-bold': typeof content === 'string' });
  const toastContent = (
    <>
      <h5 className='mt-xs xxxl:mt-x mb-xs text-xs xxxl:text-sm'>{content}</h5>
      {description && <p className='mb-0 text-xs font-regular'>{description}</p>}
    </>
  );

  switch (type) {
    case 'success': {
      return toast.success(toastContent, {
        className,
        icon: () => (
          <IconContainer
            Icon={AcceptedIcon}
            className='bg-success-100 text-success-500 rounded-sm'
            size={iconSize}
          />
        ),
        ...conditionalOptions,
      });
    }
    case 'error': {
      return toast.error(toastContent, {
        className,
        icon: () => (
          <IconContainer
            Icon={ClearIcon}
            className='bg-danger-100 text-danger-500 p-xs rounded-sm'
            size={iconSize}
          />
        ),
        ...conditionalOptions,
      });
    }
    case 'warning': {
      return toast.warning(toastContent, {
        className,
        icon: () => (
          <IconContainer
            Icon={WarningIcon}
            className='bg-warning-100 text-warning-500 p-xs rounded-sm'
            size={iconSize}
          />
        ),
        ...conditionalOptions,
      });
    }
    case 'info': {
      return toast.info(toastContent, {
        className,
        icon: () => (
          <IconContainer
            Icon={InfoIcon}
            className='bg-info-100 text-info-500 p-xs rounded-sm'
            size={iconSize}
          />
        ),
        ...conditionalOptions,
      });
    }
    case 'favorite': {
      return toast.info(toastContent, {
        className,
        icon: () => (
          <IconContainer
            Icon={FavoriteIcon}
            className='text-danger-600 bg-danger-100 rounded-sm'
            size={iconSize}
          />
        ),
      });
    }
  }

  return 0;
};

export const Toaster = () => (
  <>
    {createPortal(
      <ToastContainer
        bodyClassName='!flex !items-start'
        hideProgressBar={true}
        position='top-center'
        theme='light'
      />,
      document.body
    )}
  </>
);
