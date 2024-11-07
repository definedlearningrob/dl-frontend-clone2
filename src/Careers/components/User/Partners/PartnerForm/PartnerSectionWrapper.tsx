import { FC, ReactNode, SVGProps } from 'react';
import { useTranslation } from 'react-i18next';

import SharedCard from '@shared/components/Card/Card';
import { IconContainer } from '@shared/components/IconContainer/IconContainer';
import { Badge } from '@shared/components/Badge/Badge';

type Props = {
  Icon: FC<SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
  counter?: number;
  children: ReactNode;
};

export const PartnerSectionWrapper = ({
  Icon,
  title,
  description,
  children,
  counter = 0,
}: Props) => {
  const { t } = useTranslation();

  return (
    <SharedCard>
      <div className='mb-base xxxl:mb-md'>
        <div className='flex items-center gap-sm'>
          <IconContainer
            Icon={Icon}
            className='bg-neutral-200 rounded-sm self-start'
            paddingSize='xs'
            size='base'
          />
          <div className='flex-1 flex gap-sm items-center justify-between'>
            <h4 className='mb-0 text-sm xxxl:text-base'>{title}</h4>
            {counter > 0 && (
              <Badge type='primary'>{t('user.partners.selected', { count: counter })}</Badge>
            )}
          </div>
        </div>
        <p className='ml-[56px] mb-0 text-xs xxxl:text-sm text-font-secondary'>{description}</p>
      </div>
      {children}
    </SharedCard>
  );
};
