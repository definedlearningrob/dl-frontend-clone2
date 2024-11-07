import { useField } from 'formik';
import { useHistory } from 'react-router-dom';

import { BadgeDetails } from '@dc/components/Admin/BadgeManagement/BadgeDetails/BadgeDetails';
import { AdminFormWrapper } from '@dc/components/Admin/AdminFormWrapper/AdminFormWrapper';
import { FormActions } from '@dc/components/Admin/FormActions/FormActions';

import Card from '@shared/components/Card/Card';

export const BadgeForm = () => {
  const history = useHistory();
  const [, , fieldHelperImageData] = useField('imageData');
  const [, , fieldHelperName] = useField('name');

  const goBackToBadgesList = () => {
    fieldHelperName.setValue('');
    fieldHelperImageData.setValue('');
    history.push('/admin/badges');
  };

  return (
    <AdminFormWrapper>
      <Card>
        <BadgeDetails />
      </Card>
      <FormActions isLoading={false} onCancel={goBackToBadgesList} />
    </AdminFormWrapper>
  );
};
