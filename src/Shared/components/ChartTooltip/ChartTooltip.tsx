import { noop } from 'lodash-es';
import { ReactNode } from 'react';
import { TooltipProps } from 'recharts';
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';

import { TooltipWithHeaderContent } from '@shared/components/Tooltip/TooltipWithHeaderContent';
import { cx } from '@shared/utils/cx';

type DefaultRenderData = Record<string, unknown>;

type Props<
  TValue extends ValueType,
  TName extends NameType,
  RenderData extends DefaultRenderData
> = TooltipProps<TValue, TName> & {
  renderContent?: (data: RenderData, label: TName) => ReactNode;
  nameKey?: string;
};

export const ChartTooltip = <
  TValue extends ValueType,
  TName extends NameType,
  RenderData extends DefaultRenderData
>({
  active,
  payload = [],
  labelFormatter,
  renderContent = noop,
  label = 0,
  nameKey = 'name',
}: Props<TValue, TName, RenderData>) => {
  const { payload: data } = payload[0] ?? {};
  const { tooltipIcon: Icon, iconClassName, colorClassName, tooltipClassName } = data ?? {};

  const name = data?.[nameKey] ?? '';
  const formattedName = labelFormatter ? labelFormatter(name, payload) : name;

  const tooltipContent = data && renderContent(data, label);
  const defaultIconColorClass = colorClassName?.replace('fill-', 'text-');

  return (
    <TooltipWithHeaderContent
      Icon={Icon}
      className={cx(tooltipClassName, { hidden: !active })}
      content={tooltipContent}
      header={formattedName}
      iconClassName={cx(defaultIconColorClass, iconClassName)}
    />
  );
};
