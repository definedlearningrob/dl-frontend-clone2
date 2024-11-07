import { forwardRef } from 'react';

import { cleanInjection } from '@shared/utils/cleanInjection';
import { cx } from '@shared/utils/cx';

type Props = {
  content: string;
  dataTestId?: string;
  className?: string;
};

export const InjectedContent = forwardRef<HTMLDivElement, Props>(
  ({ content, className, dataTestId }: Props, ref) => {
    const classNames = cx('injected-content', className);

    return (
      <div
        /* eslint-disable-next-line react/no-danger */
        dangerouslySetInnerHTML={cleanInjection(content)}
        ref={ref}
        className={classNames}
        data-testid={dataTestId}
      />
    );
  }
);
