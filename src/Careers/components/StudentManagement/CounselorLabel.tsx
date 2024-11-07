import { useTranslation } from 'react-i18next';

import useUserInfo from '@dc/hooks/useUserInfo';

import SharedAvatar from '@shared/components/Avatar/Avatar';

type Props = {
  counselorName?: string;
  counselorUuid?: string;
};

export const CounselorLabel = ({ counselorName, counselorUuid }: Props) => {
  const { t } = useTranslation();
  const { userInfo } = useUserInfo();

  if (!counselorName) {
    return null;
  }

  const isAssignedToMe = userInfo.uuid === counselorUuid;

  return (
    <div className='flex items-center'>
      <SharedAvatar
        className='mr-xs border border-neutral-300 rounded-full'
        label={counselorName}
        size='24'
      />
      <span className='overflow-hidden whitespace-nowrap text-ellipsis'>
        {counselorName}
        {isAssignedToMe && (
          <span className='text-font-secondary ml-xxs'>{t('user.postSecondary.assignedToMe')}</span>
        )}
      </span>
    </div>
  );
};
