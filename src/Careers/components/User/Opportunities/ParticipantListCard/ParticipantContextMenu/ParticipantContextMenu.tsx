import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { useMemo, useCallback, FC, SVGProps } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useParams } from 'react-router-dom';

import { OPPORTUNITY_APPLICATION_STATUS } from '@dc/resources/enums';
import { CONVERSATION_CONTEXT_TYPES } from '@dc/resources/constants';

import { ReactComponent as FlagIcon } from '@shared/assets/icons/flag_outlined.svg';
import { ReactComponent as DotsIcon } from '@shared/svg/three_dots.svg';
import { ReactComponent as SendIcon } from '@shared/svg/send_outlined.svg';
import { ReactComponent as UserIcon } from '@shared/svg/user_outlined.svg';
import { useMessaging } from '@shared/hooks/useMessaging';
import { RECEIVER_TYPES } from '@shared/resources/constants';
import { IconButton } from '@shared/components/IconButton/IconButton';
import Button from '@shared/components/Button/Button';
import { cx } from '@shared/utils/cx';

type ContextMenuOption = {
  hide?: boolean;
  Icon: FC<SVGProps<SVGSVGElement>>;
  label: string;
  onClick: () => void;
};

type Props = {
  setUpdateStatusModalOpen: (options: {
    applicationId: string;
    applicationStatus: OPPORTUNITY_APPLICATION_STATUS;
    fullName: string;
  }) => void;
  student: {
    applicationId: string;
    applicationStatus: OPPORTUNITY_APPLICATION_STATUS;
    fullName: string;
    uuid: string;
  };
  opportunityName: string;
  isOpen: boolean;
  toggleOpen: () => void;
};

export const ParticipantContextMenu = ({
  setUpdateStatusModalOpen,
  student,
  opportunityName,
  isOpen,
  toggleOpen,
}: Props) => {
  const { uuid: studentUuid, fullName, applicationId, applicationStatus } = student;
  const { id } = useParams<{ id: string }>();
  const { messagingState, setMessagingState } = useMessaging();
  const { t } = useTranslation();
  const history = useHistory();
  const hideStatusUpdateOption = ![
    OPPORTUNITY_APPLICATION_STATUS.ACCEPTED,
    OPPORTUNITY_APPLICATION_STATUS.FINISHED,
    OPPORTUNITY_APPLICATION_STATUS.STARTED,
  ].includes(applicationStatus);

  const handleSendMessage = useCallback(() => {
    setMessagingState({
      ...messagingState,
      show: true,
      receiverType: RECEIVER_TYPES.STUDENT,
      actionContext: {
        type: CONVERSATION_CONTEXT_TYPES.OPPORTUNITY,
        id,
        title: opportunityName,
      },
      receiver: { ...student, name: fullName },
    });
  }, []);

  const handleShowPortfolio = () => {
    history.push(`/students/${studentUuid}/portfolio`);
  };

  const handleSetUpdateStatusModalOpen = () =>
    setUpdateStatusModalOpen({ applicationId, applicationStatus, fullName });

  const optionStatusLabel = useMemo(
    () =>
      ({
        [OPPORTUNITY_APPLICATION_STATUS.ACCEPTED]: t('user.opportunities.contextMenu.inProgress'),
        [OPPORTUNITY_APPLICATION_STATUS.STARTED]: t('user.opportunities.contextMenu.completed'),
        [OPPORTUNITY_APPLICATION_STATUS.FINISHED]: t('user.opportunities.contextMenu.inProgress'),
        [OPPORTUNITY_APPLICATION_STATUS.PENDING]: null,
        [OPPORTUNITY_APPLICATION_STATUS.REJECTED]: null,
        [OPPORTUNITY_APPLICATION_STATUS.EXPIRED]: null,
      }[applicationStatus]),
    [applicationStatus]
  );

  const contextMenuOptions: ContextMenuOption[] = [
    {
      Icon: UserIcon,
      label: t('user.opportunities.contextMenu.showPortfolio'),
      onClick: handleShowPortfolio,
    },
    {
      Icon: SendIcon,
      label: t('user.opportunities.contextMenu.sendMessage'),
      onClick: handleSendMessage,
    },
    {
      hide: hideStatusUpdateOption,
      Icon: FlagIcon,
      label: t('user.opportunities.contextMenu.setStatus', {
        status: optionStatusLabel,
      }),
      onClick: handleSetUpdateStatusModalOpen,
    },
  ].filter((option) => !option.hide);

  return (
    <DropdownMenu.Root modal={false} open={isOpen} onOpenChange={toggleOpen}>
      <DropdownMenu.Trigger asChild={true}>
        <IconButton
          Icon={DotsIcon}
          className={cx('invisible group-hover:visible hover:bg-white', {
            'visible outline outline-1 outline-primary-500': isOpen,
          })}
          variant='white'
        />
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content align='end' sideOffset={8}>
          <ul className='rounded-sm bg-white border border-neutral-300'>
            {contextMenuOptions.map((option) => (
              <li key={option.label} className='flex'>
                <Button
                  Icon={option.Icon}
                  className='w-full !justify-start font-regular'
                  size='sm'
                  onClick={option.onClick}>
                  {option.label}
                </Button>
              </li>
            ))}
          </ul>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};
