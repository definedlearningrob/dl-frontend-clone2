import { useCallback, useMemo } from 'react';
import { groupBy } from 'lodash-es';

import { useStudentApplicationsQuery } from '@dc/graphql/user/hooks/useStudentApplicationsQuery';
import { COMMON_APP_FORM_TYPES } from '@dc/screens/UserApp/CommonApp/CommonAppRequests/types';
import { COMMON_APP_FORM_STATUS } from '@dc/resources/enums';

import camelize from '@shared/utils/camelize';

type Params = {
  studentUuid: string;
};

export const useCommonAppFormStatuses = ({ studentUuid }: Params) => {
  const { data, loading } = useStudentApplicationsQuery({ studentUuid });

  const formsByType = useMemo(() => {
    if (!data) {
      return {};
    }

    const formsWithInstitutions = data.studentApplications.flatMap(({ institution, forms }) =>
      forms.map((form) => ({ ...form, institution }))
    );

    return groupBy(formsWithInstitutions, (form) => form.formType);
  }, [data]);

  const getFormsByStatus = useCallback(
    (formType: COMMON_APP_FORM_TYPES, status: COMMON_APP_FORM_STATUS) =>
      formsByType[formType]?.filter((form) => form.status === status),
    [formsByType]
  );

  const getFormsByStatusCount = useCallback(
    (formType: COMMON_APP_FORM_TYPES, status: COMMON_APP_FORM_STATUS) => {
      const allForms = formsByType[formType];
      const formsWithStatus = getFormsByStatus(formType, status);

      return { total: allForms?.length, [camelize(status)]: formsWithStatus?.length };
    },
    [formsByType, getFormsByStatus]
  );

  return { formsByType, getFormsByStatus, getFormsByStatusCount, isLoading: loading };
};
