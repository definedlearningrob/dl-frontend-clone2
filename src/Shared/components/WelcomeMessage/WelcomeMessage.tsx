import { ReactNode, useEffect, useState } from 'react';
import { useLocalStorage } from 'react-use';
import * as RadixPopover from '@radix-ui/react-popover';
import { useTranslation } from 'react-i18next';

import { WelcomeMessageContent } from '@shared/components/WelcomeMessage/WelcomeMessageContent';
import { IconContainer } from '@shared/components/IconContainer/IconContainer';
import { ReactComponent as HandIcon } from '@shared/svg/handIcon.svg';
import { ReactComponent as SpeechBalloonIcon } from '@shared/assets/icons/speechBalloon.svg';
import { useBreakpointUp } from '@shared/hooks/useBreakpointUp';
import { Tooltip } from '@shared/components/Tooltip';
import { cx } from '@shared/utils/cx';

const OFFSET_HEIGHT = 48;
const MAX_HEIGHT = 432;

type Props = {
  welcomeMessage: string;
  leftOffset: number;
  width: number;
  additionalContent?: ReactNode;
};

export const WelcomeMessage = ({ welcomeMessage, leftOffset, width, additionalContent }: Props) => {
  const [visited, setVisited] = useLocalStorage('visited', false);
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const isFullHD = useBreakpointUp({ breakpoint: 'xxxl' });
  const { t } = useTranslation();
  const additionalOffset = isFullHD ? 16 : 8;

  useEffect(() => {
    visited ? setShowWelcomeMessage(false) : setVisited(false);
  }, [visited]);

  const handleWelcomeMessageClose = () => {
    setShowWelcomeMessage(false);
    setVisited(true);
  };

  return (
    <RadixPopover.Root open={showWelcomeMessage} onOpenChange={setShowWelcomeMessage}>
      <RadixPopover.Trigger>
        <Tooltip message={t('messaging.welcomeMessage')}>
          <div onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            <IconContainer
              Icon={showWelcomeMessage || isHovered ? SpeechBalloonIcon : HandIcon}
              className={cx({
                'inline-block animate-wave origin-[70%_70%]': !showWelcomeMessage && !isHovered,
              })}
              paddingSize='none'
              size='base'
            />
          </div>
        </Tooltip>
      </RadixPopover.Trigger>
      <RadixPopover.Portal>
        <RadixPopover.Content
          align='start'
          alignOffset={leftOffset - additionalOffset}
          className='z-highest'
          side='bottom'
          style={{ width: width + additionalOffset * 2 }}
          onCloseAutoFocus={(e) => e.preventDefault()}
          onPointerDownOutside={(e) => e.preventDefault()}>
          <div
            className='shadow-400 overflow-auto scrollbar bg-white radius-sm xxxl:mb-base p-base rounded-sm z-highest relative'
            style={{
              maxHeight: `${MAX_HEIGHT + OFFSET_HEIGHT}px`,
            }}>
            <WelcomeMessageContent
              additionalContent={additionalContent}
              text={welcomeMessage}
              onClose={handleWelcomeMessageClose}
            />
          </div>
          <RadixPopover.Arrow className='fill-white' />
        </RadixPopover.Content>
      </RadixPopover.Portal>
    </RadixPopover.Root>
  );
};
