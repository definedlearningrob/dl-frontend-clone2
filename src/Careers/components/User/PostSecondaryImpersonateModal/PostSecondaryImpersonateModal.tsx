import { useTranslation } from 'react-i18next';
import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { SingleValue } from 'react-select';

import { CounselorOption } from '@dc/components/StudentManagement/StudentFilters/CounselorOption/CounselorOption';
import { CounselorSingleValue } from '@dc/components/StudentManagement/StudentFilters/CounselorSingleValue/CounselorSingleValue';
import { COUNSELORS } from '@dc/graphql/user/queries/counselors';
import useUserInfo from '@dc/hooks/useUserInfo';
import { TUserInfo } from '@dc/graphql/user/queries/userInfo';
import { SelectOption } from '@dc/components/StudentManagement/StudentFilters/helpers';

import SharedModal from '@shared/components/Modal/Modal';
import { callToast } from '@shared/components/Toaster/Toaster';
import { Select } from '@shared/components/Select';
const PER_PAGE = 100;

type Props = {
  onCloseModal: () => void;
};

type CounselorOption = {
  value: string;
  label: string;
};

export const PostSecondaryImpersonateModal = ({ onCloseModal }: Props) => {
  const { userInfo } = useUserInfo<TUserInfo>();
  const { t } = useTranslation();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedCounselor, setSelectedCounselor] = useState<CounselorOption>({
    value: '',
    label: '',
  });
  const { data } = useQuery(COUNSELORS, {
    variables: { perPage: PER_PAGE },
  });
  const { impersonateStart } = useUserInfo();

  if (!data) return null;

  const counselorSelectOptions =
    data.counselors.nodes
      .filter((counselor) => counselor.uuid !== userInfo.uuid)
      .map((counselor) => ({
        value: counselor.uuid,
        label: `${counselor.fullName}`,
      })) ?? [];

  const handleCounselorChange = (selectedCounselorOption: SingleValue<SelectOption<string>>) => {
    setSelectedCounselor({
      value: selectedCounselorOption?.value || '',
      label: selectedCounselorOption?.label || '',
    });
  };

  const startImpersonation = async () => {
    try {
      await impersonateStart('User' as const, selectedCounselor.value);
    } catch (e) {
      callToast('error', t('postSecondary.loginAs.error'));
    }
  };

  return (
    <SharedModal className='!pb-base xxxl:!pb-md' isOpen={true} onDismiss={onCloseModal}>
      <SharedModal.Header className='!px-base !pt-base xxxl:!px-md xxxl:!pt-md'>
        <div>
          <div className='flex flex-col items-stretch'>
            <h4 className='text-base leading-md font-bold'>
              {t('postSecondary.loginAs.modalTitle')}
            </h4>
          </div>
          <SharedModal.Heading>
            <p className='text-xs xxxl:text-sm font-regular'>
              {t('postSecondary.loginAs.modalText')}
            </p>
          </SharedModal.Heading>
        </div>
      </SharedModal.Header>
      <SharedModal.Body className='!px-base xxxl:!px-md'>
        <Select
          components={{ Option: CounselorOption, SingleValue: CounselorSingleValue }}
          isClearable={true}
          label={t('postSecondary.loginAs.searchCounselor')}
          menuPortalTarget={document.body}
          name='counselor'
          options={counselorSelectOptions}
          onChange={handleCounselorChange}
        />
      </SharedModal.Body>
      <SharedModal.Footer className='!px-base xxxl:!px-md'>
        <SharedModal.Button size='md' variant='primary-outlined' onClick={onCloseModal}>
          {t('common.actions.cancel')}
        </SharedModal.Button>
        <SharedModal.Button size='md' variant='primary' onClick={startImpersonation}>
          {t('postSecondary.loginAs.action')}
        </SharedModal.Button>
      </SharedModal.Footer>
    </SharedModal>
  );
};
