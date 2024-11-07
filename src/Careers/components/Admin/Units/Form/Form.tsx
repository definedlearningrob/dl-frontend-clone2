import { useFormikContext } from 'formik';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';

import AffectedResources from '@dc/components/Admin/Shared/AffectedResources/AffectedResources';
import { UnitFormDetails } from '@dc/components/Admin/Units/Form/UnitFormDetails/UnitFormDetails';
import unitTracksQuery from '@dc/graphql/user/queries/unitTracks';
import useScrollToInvalidFormElement from '@dc/hooks/useScrollToInvalidFormElement';
import { AFFECTED_RESOURCES_FILED } from '@dc/resources/constants';
import { AdminFormWrapper } from '@dc/components/Admin/AdminFormWrapper/AdminFormWrapper';
import { FormActions } from '@dc/components/Admin/FormActions/FormActions';
import { CourseAndOpportunity } from '@dc/components/Admin/Units/Form/CourseOpportunity/CourseAndOpportunity';
import { AdminTask } from '@dc/components/Admin/Units/Form/AdminTask/AdminTask';
import { FormValues } from '@dc/components/Admin/Units/New/New';

import { SERVICE_NAME } from '@shared/resources/enums';

type Props = {
  id?: string;
  title: string;
};

function AdminUnitsForm({ id, title }: Props) {
  const history = useHistory();
  const { isSubmitting, values, setFieldValue } = useFormikContext<FormValues>();

  useScrollToInvalidFormElement();

  const isDCUnit = values.service.value === SERVICE_NAME.CAREERS;

  useEffect(() => {
    setFieldValue(isDCUnit ? 'tasks' : 'unitResources', []);
  }, [isDCUnit]);

  return (
    <AdminFormWrapper data-testid='units-form' title={title}>
      <UnitFormDetails isEdit={!!id} />
      {isDCUnit ? <CourseAndOpportunity /> : <AdminTask />}
      {id && (
        <AffectedResources
          id={id}
          query={unitTracksQuery}
          resourcesField={AFFECTED_RESOURCES_FILED.TRACKS}
        />
      )}
      <FormActions isLoading={isSubmitting} onCancel={history.goBack} />
    </AdminFormWrapper>
  );
}

export default AdminUnitsForm;
