import { useToggle } from 'react-use';
import { useTranslation } from 'react-i18next';
import { isEmpty } from 'lodash-es';

import { ReactComponent as MessagesIcon } from '@shared/svg/messages.svg';
import { Tooltip } from '@shared/components/Tooltip';
import { cx } from '@shared/utils/cx';
import { Popover } from '@shared/components/Popover/Popover';
import { IconContainer } from '@shared/components/IconContainer/IconContainer';

import { TraitPopover } from './TraitPopover';

type Props = {
  initialTrait?: string;
  onSubmit?: (trait: string) => void;
};

export const RubricsTrait = ({ initialTrait, onSubmit }: Props) => {
  const [isVisible, toggleVisible] = useToggle(false);
  const { t } = useTranslation();

  const buttonClassname = cx(
    'rounded-xs hover:bg-primary-500 hover:text-white relative',
    'after:bg-secondary-500 after:rounded-full after:hidden after:absolute',
    'after:h-xs after:w-xs after:-top-xxs after:-right-xxs',
    'bg-white text-primary-500 border border-primary-500',
    {
      'bg-primary-500 text-white': isVisible,
      'after:block': !isEmpty(initialTrait),
    }
  );

  const tooltipMessage = !isEmpty(initialTrait)
    ? t('components.rubric.showComment')
    : t('components.rubric.leaveComment');

  return (
    <Popover
      content={
        <TraitPopover
          initialTrait={initialTrait}
          onClose={() => toggleVisible(false)}
          onSubmit={onSubmit}
        />
      }
      open={isVisible}
      onOpenChange={toggleVisible}>
      <Tooltip delayDuration={300} message={tooltipMessage}>
        <IconContainer
          Icon={MessagesIcon}
          className={buttonClassname}
          paddingSize='xxs'
          size='sm'
        />
      </Tooltip>
    </Popover>
  );
};
