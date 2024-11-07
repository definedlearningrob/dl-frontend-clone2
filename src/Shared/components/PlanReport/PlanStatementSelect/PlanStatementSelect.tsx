import { GroupBase } from 'react-select';
import { useTranslation } from 'react-i18next';

import { Select, SelectProps } from '@shared/components/Select';
import { usePlanReportFilters } from '@shared/components/PlanReport/usePlanReportFilters';

import { PlanStatementOption, SelectOption } from './PlanStatementOption';
import { usePlanStatementOptions } from './usePlanStatementOptions';

export const PlanStatementSelect = <
  Option extends SelectOption,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>(
  props: SelectProps<Option, IsMulti, Group>
) => {
  const { t } = useTranslation();
  const { variables } = usePlanReportFilters();
  const statementOptions = usePlanStatementOptions(variables.filter.planId);

  const { size = 'md' } = props;

  return (
    <Select
      {...props}
      components={{ Option: (props) => <PlanStatementOption {...props} size={size} /> }}
      menuPlacement='auto'
      menuPortalTarget={document.body}
      options={statementOptions as unknown as Group[]}
      placeholder={t('planReport.selectItem')}
      size={size}
    />
  );
};
