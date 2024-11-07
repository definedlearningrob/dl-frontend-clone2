/* eslint-disable react/prop-types */
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import schoolClassesQuery from '@dc/graphql/user/queries/schoolClasses';

import { DeprecatedAsyncSelect } from '@shared/components/DeprecatedAsyncSelect';

UserCourseAssignModalClassesSelect.propTypes = {
  disabled: PropTypes.bool,
  schoolClass: PropTypes.shape({
    entity: PropTypes.shape({
      name: PropTypes.string,
      uuid: PropTypes.string,
    }),
    name: PropTypes.string,
    uuid: PropTypes.string,
  }),
  setSchoolClass: PropTypes.func,
};

function UserCourseAssignModalClassesSelect({ disabled, schoolClass, setSchoolClass }) {
  const { t } = useTranslation();

  const OptionComponent = ({ data }) => (
    <div data-testid='option'>
      <span className='receiver-select__identity'>{data.name}</span>
      {data.entity && <span className='receiver-select__entity'>{data.entity.name}</span>}
    </div>
  );

  const SelectedValueComponent = ({ data }) => (
    <span data-testid='selected-value'>{data.name}</span>
  );

  return (
    <DeprecatedAsyncSelect
      OptionComponent={OptionComponent}
      SelectedValueComponent={SelectedValueComponent}
      dataKey='schoolClasses.nodes'
      disabled={disabled}
      filterName='nameCont'
      label={t('messaging.new.to')}
      name='schoolClass'
      placeholder={t('common.placeholders.search')}
      query={schoolClassesQuery}
      value={schoolClass}
      valueKey='uuid'
      onChange={setSchoolClass}
    />
  );
}

export default UserCourseAssignModalClassesSelect;
