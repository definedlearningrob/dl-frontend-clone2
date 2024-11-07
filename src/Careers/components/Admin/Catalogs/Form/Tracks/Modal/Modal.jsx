import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import trackQuery from '@dc/graphql/user/queries/track';

import SharedDataLoader from '@shared/components/DataLoader/DataLoader';
import SharedImage from '@shared/components/Image/Image';
import SharedModal from '@shared/components/Modal/Modal';
import { cleanInjection } from '@shared/utils/cleanInjection';

AdminCatalogsFormTracksModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  trackId: PropTypes.string,
};

function AdminCatalogsFormTracksModal({ isOpen, onClose, trackId }) {
  const { t } = useTranslation();

  return (
    <div data-testid='track-modal'>
      <SharedModal isOpen={isOpen} onDismiss={onClose}>
        <SharedModal.Header>
          <SharedModal.Heading>{t('admin.catalogs.tracks.moreInfoTitle')}</SharedModal.Heading>
        </SharedModal.Header>
        <SharedModal.Body>
          <SharedDataLoader options={{ variables: { id: trackId } }} query={trackQuery}>
            {({ track }) => {
              const sortedGrades = [...track?.grades].sort((first, second) =>
                first.localeCompare(second, undefined, { numeric: true })
              );

              return (
                <>
                  <div className='courses__lesson__modal-image'>
                    <SharedImage
                      alt={t('admin.tracks.list.item.altImage')}
                      fallbackSrc={track.imageUrl}
                      src={track.thumbnailUrl}
                    />
                  </div>
                  <h3 className='admin-preview-modal-heading'>{t('common.fields.common.name')}</h3>
                  <p data-testid='modal-track-name'>{track.name}</p>
                  <h3 className='admin-preview-modal-heading'>
                    {t('common.fields.common.description')}
                  </h3>
                  {/* eslint-disable-next-line react/no-danger */}
                  <p dangerouslySetInnerHTML={cleanInjection(track.description)} />
                  <h3 className='admin-preview-modal-heading'>
                    {t('common.fields.common.shortDescription')}
                  </h3>
                  {/* eslint-disable-next-line react/no-danger */}
                  <p dangerouslySetInnerHTML={cleanInjection(track.shortDescription)} />
                  <h3 className='admin-preview-modal-heading'>{t('admin.tracks.grades')}</h3>
                  <span data-testid='modal-track-grade'>{sortedGrades.join(', ')}</span>
                  <h3 className='admin-preview-modal-heading'>{t('admin.tracks.units.label')}</h3>
                  <ul>
                    {track.units.map((unit) => (
                      <li key={unit.id}>{unit.name}</li>
                    ))}
                  </ul>
                </>
              );
            }}
          </SharedDataLoader>
        </SharedModal.Body>
        <SharedModal.Footer>
          <SharedModal.Button variant='primary' onClick={onClose}>
            {t('common.actions.close')}
          </SharedModal.Button>
        </SharedModal.Footer>
      </SharedModal>
    </div>
  );
}

export default AdminCatalogsFormTracksModal;
