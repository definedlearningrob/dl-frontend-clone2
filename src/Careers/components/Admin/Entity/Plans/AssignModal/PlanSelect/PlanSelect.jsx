import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { PLANS_QUERY } from '@dc/graphql/user/queries/plans';

import { DeprecatedAsyncSelect } from '@shared/components/DeprecatedAsyncSelect';

AdminEntityPlansAssignModalPlanSelect.propTypes = {
  assignedPlans: PropTypes.array,
  plan: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  }),
  setPlan: PropTypes.func,
};

function AdminEntityPlansAssignModalPlanSelect({ assignedPlans, plan, setPlan }) {
  const { t } = useTranslation();

  const assginedPlanIds = useMemo(() => assignedPlans.map((plan) => plan.id), [assignedPlans]);

  //eslint-disable-next-line react/prop-types
  const OptionComponent = ({ data }) => (
    <div data-testid='plan-option'>
      <span>
        {/* eslint-disable-next-line react/prop-types */}
        {data.name}
      </span>
    </div>
  );

  // eslint-disable-next-line react/prop-types
  const SelectedValueComponent = ({ data }) => <span>{data.name}</span>;

  return (
    <DeprecatedAsyncSelect
      OptionComponent={OptionComponent}
      SelectedValueComponent={SelectedValueComponent}
      dataKey='plans.nodes'
      filterIds={assginedPlanIds}
      filterName='nameCont'
      label={t('user.entity.plans.planLabel')}
      name='plan'
      placeholder={t('common.placeholders.search')}
      query={PLANS_QUERY}
      value={plan}
      valueKey='id'
      onChange={setPlan}
    />
  );
}

export default AdminEntityPlansAssignModalPlanSelect;
