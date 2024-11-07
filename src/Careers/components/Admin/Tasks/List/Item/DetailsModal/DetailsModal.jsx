import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import ExternalPresentation from '@dc/components/Student/Lesson/ExternalPresentation/ExternalPresentation';
import taskQuery from '@dc/graphql/user/queries/task';

import SharedDataLoader from '@shared/components/DataLoader/DataLoader';
import SharedImage from '@shared/components/Image/Image';
import SharedModal from '@shared/components/Modal/Modal';
import { cleanInjection } from '@shared/utils/cleanInjection';

AdminTasksListItemDetailsModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  taskId: PropTypes.string,
};

function AdminTasksListItemDetailsModal({ isOpen, onClose, taskId }) {
  const { t } = useTranslation();

  const renderTaskPresentation = ({ __typename, id, presentationUrl }) => {
    const presentationDetails = {
      __typename,
      id,
      source: presentationUrl,
    };

    if (!presentationUrl) return null;

    return (
      <>
        <h3 className='admin-preview-modal-heading'>{t('admin.tasks.presentation.label')}</h3>
        <ExternalPresentation hideTitle={true} presentation={presentationDetails} />
      </>
    );
  };

  const renderCheckins = ({ checkInQuestions, checkInGroups }) => {
    const sortedCheckins = [...checkInGroups, ...checkInQuestions]
      .sort((a, b) => parseInt(a.step) - parseInt(b.step))
      .map((checkin) => ({ ...checkin, name: checkin.name || checkin.question }));

    return (
      <>
        <h3 className='admin-preview-modal-heading'>{t('admin.tasks.checkins')}</h3>
        <ul>
          {sortedCheckins.map((checkIn) => (
            <li key={checkIn.id + checkIn.__typename}>
              <p>{checkIn.name}</p>
            </li>
          ))}
        </ul>
      </>
    );
  };

  return (
    <SharedModal isOpen={isOpen} onDismiss={onClose}>
      <SharedModal.Header>
        <SharedModal.Heading>{t('admin.tasks.detailsHeading')}</SharedModal.Heading>
      </SharedModal.Header>
      <SharedDataLoader options={{ variables: { id: taskId } }} query={taskQuery}>
        {({ task }) => (
          <SharedModal.Body>
            <div className='courses__lesson__modal-image'>
              <SharedImage
                alt={t('admin.tracks.list.item.altImage')}
                fallbackSrc={task.imageUrl}
                src={task.thumbnailUrl}
              />
            </div>
            <h3 className='admin-preview-modal-heading'>{t('common.fields.common.name')}</h3>
            <p data-testid='modal-task-name'>{task.name}</p>
            <h3 className='admin-preview-modal-heading'>{t('common.fields.common.displayName')}</h3>
            <p data-testid='modal-task-name'>{task.displayName}</p>
            <h3 className='admin-preview-modal-heading'>{t('common.fields.common.description')}</h3>
            {/* eslint-disable-next-line react/no-danger */}
            <p dangerouslySetInnerHTML={cleanInjection(task.description)} />
            {task.introduction && (
              <>
                <h3 className='admin-preview-modal-heading'>
                  {t('admin.tasks.introduction.label')}
                </h3>
                {/* eslint-disable-next-line react/no-danger */}
                <p dangerouslySetInnerHTML={cleanInjection(task.introduction)} />
              </>
            )}
            {renderTaskPresentation(task)}
            {task.studentResources && (
              <>
                <h3 className='admin-preview-modal-heading'>
                  {t('admin.tasks.studentResources.label')}
                </h3>
                {/* eslint-disable-next-line react/no-danger */}
                <p dangerouslySetInnerHTML={cleanInjection(task.studentResources)} />
              </>
            )}
            {task.teachingResources && (
              <>
                <h3 className='admin-preview-modal-heading'>
                  {t('admin.tasks.teachingResources.label')}
                </h3>
                {/* eslint-disable-next-line react/no-danger */}
                <p dangerouslySetInnerHTML={cleanInjection(task.teachingResources)} />
              </>
            )}
            {task.files.length ? (
              <>
                <h3 className='admin-preview-modal-heading'>{t('admin.tasks.files.label')}</h3>
                <div>
                  <h4>{t('common.fields.common.displayName')}</h4>
                  <p>{task.files[0].displayName}</p>
                </div>
                <h4>{t('common.fields.common.description')}</h4>
                {/* eslint-disable-next-line react/no-danger */}
                <p dangerouslySetInnerHTML={cleanInjection(task.files[0].description)} />
                <ul data-testid='task-modal-files'>
                  {task.files.map((file) => (
                    <li key={file.id} data-testid='task-file'>
                      <a href={file.url} rel='noopener noreferrer' target='_blank'>
                        {file.filename}
                      </a>
                    </li>
                  ))}
                </ul>
              </>
            ) : null}
            {renderCheckins(task)}
            {task.products.length ? (
              <>
                <h3 className='admin-preview-modal-heading'>{t('admin.tasks.products.label')}</h3>
                <ul>
                  {task.products.map((product) => (
                    <li key={product.id}>
                      <p>{product.name}</p>
                    </li>
                  ))}
                </ul>
              </>
            ) : null}
          </SharedModal.Body>
        )}
      </SharedDataLoader>
      <SharedModal.Footer>
        <SharedModal.Button variant='primary' onClick={onClose}>
          {t('common.actions.close')}
        </SharedModal.Button>
      </SharedModal.Footer>
    </SharedModal>
  );
}

export default AdminTasksListItemDetailsModal;
