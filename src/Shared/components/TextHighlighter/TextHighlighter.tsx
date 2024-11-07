import React, { useRef, useState } from 'react';
import { useEffect } from 'react';
import cx from 'classnames';

import styles from './TextHighlighter.module.sass';

type Props = {
  children: React.ReactNode;
  text?: string;
  theme?: 'dark' | 'light';
};

function TextHighlighter({ children, text, theme = 'dark' }: Props) {
  const elementRef = useRef<HTMLSpanElement | null>(null);
  const [htmlSnapshot, setHtmlSnapshot] = useState<string | null>(null);

  const resetView = () => {
    const elementToRestoreSnapshot = elementRef.current?.getElementsByClassName('highlightible')[0];
    if (elementToRestoreSnapshot) {
      elementToRestoreSnapshot.innerHTML = htmlSnapshot!;
    }
  };

  useEffect(() => {
    if (elementRef && !htmlSnapshot) {
      const elementToSnapshot = elementRef.current?.getElementsByClassName('highlightible')[0];
      if (elementToSnapshot) {
        setHtmlSnapshot(elementToSnapshot.innerHTML);
      }
    }
  }, [elementRef]);

  useEffect(() => {
    if (htmlSnapshot) {
      resetView();
    }

    const elementToHighlight = elementRef.current?.getElementsByClassName('highlightible')[0];

    if (elementToHighlight && text && text.trim()) {
      const elementToHighlight = elementRef.current?.getElementsByClassName('highlightible')[0];
      const html = elementToHighlight!.innerHTML;
      const textWithEscapedDots = text.replace(/\./g, '\\.');
      const regEx = new RegExp(textWithEscapedDots, 'ig');
      const index = html.search(regEx);

      if (index !== -1) {
        const word = html.substring(index, index + text.length);
        const classes = cx({
          [styles.highlighterDark]: theme === 'dark',
          [styles.highlighterLight]: theme === 'light',
        });
        const replaced = html.replace(regEx, `<span class='${classes}'>${word}</span>`);
        elementToHighlight!.innerHTML = replaced;
      }
    }
  }, [elementRef, text]);

  return (
    <span ref={elementRef} data-testid='text-highlighter'>
      {children}
    </span>
  );
}

export default TextHighlighter;
