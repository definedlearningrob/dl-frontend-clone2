import { useRef, useState } from 'react';

import { TextInput } from '@shared/components/TextInput/TextInput';
import { CopyButton } from '@shared/components/SharedLink/CopyButton';
import { Tooltip } from '@shared/components/Tooltip';

import styles from './SharedLinkInput.module.sass';

type Props = {
  tooltipMessage: string;
  value: string;
};

const TOOLTIP_VISIBILITY_TIME = 2500;

export const SharedLinkInput = ({ tooltipMessage, value }: Props) => {
  const [isTooltipVisible, setTooltipVisible] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleLinkClick = () => {
    if (inputRef.current) {
      inputRef.current.select();
      navigator.clipboard.writeText(value);
      setTooltipVisible(true);

      setTimeout(() => {
        setTooltipVisible(false);
      }, TOOLTIP_VISIBILITY_TIME);
    }
  };

  return (
    <Tooltip message={tooltipMessage} open={isTooltipVisible}>
      <div className={styles.link}>
        <TextInput forwardRef={inputRef} readOnly={true} value={value} onClick={handleLinkClick} />
        <CopyButton onClick={handleLinkClick} />
      </div>
    </Tooltip>
  );
};
