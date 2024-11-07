import { useTranslation } from 'react-i18next';

import { TUserInfo } from '@dc/graphql/user/queries/userInfo';
import useUserInfo from '@dc/hooks/useUserInfo';
import {
  CommonAppForm,
  COMMON_APP_FORM_TYPES,
} from '@dc/screens/UserApp/CommonApp/CommonAppRequests/types';
import { COMMON_APP_FORM_STATUS } from '@dc/resources/enums';

const teacherForms = [
  COMMON_APP_FORM_TYPES.TEACHER_EVALUATION,
  COMMON_APP_FORM_TYPES.TEACHER_RECOMMENDATION,
];

const formsBlockedBySchoolReport = [
  COMMON_APP_FORM_TYPES.COUNSELOR_MIDYEAR_REPORT,
  COMMON_APP_FORM_TYPES.COUNSELOR_OPTIONAL_REPORT,
  COMMON_APP_FORM_TYPES.COUNSELOR_OPTIONAL_REPORT_2,
  COMMON_APP_FORM_TYPES.COUNSELOR_FINAL_REPORT,
];
const completedFormStatuses = [COMMON_APP_FORM_STATUS.SUBMITTED, COMMON_APP_FORM_STATUS.DOWNLOADED];

export const useLockedFormStatus = (forms: CommonAppForm[]) => {
  const { t } = useTranslation();
  const { userInfo } = useUserInfo<TUserInfo>();
  const { hasTeacherProfileFormCompleted, hasCounselorProfileFormCompleted } =
    userInfo.commonAppData;

  const schoolReport = forms.find(
    (form) => form.formType === COMMON_APP_FORM_TYPES.COUNSELOR_SECONDARY_REPORT
  );
  const isSchoolReportCompleted =
    schoolReport && completedFormStatuses.includes(schoolReport.status);

  const lockedFormStatuses = [
    {
      getIsLocked: (formType: COMMON_APP_FORM_TYPES) =>
        teacherForms.includes(formType) && !hasTeacherProfileFormCompleted,
      tooltipMessage: t(
        'user.postSecondary.commonAppRequests.applicationFormList.completeTeacherProfileFirst'
      ),
    },
    {
      getIsLocked: (formType: COMMON_APP_FORM_TYPES) =>
        !teacherForms.includes(formType) && !hasCounselorProfileFormCompleted,
      tooltipMessage: t(
        'user.postSecondary.commonAppRequests.applicationFormList.completeCounselorProfileFirst'
      ),
    },
    {
      getIsLocked: (formType: COMMON_APP_FORM_TYPES) =>
        !teacherForms.includes(formType) &&
        !isSchoolReportCompleted &&
        formsBlockedBySchoolReport.includes(formType),
      tooltipMessage: t(
        'user.postSecondary.commonAppRequests.applicationFormList.completeSecondaryReportFirst'
      ),
    },
  ];

  const getLockedFormStatus = (formType: COMMON_APP_FORM_TYPES) => {
    const lockedFormStatus = lockedFormStatuses.find(({ getIsLocked }) => getIsLocked(formType));

    if (!lockedFormStatus) {
      return { isLocked: false };
    }

    return { isLocked: true, tooltipMessage: lockedFormStatus.tooltipMessage };
  };

  return { getLockedFormStatus };
};
