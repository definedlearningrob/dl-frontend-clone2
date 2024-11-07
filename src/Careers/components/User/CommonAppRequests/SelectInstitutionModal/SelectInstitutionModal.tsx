import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { useMemo, useState } from 'react';

import { useCommonAppFormStatuses } from '@dc/hooks/useCommonAppFormStatuses';
import { CommonAppForm } from '@dc/screens/UserApp/CommonApp/CommonAppRequests/types';
import { COMMON_APP_FORM_STATUS } from '@dc/resources/enums';
import SharedSelect from '@dc/shared/Select/Select';

import { ReactComponent as InfoIcon } from '@shared/svg/info_outlined.svg';
import type { SelectOption } from '@shared/components/Select';
import Modal from '@shared/components/Modal/Modal';
import camelize from '@shared/utils/camelize';
import { IconContainer } from '@shared/components/IconContainer/IconContainer';

import { UNSUBMITABLE_FORMS } from '../ApplicantFormList/helpers';

import { InstitutionSelectOption } from './InstitutionSelectOption';
import styles from './SelectInstitutionModal.module.sass';

type Props = {
  onDismiss: () => void;
  onConfirm: (institutionId: string) => void;
  form: CommonAppForm;
};

export const SelectInstitutionModal = ({ onDismiss, onConfirm, form }: Props) => {
  const { t } = useTranslation();
  const { studentUuid } = useParams<{ studentUuid: string }>();
  const { formsByType } = useCommonAppFormStatuses({ studentUuid });
  const [selectedInstitution, setInstitution] = useState<{ label: string; value: string } | null>(
    null
  );

  const institutionForms = formsByType[form.formType];
  const isUnsubmittingDisabled = UNSUBMITABLE_FORMS.includes(form.formType);

  const institutionOptions = useMemo(
    () =>
      institutionForms.map(({ institution }) => ({
        label: institution.name,
        value: institution.id,
      })),
    [formsByType, form]
  );

  const getIsOptionDisabled = (option: SelectOption) => {
    const institutionForm = institutionForms.find((form) => form.institution.id === option.value);

    return institutionForm?.status !== COMMON_APP_FORM_STATUS.COMPLETED;
  };

  return (
    <Modal isOpen={true} onDismiss={onDismiss}>
      <Modal.Header>
        <Modal.Heading>
          {t('user.postSecondary.submitForm', {
            formType: t(`user.postSecondary.commonAppForms.${camelize(form.formType)}`),
          })}
        </Modal.Heading>
      </Modal.Header>
      <Modal.Body className='!mb-base'>
        <p className='mb-base'>{t('user.postSecondary.selectInstitutionToSubmit')}</p>
        <SharedSelect
          className={styles.institutionSelect}
          components={{ Option: InstitutionSelectOption }}
          options={institutionOptions}
          selectProps={{
            isOptionDisabled: getIsOptionDisabled,
            menuPosition: 'fixed',
          }}
          showError={false}
          value={selectedInstitution}
          onChange={setInstitution}
        />
        {isUnsubmittingDisabled && (
          <div className='flex items-center gap-sm mt-base p-sm border border-neutral-300 rounded-sm'>
            <IconContainer Icon={InfoIcon} className='text-primary-500 bg-primary-200 rounded-sm' />
            <div>
              <p className='mb-0'>
                {t('user.postSecondary.commonAppRequests.submitConfirmationInfo')}
              </p>
              <p className='mb-0 font-medium'>
                {t('user.postSecondary.commonAppRequests.submitConfirmationNote')}
              </p>
            </div>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Modal.Button variant='primary-outlined' onClick={onDismiss}>
          {t('common.actions.cancel')}
        </Modal.Button>
        <Modal.Button
          disabled={!selectedInstitution}
          variant='primary'
          onClick={() => onConfirm(selectedInstitution!.value)}>
          {t('common.actions.submit')}
        </Modal.Button>
      </Modal.Footer>
    </Modal>
  );
};
