import { FunctionComponent, PropsWithChildren, ReactNode, SVGProps, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { FieldArrayRenderProps, useField } from 'formik';
import { isEmpty } from 'lodash-es';

import { EditPortfolioCardItem } from '@shared/components/EditPortfolio/EditPortfolioCardItem';
import { IconContainer } from '@shared/components/IconContainer/IconContainer';
import Button from '@shared/components/Button/Button';
import { ReactComponent as Plus } from '@shared/svg/add.svg';
import EmptyState from '@shared/components/EmptyState/EmptyState';
import { ReactComponent as EmptyPortfolio } from '@shared/assets/images/empty-portfolio.svg';
import { ResumeItemAttributes } from '@shared/resources/types';
import { cx } from '@shared/utils/cx';
import { useBreakpointUp } from '@shared/hooks/useBreakpointUp';

import { emptyItem, getItemConfig } from './helpers';

export type CardWithTitleProps = PropsWithChildren<{
  className?: string;
  description: string;
  Icon: FunctionComponent<SVGProps<SVGSVGElement>>;
  title: string;
}>;

type Props = CardWithTitleProps & {
  resourceName: string;
} & FieldArrayRenderProps;

export const EditPortfolioCardWithSections = ({
  Icon,
  description,
  name,
  resourceName,
  title,
  push,
  remove,
}: Props) => {
  const isFullHD = useBreakpointUp({ breakpoint: 'xxxl' });
  const [field] = useField<ResumeItemAttributes[]>(name);

  const { t } = useTranslation();

  const hasItems = !isEmpty(field.value);

  const handleAddItem = () => {
    push(emptyItem);
  };

  const itemConfig = useMemo(() => getItemConfig(name), [name]);

  return (
    <EditPortfolioCardWithTitle Icon={Icon} description={description} title={title}>
      <ul>
        {hasItems &&
          field.value.map((item, index) => (
            <EditPortfolioCardItem
              key={`${name}-${index}`}
              fieldName={name}
              index={index}
              item={item}
              itemConfig={itemConfig}
              onItemDelete={() => remove(index)}
            />
          ))}
        {!hasItems && (
          <EmptyState
            heading={t('portfolio.creator.emptyTitle', { name: resourceName })}
            icon={<EmptyPortfolio />}>
            <p className='text-center m-0 whitespace-pre-line'>
              {t('portfolio.creator.emptyDescription', { name: resourceName })}
            </p>
          </EmptyState>
        )}
      </ul>
      <Button
        Icon={Plus}
        className={cx('mt-base', {
          'mx-auto': !hasItems,
        })}
        iconPlacement='start'
        size={isFullHD ? 'md' : 'sm'}
        variant='primary'
        onClick={handleAddItem}>
        {t('portfolio.creator.addNew')}
      </Button>
    </EditPortfolioCardWithTitle>
  );
};

export const EditPortfolioCardWithTitle = ({
  children,
  className,
  description,
  details,
  Icon,
  title,
}: CardWithTitleProps & {
  details?: ReactNode;
}) => (
  <EditPortfolioCard className={cx('flex gap-base xxxl:gap-md', className)} id={title}>
    <div className='w-[180px] xxxl:w-[240px] shrink-0'>
      <IconContainer Icon={Icon} className='!text-neutral-800 bg-neutral-200 mb-sm rounded-xs' />
      <h2 className='text-sm xxxl:text-base mb-xs'>{title}</h2>
      <p className='text-xs xxxl:text-sm text-font-secondary break-words'>{description}</p>
      {details}
    </div>
    <div className='grow'>{children}</div>
  </EditPortfolioCard>
);

export const EditPortfolioCard = ({
  children,
  className,
  id,
}: PropsWithChildren<{ className?: string; id?: string }>) => (
  <section className={cx('bg-white shadow-md p-base rounded-sm xxxl:p-md', className)} id={id}>
    {children}
  </section>
);
