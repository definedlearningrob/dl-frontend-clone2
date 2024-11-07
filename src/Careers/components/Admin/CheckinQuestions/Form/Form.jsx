import PropTypes from 'prop-types';
import { useFormikContext } from 'formik';
import { useHistory } from 'react-router-dom';

import { AdminFormWrapper } from '@dc/components/Admin/AdminFormWrapper/AdminFormWrapper';
import { FormActions } from '@dc/components/Admin/FormActions/FormActions';

import Card from '@shared/components/Card/Card';

import Details from './Details/Details';

AdminCheckinsForm.propTypes = {
  errors: PropTypes.shape({
    question: PropTypes.string,
  }),
  title: PropTypes.string,
  touched: PropTypes.shape({
    question: PropTypes.bool,
  }),
};

function AdminCheckinsForm({ errors, title, touched }) {
  const { isSubmitting } = useFormikContext();
  const history = useHistory();

  const returnToGroups = () => {
    history.push('/admin/check-ins');
  };

  return (
    <AdminFormWrapper title={title}>
      <Card>
        <Details errors={errors} touched={touched} />
      </Card>
      <FormActions isLoading={isSubmitting} onCancel={returnToGroups} />
    </AdminFormWrapper>
  );
}

export default AdminCheckinsForm;
