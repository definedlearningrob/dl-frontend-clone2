import cx from 'classnames';
import { RefObject, useLayoutEffect, useRef, useState } from 'react';

import usePresentationBuilder from '@dc/hooks/usePresentationBuilder';

import styles from './Interactive.module.sass';

type Props = {
  item: { value: string; contentId: string; style: string };
  handleSelectSlideContent: (object: { id: string; type: string } | null) => void;
  wrapper?: RefObject<HTMLDivElement | null>;
  onOverflowChange?: (isOverflowing: boolean) => void;
  percentageBreakpoint?: number;
  className?: string;
};

const DEFAULT_PERCENTAGE_BREAKPOINT = 130;

function AdminTasksPresentationBuilderTemplateSharedTextItemInteractive({
  item,
  handleSelectSlideContent,
  wrapper,
  onOverflowChange,
  percentageBreakpoint,
  className,
}: Props) {
  const { selectedSlideContent } = usePresentationBuilder();
  const [isOverflowing, setIsOverflowing] = useState(false);
  const isSelected =
    selectedSlideContent?.type === 'text' && selectedSlideContent?.id === item.contentId;
  const textContainer = useRef<HTMLDivElement>(null);
  const getPercantage = (value: number, target: number) =>
    Number(((100 * value) / target).toFixed());

  useLayoutEffect(() => {
    const textRect = textContainer?.current?.getBoundingClientRect();
    const wrapperRect = wrapper?.current?.getBoundingClientRect();
    const textHeight = textRect?.height;
    const wrapperHeight = wrapperRect?.height;

    if (textHeight && wrapperHeight) {
      const takenPercantegeOfContainer = getPercantage(textHeight, wrapperHeight);

      if (takenPercantegeOfContainer > (percentageBreakpoint || DEFAULT_PERCENTAGE_BREAKPOINT)) {
        setIsOverflowing(true);
        onOverflowChange && onOverflowChange(true);
      } else if (isOverflowing) {
        setIsOverflowing(false);
        onOverflowChange && onOverflowChange(false);
      }
    }
  }, [item.value, wrapper?.current]);

  const classes = cx(styles.textContainer, 'presentation-textcontainer', {
    [styles.overflowing]: isOverflowing && isSelected,
  });
  const wrapperClasses = cx('textWrapper', className, {
    [styles.selectedContent]: isSelected,
  });

  const handleSelect = () =>
    handleSelectSlideContent && handleSelectSlideContent({ type: 'text', id: item.contentId });

  return (
    <div className={wrapperClasses}>
      <div
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: item.value }}
        ref={textContainer}
        className={classes}
        onClick={handleSelect}
      />
    </div>
  );
}

export default AdminTasksPresentationBuilderTemplateSharedTextItemInteractive;
