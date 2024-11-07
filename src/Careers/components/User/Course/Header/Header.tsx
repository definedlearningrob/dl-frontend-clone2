import { useParams, useHistory } from 'react-router-dom';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import AssignModal from '@dc/components/User/Course/AssignModal/AssignModal';
import SharedRoleGuard from '@dc/shared/RoleGuard/RoleGuard';
import { Roles } from '@dc/resources/enums';
import { SharedLinkModal } from '@dc/components/User/Course/SharedLinkModal';
import { TSharedResource } from '@dc/graphql/user/mutations/shareResource';

import SharedButton from '@shared/components/Button/Button';
import { cleanInjection } from '@shared/utils/cleanInjection';

type Props = {
  description: string;
  name: string;
  pathway: {
    name: string;
  };
  sharedResource: TSharedResource;
  teacherView: boolean;
};

export enum ACTION_TYPE {
  ASSIGN = 'ASSIGN',
  NULL = 'NULL',
  SHARE_LINK = 'SHARE_LINK',
  UNASSIGN = 'UNASSIGN',
}

const UserCourseHeader = ({ description, name, pathway, sharedResource, teacherView }: Props) => {
  const history = useHistory();
  const { t } = useTranslation();
  const { courseId } = useParams<{ courseId: string }>();
  const [modalActionType, setModalActionType] = useState<ACTION_TYPE>(ACTION_TYPE.NULL);

  const closeModal = () => setModalActionType(ACTION_TYPE.NULL);

  const handleOpenModal = (actionType: ACTION_TYPE) => () => setModalActionType(actionType);

  const goToGrading = () => history.push(`/courses/${courseId}/grading-schoolclasses`);

  return (
    <section className='course-header'>
      {pathway && (
        <div className='course-header__categories-bar'>
          <div className='course-header__badges-wrapper'>
            <div className='course-header__category-badge'>
              <span>{pathway.name}</span>
            </div>
          </div>
        </div>
      )}
      <h3 className='course-header__heading'>{name}</h3>
      <p
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={cleanInjection(description)}
        className='course-header__description'
      />
      {teacherView && (
        <div className='my-base flex gap-base'>
          <SharedButton className='w-[180px]' variant='secondary' onClick={goToGrading}>
            {t('course.header.button.grading')}
          </SharedButton>
          <SharedButton
            className='w-[180px]'
            variant='primary'
            onClick={handleOpenModal(ACTION_TYPE.ASSIGN)}>
            {t('course.header.button.assign')}
          </SharedButton>
          <SharedButton
            className='w-[180px]'
            variant='primary-outlined'
            onClick={handleOpenModal(ACTION_TYPE.UNASSIGN)}>
            {t('course.header.button.unassign')}
          </SharedButton>
          <SharedRoleGuard allowedFor={[Roles.TEACHER, Roles.ENTITY_ADMIN]}>
            <SharedButton
              className='w-[180px] whitespace-nowrap'
              data-testid='create-share-link'
              variant='primary-outlined'
              onClick={handleOpenModal(ACTION_TYPE.SHARE_LINK)}>
              {t('course.header.button.shareLink')}
            </SharedButton>
          </SharedRoleGuard>
        </div>
      )}
      {[ACTION_TYPE.ASSIGN, ACTION_TYPE.UNASSIGN].includes(modalActionType) && (
        <AssignModal actionType={modalActionType} closeModal={closeModal} />
      )}
      {[ACTION_TYPE.SHARE_LINK].includes(modalActionType) && (
        <SharedLinkModal closeModal={closeModal} sharedResource={sharedResource} />
      )}
    </section>
  );
};

export default UserCourseHeader;
