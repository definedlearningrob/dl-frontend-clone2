import { useTranslation } from 'react-i18next';

import { ReactComponent as InfoIcon } from '@shared/svg/info_outlined.svg';
import Modal from '@shared/components/Modal/Modal';
import { IconContainer } from '@shared/components/IconContainer/IconContainer';

type Props = {
  onDismiss: () => void;
  onConfirm: () => void;
};

export const SubmitConfirmationModal = ({ onDismiss, onConfirm }: Props) => {
  const { t } = useTranslation();

  return (
    <Modal isOpen={true} onDismiss={onDismiss}>
      <Modal.Body>
        <div className='flex gap-sm items-start pt-base xxxl:pt-md'>
          <IconContainer
            Icon={InfoIcon}
            className='bg-info-100 text-info-500 rounded-full'
            paddingSize='x'
          />
          <div>
            <h4 className='mb-base text-base'>
              {t('user.postSecondary.commonAppRequests.submitConfirmation')}
            </h4>
            <p className='mb-0 font-regular'>
              {t('user.postSecondary.commonAppRequests.submitConfirmationInfo')}
            </p>
            <p className='font-medium mb-0'>
              {t('user.postSecondary.commonAppRequests.submitConfirmationNote')}
            </p>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Modal.Button variant='primary-outlined' onClick={onDismiss}>
          {t('common.actions.cancel')}
        </Modal.Button>
        <Modal.Button variant='primary' onClick={onConfirm}>
          {t('common.actions.continue')}
        </Modal.Button>
      </Modal.Footer>
    </Modal>
  );
};
