import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import { ApolloError } from '@apollo/client';

import useUserInfo from '@dc/hooks/useUserInfo';
import { SelectCounselorForm } from '@dc/components/Student/ApplicationsManagement/SelectCounselorForm/SelectCounselorForm';
import { TStudentInfo } from '@dc/graphql/student/queries/userInfo';
import { useAvailableCounselorsQuery } from '@dc/graphql/student/hooks/useAvailableCounselorsQuery';
import { useSelectCounselor } from '@dc/graphql/student/hooks/useSelectCounselor';

import SharedModal from '@shared/components/Modal/Modal';
import { callToast } from '@shared/components/Toaster/Toaster';

type Props = {
  closeModal: () => void;
  isOpen: boolean;
};

type FormValues = {
  counselor: {
    label?: string;
    value?: string;
  } | null;
};

export const SelectCounselorModal = ({ closeModal, isOpen }: Props) => {
  const { t } = useTranslation();
  const { userInfo, refreshUser } = useUserInfo<TStudentInfo>();
  const { currentCounselor, hasCounselorInvited } = userInfo.commonAppData;
  const { data } = useAvailableCounselorsQuery({ skip: !isOpen });
  const [selectCounselor] = useSelectCounselor();

  if (!data) return null;

  const counselorsOptions = data.availableCounselors
    .map((counselor) => ({
      label: counselor.fullName,
      value: counselor.uuid,
    }))
    .sort((option) => {
      if (option.value === currentCounselor?.uuid) return -1;

      return 1;
    });

  const handleSubmit = async ({ counselor }: FormValues) => {
    const counselorId = counselor?.value;

    if (!counselorId) return;

    try {
      await selectCounselor({ userUuid: counselorId });
      refreshUser();
      callToast(
        'success',
        t('common.notifications.success.generic'),
        t('student.postSecondary.applicationsSection.modal.successMessage', {
          fullName: counselor.label,
        })
      );
    } catch (error) {
      callToast('error', t('common.error', { error: (error as ApolloError).message }));
    }

    closeModal();
  };

  const initialValues: FormValues = {
    counselor: currentCounselor
      ? {
          label: `${currentCounselor.firstName} ${currentCounselor.lastName}`,
          value: currentCounselor.uuid,
        }
      : null,
  };

  return (
    <SharedModal isOpen={isOpen} onDismiss={closeModal}>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <SelectCounselorForm
          allowCounselorSelection={userInfo.isImpersonated}
          closeModal={closeModal}
          counselorsOptions={counselorsOptions}
          hasCounselorInvited={hasCounselorInvited}
        />
      </Formik>
    </SharedModal>
  );
};
