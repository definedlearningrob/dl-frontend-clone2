import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import Presentation from '@dc/components/Student/Lesson/ExternalPresentation/ExternalPresentation';
import taskQuery from '@dc/graphql/user/queries/task';

import SharedDataLoader from '@shared/components/DataLoader/DataLoader';
import SharedImage from '@shared/components/Image/Image';
import SharedModal from '@shared/components/Modal/Modal';
import { cleanInjection } from '@shared/utils/cleanInjection';

AdminUnitsFormTasksModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  taskId: PropTypes.string,
};

function AdminUnitsFormTasksModal({ isOpen, onClose, taskId }) {
  const { t } = useTranslation();

  const renderTaskPresentation = (task) => {
    const presentationDetails = {
      __typename: task.__typename,
      id: task.id,
      source: task.presentationUrl,
    };

    if (!task.presentationUrl) return null;

    return (
      <>
        <h3 className='admin-preview-modal-heading'>{t('admin.tasks.presentation.label')}</h3>
        <Presentation hideTitle={true} presentation={presentationDetails} />
      </>
    );
  };

  return (
    <SharedModal isOpen={isOpen} onDismiss={onClose}>
      <SharedModal.Header>
        <SharedModal.Heading>
          <span>{t('admin.tasks.detailsHeading')}</span>
        </SharedModal.Heading>
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

export default AdminUnitsFormTasksModal;
