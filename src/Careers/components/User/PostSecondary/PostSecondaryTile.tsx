import cx from 'classnames';
import { FC, SVGProps } from 'react';
import { useTranslation } from 'react-i18next';

import { IconContainer } from '@shared/components/IconContainer/IconContainer';
import { Badge } from '@shared/components/Badge/Badge';
import { ReactComponent as LockedIcon } from '@shared/svg/padlock.svg';

type Props = {
  Icon: FC<SVGProps<SVGSVGElement>>;
  title: string;
  withCustomImage?: boolean;
  disabled?: boolean;
};

export const PostSecondaryTile = ({ Icon, title, withCustomImage, disabled }: Props) => {
  const { t } = useTranslation();

  const customImageClasses = cx('flex-grow h-lg', { '[&_path]:fill-neutral-600': disabled });
  const iconWrapperClasses = cx('bg-neutral-200 rounded-sm', {
    'bg-transparent w-full': withCustomImage,
  });
  const tileClasses = cx(
    'flex flex-col justify-center items-center py-lg px-md gap-md bg-white rounded-sm',
    {
      'relative border border-neutral-300 text-neutral-600': disabled,
    }
  );

  return (
    <div className={tileClasses}>
      {disabled && (
        <Badge className='absolute top-sm left-sm flex gap-xxs items-center' type='neutral'>
          <IconContainer Icon={LockedIcon} paddingSize='none' size='sm' />
          {t('user.postSecondary.commonAppRequests.locked')}
        </Badge>
      )}
      <div className={iconWrapperClasses}>
        {withCustomImage ? (
          <div className='flex'>
            <Icon className={customImageClasses} />
          </div>
        ) : (
          <IconContainer Icon={Icon} className='text-neutral-800' paddingSize='xs' size='md' />
        )}
      </div>
      <h4 className='m-0 text-base leading-base font-bold text-center'>{title}</h4>
    </div>
  );
};
