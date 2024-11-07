import { isEmpty } from 'lodash-es';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';
import { ApolloError } from '@apollo/client';
import { useToggle } from 'react-use';

import { APPLICATION_FORM_TYPE, COMMON_APP_FORM_STATUS } from '@dc/resources/enums';
import { CommonAppForm } from '@dc/screens/UserApp/CommonApp/CommonAppRequests/types';
import { useCommonAppFormStatuses } from '@dc/hooks/useCommonAppFormStatuses';
import { useUnsubmitCommonAppFormResponses } from '@dc/graphql/user/hooks/useUnsubmitCommonAppFormResponses';
import { RECOMMENDATION_REQUEST_QUERY } from '@dc/graphql/user/queries/recommendationRequest';
import { STUDENT_APPLICATIONS_QUERY } from '@dc/graphql/user/queries/studentApplications';
import { useSubmitQuestions } from '@dc/screens/UserApp/TestForms/useSubmitQuestions';
import { SubmitConfirmationModal } from '@dc/components/User/CommonAppRequests/SubmitConfirmationModal/SubmitConfirmationModal';
import { SelectInstitutionModal } from '@dc/components/User/CommonAppRequests//SelectInstitutionModal/SelectInstitutionModal';

import { ReactComponent as DownloadIcon } from '@shared/svg/download_to.svg';
import { ReactComponent as EditIcon } from '@shared/svg/edit.svg';
import { ReactComponent as InfoIcon } from '@shared/svg/info_outlined.svg';
import { ReactComponent as SendIcon } from '@shared/svg/send_outlined.svg';
import { ReactComponent as UnsubmitIcon } from '@shared/svg/close.svg';
import { callPromiseToast, callToast } from '@shared/components/Toaster/Toaster';
import { Tooltip } from '@shared/components/Tooltip';
import SharedIcon from '@shared/components/Icon/Icon';
import { DropdownContextMenu } from '@shared/components/DropdownContextMenu';

import { MEMBER_SPECIFIC_FORMS, UNSUBMITABLE_FORMS } from './helpers';

type Props = {
  isFormLocked: boolean;
  form: CommonAppForm;
  navigateToForm: (form: CommonAppForm) => void;
};

