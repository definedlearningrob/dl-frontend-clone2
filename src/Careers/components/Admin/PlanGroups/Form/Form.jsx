import PropTypes from 'prop-types';
import { useFormikContext } from 'formik';
import { useHistory } from 'react-router-dom';

import Details from '@dc/components/Admin/PlanGroups/Form/Details/Details';
import { Statements } from '@dc/components/Admin/PlanGroups/Form/Statements/Statements';
import { shapePlanGroup } from '@dc/resources/typeDefs';
import { AdminFormWrapper } from '@dc/components/Admin/AdminFormWrapper/AdminFormWrapper';
import { FormActions } from '@dc/components/Admin/FormActions/FormActions';

AdminPlanGroupsForm.propTypes = {
  errors: PropTypes.shape({
    description: PropTypes.string,
    name: PropTypes.string,
  }),
  group: shapePlanGroup,
  title: PropTypes.string,
  touched: PropTypes.shape({
    description: PropTypes.bool,
    name: PropTypes.bool,
  }),
};

function AdminPlanGroupsForm({ errors, group, title, touched }) {
  const { isSubmitting } = useFormikContext();
  const history = useHistory();

  const returnToGroups = () => {
    history.push('/admin/plan-groups');
  };

  return (
    <AdminFormWrapper title={title}>
      <Details errors={errors} touched={touched} />
      {group && <Statements group={group} />}
      <FormActions isLoading={isSubmitting} onCancel={returnToGroups} />
    </AdminFormWrapper>
  );
}

export default AdminPlanGroupsForm;
