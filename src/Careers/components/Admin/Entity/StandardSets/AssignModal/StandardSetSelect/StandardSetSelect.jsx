import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import standardSetsQuery from '@dc/graphql/user/queries/standardSets';

import { QueryAsyncSelect } from '@shared/components/AsyncSelect';

AdminEntityStandardSetsAssignModalStandardSetSelect.propTypes = {
  assignedStandardSets: PropTypes.array,
  setStandardSet: PropTypes.func,
  standardSet: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  }),
};

function AdminEntityStandardSetsAssignModalStandardSetSelect({
  assignedStandardSets,
  standardSet,
  setStandardSet,
}) {
  const { t } = useTranslation();

  const assginedStandardSetIds = useMemo(
    () => assignedStandardSets.map((standardSet) => standardSet.id),
    [assignedStandardSets]
  );

  return (
    <QueryAsyncSelect
      dataKey='standardSets.nodes'
      excludedValues={assginedStandardSetIds}
      label={t('user.entity.standardSets.standardSetLabel')}
      name='standardSet'
      query={standardSetsQuery}
      value={standardSet}
      onChange={setStandardSet}
    />
  );
}

export default AdminEntityStandardSetsAssignModalStandardSetSelect;
