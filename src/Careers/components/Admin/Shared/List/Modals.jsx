import PropTypes from 'prop-types';
import { Trans, useTranslation } from 'react-i18next';

import AffectedResources from '@dc/components/Admin/Shared/AffectedResources/AffectedResources';
import { getByStringKey } from '@dc/utils';

import SharedModal from '@shared/components/Modal/Modal';

export const ListModals = ({
  affectedResources,
  archiveItem,
  closeModal,
  data,
  duplicateItem,
  itemsKey,
  recordToArchive,
  recordToDuplicate,
  recordToRestore,
  restoreItem,
}) => {
  const { t } = useTranslation();

  return (
    <>
      {recordToArchive && (
        <SharedModal isOpen={true} onDismiss={closeModal}>
          <SharedModal.Header>
            <SharedModal.Heading>
              {t('admin.shared.list.archiveModalTitle', {
                type: t(
                  `admin.shared.list.resources.${recordToArchive.__typename.toLowerCase()}`
                ).toLowerCase(),
              })}
            </SharedModal.Heading>
          </SharedModal.Header>
          <SharedModal.Body className='flex flex-col min-h-[104px]'>
            <p>
              <Trans
                components={{ mediumText: <span className='font-medium' /> }}
                i18nKey='common.actions.archiveConfirmation'
                values={{
                  type: t(
                    `admin.shared.list.resources.${recordToArchive.__typename.toLowerCase()}`
                  ),
                  name: recordToArchive.name,
                }}
              />
            </p>
            {affectedResources &&
              affectedResources.map((resource) => (
                <AffectedResources
                  key={resource.resourcesField}
                  id={recordToArchive?.id}
                  isArchving={true}
                  query={resource.query}
                  resourcesField={resource.resourcesField}
                />
              ))}
          </SharedModal.Body>
          <SharedModal.Footer>
            <div className='image-input__footer-buttons'>
              <SharedModal.Button
                className='image-input__preview-button -reject'
                data-testid='archive-modal-cancel'
                onClick={closeModal}>
                {t('common.actions.cancel')}
              </SharedModal.Button>
              <SharedModal.Button
                className='image-input__preview-button'
                data-testid='archive-modal-accept'
                variant='danger'
                onClick={archiveItem(getByStringKey(data, itemsKey).nodes.length)}>
                {t('common.actions.archive')}
              </SharedModal.Button>
            </div>
          </SharedModal.Footer>
        </SharedModal>
      )}
      {recordToRestore && (
        <SharedModal isOpen={true} onDismiss={closeModal}>
          <SharedModal.Header>
            <SharedModal.Heading>
              {t('admin.shared.list.unarchiveModalTitle', {
                type: t(
                  `admin.shared.list.resources.${recordToRestore.__typename.toLowerCase()}`
                ).toLowerCase(),
              })}
            </SharedModal.Heading>
          </SharedModal.Header>
          <SharedModal.Body className='flex flex-col min-h-[104px]'>
            <p>
              <Trans
                components={{ mediumText: <span className='font-medium' /> }}
                i18nKey='common.actions.restoreConfirmation'
                values={{
                  type: t(
                    `admin.shared.list.resources.${recordToRestore.__typename.toLowerCase()}`
                  ),
                  name: recordToRestore.name,
                }}
              />
            </p>
            {affectedResources &&
              affectedResources.map((resource) => (
                <AffectedResources
                  key={resource.resourcesField}
                  id={recordToRestore?.id}
                  isArchving={false}
                  query={resource.query}
                  resourcesField={resource.resourcesField}
                />
              ))}
          </SharedModal.Body>
          <SharedModal.Footer>
            <div className='image-input__footer-buttons'>
              <SharedModal.Button
                className='image-input__preview-button -reject'
                data-testid='archive-modal-cancel'
                onClick={closeModal}>
                {t('common.actions.cancel')}
              </SharedModal.Button>
              <SharedModal.Button
                className='image-input__preview-button'
                data-testid='archive-modal-accept'
                variant='primary'
                onClick={restoreItem(getByStringKey(data, itemsKey).nodes.length)}>
                {t('common.actions.unarchive')}
              </SharedModal.Button>
            </div>
          </SharedModal.Footer>
        </SharedModal>
      )}
      {recordToDuplicate && (
        <SharedModal isOpen={true} onDismiss={closeModal}>
          <SharedModal.Header>
            <SharedModal.Heading>
              {t('admin.shared.list.duplicateModalTitle', {
                type: t(
                  `admin.shared.list.resources.${recordToDuplicate.__typename.toLowerCase()}`
                ).toLowerCase(),
              })}
            </SharedModal.Heading>
          </SharedModal.Header>
          <SharedModal.Body className='flex flex-col'>
            <p>
              <Trans
                components={{ mediumText: <span className='font-medium' /> }}
                i18nKey='common.actions.duplicateConfirmation'
                values={{
                  type: t(
                    `admin.shared.list.resources.${recordToDuplicate.__typename.toLowerCase()}`
                  ),
                  name: recordToDuplicate.name,
                }}
              />
            </p>
          </SharedModal.Body>
          <SharedModal.Footer>
            <div className='image-input__footer-buttons'>
              <SharedModal.Button
                className='image-input__preview-button -reject'
                data-testid='duplicate-modal-cancel'
                onClick={closeModal}>
                {t('common.actions.cancel')}
              </SharedModal.Button>
              <SharedModal.Button
                className='image-input__preview-button'
                data-testid='duplicate-modal-accept'
                variant='primary'
                onClick={duplicateItem(getByStringKey(data, itemsKey).nodes.length)}>
                {t('common.actions.duplicate')}
              </SharedModal.Button>
            </div>
          </SharedModal.Footer>
        </SharedModal>
      )}
    </>
  );
};

ListModals.propTypes = {
  affectedResources: PropTypes.func,
  archiveItem: PropTypes.func,
  closeModal: PropTypes.func,
  data: PropTypes.object,
  duplicateItem: PropTypes.func,
  itemsKey: PropTypes.string,
  pagingProps: PropTypes.object,
  recordToArchive: PropTypes.object,
  recordToDuplicate: PropTypes.object,
  recordToRestore: PropTypes.object,
  restoreItem: PropTypes.func,
};
