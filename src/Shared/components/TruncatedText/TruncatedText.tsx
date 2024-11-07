import cx from 'classnames';
import { useLayoutEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { OFFSET_HEIGHT } from '@shared/components/TruncatedText/resources';
import { cleanInjection } from '@shared/utils/cleanInjection';

import styles from './TruncatedText.module.sass';

type Props = {
  text: string;
  textClassName?: string;
};

const TruncatedText = ({ text, textClassName }: Props) => {
  const { t } = useTranslation();
  const truncateContainerRef = useRef<HTMLDivElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const [textIsExpanded, setTextIsExpanded] = useState(false);
  const [showMoreButton, setShowMoreButton] = useState(false);
  const buttonText = textIsExpanded ? t('sharedCommon.viewLess') : t('sharedCommon.viewMore');

  const textClasses = cx(
    styles.text,
    {
      [styles.isExpanded]: textIsExpanded,
      [styles.isTruncated]: !textIsExpanded,
    },
    textClassName
  );

  const buttonClasses = cx(styles.button, {
    [styles.showMoreButton]: !textIsExpanded,
  });

  const handleShowMore = () => {
    setTextIsExpanded(!textIsExpanded);
  };

  useLayoutEffect(() => {
    const { current } = paragraphRef;

    const hasOverflow = !!current ? current.scrollHeight >= OFFSET_HEIGHT : false;

    setShowMoreButton(hasOverflow);
  }, [text]);

  return (
    <div
      ref={truncateContainerRef}
      className={styles.container}
      data-testid='truncate-text-container'>
      <p
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={cleanInjection(text)}
        ref={paragraphRef}
        className={textClasses}
        data-testid='truncate-text-paragraph'
      />
      {showMoreButton && (
        <button
          className={buttonClasses}
          data-testid='truncate-text-button'
          type='button'
          onClick={handleShowMore}>
          {buttonText}
        </button>
      )}
    </div>
  );
};

export default TruncatedText;
