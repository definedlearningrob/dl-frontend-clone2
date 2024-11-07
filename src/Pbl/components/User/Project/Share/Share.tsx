import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useHistory, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import SHARE_RESOURCE, {
  type TShareResourceMutationData,
  type TShareResourceMutationVariables,
} from '@pbl/graphql/user/mutations/shareResource';
import SharedRoleGuard from '@pbl/shared/RoleGuard/RoleGuard';
import useClassroomApi from '@pbl/hooks/useClassroomApi';
import { Roles, TASK_STATUS } from '@pbl/resources/enums';
import { SHARED_RESOURCE_TYPES } from '@pbl/resources/constants';

import Card from '@shared/components/Card/Card';
import DeprecatedTooltip from '@shared/components/DeprecatedTooltip/DeprecatedTooltip';
import SharedButton from '@shared/components/Button/Button';
import { AllowLogins } from '@shared/components/SharedLink/AllowLogins';
import { ReactComponent as AddIcon } from '@shared/svg/add.svg';
import { ReactComponent as ShareIcon } from '@shared/svg/share.svg';
import { SHARED_LINK_APP_TYPE } from '@shared/resources/enums';
import { SharedLinkInput } from '@shared/components/SharedLink/SharedLinkInput';
import { copyToClipboard, createSharedLink } from '@shared/components/SharedLink/helpers';

import UserProjectClassroom from './Classroom/Classroom';

type Props = {
  sharedResource?: TShareResourceMutationData['shareResource']['sharedResource'];
  status: TASK_STATUS;
};

function UserProjectShare({ sharedResource, status }: Props) {
  const [allowLogin, setAllowLogin] = useState(Boolean(sharedResource?.allowLogin));
  const [isGenerateButtonVisible] = useState(!sharedResource);
  const { projectId } = useParams<{ lessonId: string; projectId: string }>();
  const { isClassroomReady } = useClassroomApi(sharedResource);
  const { t } = useTranslation();
  const history = useHistory();

  const [generateTaskResourceLink, { loading }] = useMutation<
    TShareResourceMutationData,
    TShareResourceMutationVariables
  >(SHARE_RESOURCE);

  const generateResourceLink = async (allowLoginState: boolean) => {
    try {
      const { data } = await generateTaskResourceLink({
        variables: {
          input: {
            resourceId: projectId,
            resourceType: SHARED_RESOURCE_TYPES.TASK,
            allowLogin: allowLoginState,
          },
        },
        refetchQueries: 'active',
        awaitRefetchQueries: true,
      });

      return data ? data!.shareResource.sharedResource.code : undefined;
    } catch (e) {
      //eslint-disable-next-line no-console
      console.error(e);
    }
  };

  const getTaskResourceLink = async () => {
    if (!sharedResource) {
      const code = await generateResourceLink(allowLogin);
      code && copyToClipboard(createSharedLink(code, SHARED_LINK_APP_TYPE.PBL));
    } else {
      const link = createSharedLink(sharedResource.code, SHARED_LINK_APP_TYPE.PBL);
      copyToClipboard(link);
    }
  };

  const redirectToAssigning = () => {
    history.push(`/projects/${projectId}/assign`);
  };

  const onAllowLoginChange = async () => {
    // if code is already generated we must sent the mutation to change the allowLogin
    // if code is not generated we have to handle the state locally
    if (sharedResource?.code) {
      await generateResourceLink(!allowLogin);
      setAllowLogin(!allowLogin);
    } else {
      setAllowLogin(!allowLogin);
    }
  };

  const isAssignButtonDisabled = status === TASK_STATUS.DRAFT;

  return (
    <Card dataTestId='user-project-share'>
      <Card.Header className='flex-wrap items-center gap-xs'>
        <Card.Title size='small'>{t('user.project.share.header')}</Card.Title>
        <DeprecatedTooltip message={t('user.project.share.allowTooltip')} variant='dark'>
          <AllowLogins disabled={loading} isChecked={allowLogin} onChange={onAllowLoginChange} />
        </DeprecatedTooltip>
      </Card.Header>
      <Card.Body>
        <SharedRoleGuard allowedFor={[Roles.TEACHER, Roles.ENTITY_ADMIN]}>
          <DeprecatedTooltip
            message={t('user.project.share.assignNotAllowedTooltip')}
            variant='dark'>
            <SharedButton
              Icon={AddIcon}
              className='w-full'
              disabled={isAssignButtonDisabled}
              size='lg'
              variant='primary'
              onClick={redirectToAssigning}>
              {t('user.project.share.assign')}
            </SharedButton>
          </DeprecatedTooltip>
        </SharedRoleGuard>
        {isGenerateButtonVisible && (
          <DeprecatedTooltip message={t('user.project.share.shareTooltip')} variant='dark'>
            <SharedButton
              Icon={ShareIcon}
              className='w-full mt-sm'
              disabled={Boolean(sharedResource?.code)}
              isLoading={loading}
              size='lg'
              variant='primary'
              onClick={getTaskResourceLink}>
              {t('user.project.share.createLink')}
            </SharedButton>
          </DeprecatedTooltip>
        )}
        {sharedResource && (
          <SharedLinkInput
            tooltipMessage={t('user.project.shareTooltip')}
            value={createSharedLink(sharedResource.code, SHARED_LINK_APP_TYPE.PBL)}
          />
        )}
        {isClassroomReady && <UserProjectClassroom />}
      </Card.Body>
    </Card>
  );
}

export default UserProjectShare;