export const ApplicantFormContextMenu = ({ isFormLocked, form, navigateToForm }: Props) => {
  const { t } = useTranslation();
  const { studentUuid } = useParams<{ studentUuid: string }>();
  const { getFormsByStatus } = useCommonAppFormStatuses({ studentUuid });
  const [submitQuestions] = useSubmitQuestions();
  const [unsubmitCommonAppFormResponses] = useUnsubmitCommonAppFormResponses();
  const [isConfirmationModalOpen, toggleConfirmationModal] = useToggle(false);
  const [isInstitutionModalOpen, toggleInstitutionModal] = useToggle(false);

  const completedForms = getFormsByStatus(form.formType, COMMON_APP_FORM_STATUS.COMPLETED);
  const submittedForms = getFormsByStatus(form.formType, COMMON_APP_FORM_STATUS.SUBMITTED);

  const handleUnsubmitForm = async () => {
    const isMemberSpecificForm = MEMBER_SPECIFIC_FORMS.includes(form.formType);
    const institutionId = isMemberSpecificForm ? submittedForms[0].institution.id : undefined;

    unsubmitForm(institutionId);
  };

  const unsubmitForm = async (institutionId?: string) => {
    const input = {
      type: form.formType,
      studentUuid,
      institutionId,
    };

    const unsubmitPromise = unsubmitCommonAppFormResponses({
      variables: { input },
      refetchQueries: [
        { query: RECOMMENDATION_REQUEST_QUERY, variables: { studentUuid } },
        { query: STUDENT_APPLICATIONS_QUERY, variables: { studentUuid } },
      ],
      awaitRefetchQueries: true,
    });

    callPromiseToast(unsubmitPromise, {
      pendingText: t('user.postSecondary.commonAppForms.unsubmittingForm'),
      errorText: t('user.postSecondary.commonAppForms.unsubmitFailure'),
      successText: t('user.postSecondary.commonAppForms.unsubmitSuccess'),
    });
    await unsubmitPromise;
  };

  const handleDownloadPreview = () => window.open(form.previewUrl, '_blank');

  const handleSubmitForm = () => {
    if (MEMBER_SPECIFIC_FORMS.includes(form.formType)) {
      toggleInstitutionModal(true);
    } else if (UNSUBMITABLE_FORMS.includes(form.formType)) {
      toggleConfirmationModal(true);
    } else {
      submitForm();
    }
  };

  const submitForm = async (institutionId?: string) => {
    const { formType } = form;

    try {
      const submitPromise = submitQuestions({
        variables: {
          input: {
            type: formType,
            studentUuid,
            institutionId,
          },
        },
        refetchQueries: [{ query: STUDENT_APPLICATIONS_QUERY, variables: { studentUuid } }],
        update(cache) {
          cache.modify({
            id: cache.identify({
              applicant: { uuid: studentUuid },
              __typename: 'RecommendationRequest',
            }),
            fields: {
              forms(cached) {
                return cached.map((form: CommonAppForm) => {
                  if (form.formType === formType) {
                    return { ...form, status: COMMON_APP_FORM_STATUS.SUBMITTED };
                  }

                  return form;
                });
              },
            },
          });
        },
      });

      callPromiseToast(submitPromise, {
        pendingText: t('user.postSecondary.commonAppForms.submittingForm'),
        errorText: t('user.postSecondary.commonAppForms.submitFailure'),
        successText: t('user.postSecondary.commonAppForms.submitSuccess'),
      });
      toggleConfirmationModal(false);
      toggleInstitutionModal(false);
      await submitPromise;
    } catch (error: ApolloError | unknown) {
      if (error instanceof ApolloError) {
        callToast('error', error.message);
      } else {
        callToast('error', t('common.error.unknown'));
      }
    }
  };

  const dropdownItems = useMemo(() => {
    const isUnsubmittableForm = UNSUBMITABLE_FORMS.includes(form.formType);
    const isSubmitted = form.status === COMMON_APP_FORM_STATUS.SUBMITTED;
    const hasCompletedForms = !isEmpty(completedForms);
    const hasSubmittedForms = !isEmpty(submittedForms);

    return [
      {
        Icon: UnsubmitIcon,
        action: handleUnsubmitForm,
        hidden: isUnsubmittableForm || isFormLocked || !hasSubmittedForms,
        text: t('user.postSecondary.commonAppRequests.applicationFormList.unsubmit'),
      },
      {
        Icon: EditIcon,
        action: () => navigateToForm(form),
        hidden: isFormLocked || isSubmitted,
        text: t('common.actions.edit'),
      },
      {
        Icon: SendIcon,
        action: handleSubmitForm,
        hidden: isFormLocked || !hasCompletedForms,
        text: t('common.actions.submit'),
      },
      {
        Icon: DownloadIcon,
        action: handleDownloadPreview,
        hidden: isFormLocked || isEmpty(form.previewUrl) || !isSubmitted,
        text: t('user.postSecondary.commonAppRequests.applicationFormList.downloadPreview'),
      },
    ].filter((item) => !item.hidden);
  }, [isFormLocked, form, getFormsByStatus]);

  const formIsDownloadedByInstitution = form.status === COMMON_APP_FORM_STATUS.DOWNLOADED;

  if (formIsDownloadedByInstitution)
    return (
      <Tooltip
        message={t(
          'user.postSecondary.commonAppRequests.applicationFormList.tooltipDownloadedMessage'
        )}>
        <SharedIcon
          className='p-xxs rounded-xs bg-info-100'
          icon={<InfoIcon className='fill-info-500' />}
          size='sm'
        />
      </Tooltip>
    );

  return (
    <>
      <DropdownContextMenu
        dataTestId={APPLICATION_FORM_TYPE[form.formType]}
        items={dropdownItems}
        triggerClassName='group-hover/row:!visible group-hover/row:!bg-white'
      />
      {isConfirmationModalOpen && (
        <SubmitConfirmationModal onConfirm={submitForm} onDismiss={toggleConfirmationModal} />
      )}
      {isInstitutionModalOpen && (
        <SelectInstitutionModal
          form={form}
          onConfirm={submitForm}
          onDismiss={toggleInstitutionModal}
        />
      )}
    </>
  );
};
