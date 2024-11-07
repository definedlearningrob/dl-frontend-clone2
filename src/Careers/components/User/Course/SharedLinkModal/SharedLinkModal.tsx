import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useToggle } from 'react-use';

import { useShareResourceMutation } from '@dc/graphql/user/hooks/useShareResourceMutation';
import { TSharedResource } from '@dc/graphql/user/mutations/shareResource';

import SharedButton from '@shared/components/Button/Button';
import SharedModal from '@shared/components/Modal/Modal';
import { AllowLogins } from '@shared/components/SharedLink/AllowLogins';
import { ReactComponent as ShareIcon } from '@shared/svg/share.svg';
import { SHARED_LINK_APP_TYPE } from '@shared/resources/enums';
import { SharedLinkInput } from '@shared/components/SharedLink/SharedLinkInput';
import { Tooltip } from '@shared/components/Tooltip';
import { copyToClipboard, createSharedLink } from '@shared/components/SharedLink/helpers';

type Props = {
  closeModal: () => void;
  sharedResource: TSharedResource;
};

export const SharedLinkModal = ({ closeModal, sharedResource }: Props) => {
  const { t } = useTranslation();
  const { courseId } = useParams<{ courseId: string }>();
  const [allowLogin, toggleAllowLogin] = useToggle(Boolean(sharedResource?.allowLogin));
  const [shareResource, { loading }] = useShareResourceMutation();

  const handleCreateShareLink = async () => {
    try {
      const { data } = await shareResource({ allowLogin, courseId });
      const code = data?.shareResource.sharedResource.code;

      code && copyToClipboard(createSharedLink(code, SHARED_LINK_APP_TYPE.DC));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('SharedLinkModal => handleCreateShareLink', error);
    }
  };

  const onAllowLoginChange = async () => {
    if (sharedResource?.code) {
      await shareResource({ allowLogin: !allowLogin, courseId });
      toggleAllowLogin();
    } else {
      toggleAllowLogin();
    }
  };

  return (
    <SharedModal isOpen={true} onDismiss={closeModal}>
      <SharedModal.Header>
        <SharedModal.Heading>{t('course.header.button.shareLink')}</SharedModal.Heading>
      </SharedModal.Header>
      <SharedModal.Body>
        <Tooltip message={t('course.shareLink.modal.allowTooltip')} side='right'>
          <AllowLogins
            className='justify-end'
            disabled={loading}
            isChecked={allowLogin}
            onChange={onAllowLoginChange}
          />
        </Tooltip>
        <SharedButton
          Icon={ShareIcon}
          className='mt-sm'
          data-testid='share-link-button'
          disabled={Boolean(sharedResource?.code)}
          isLoading={loading}
          variant='primary'
          onClick={handleCreateShareLink}>
          {t('course.shareLink.modal.createShareLink')}
        </SharedButton>
        {sharedResource && (
          <SharedLinkInput
            tooltipMessage={t('course.shareLink.modal.shareTooltip')}
            value={createSharedLink(sharedResource.code, SHARED_LINK_APP_TYPE.DC)}
          />
        )}
      </SharedModal.Body>
    </SharedModal>
  );
};
