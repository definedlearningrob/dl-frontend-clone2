import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import SharedModal from '@shared/components/Modal/Modal';
import { cleanInjection } from '@shared/utils/cleanInjection';

export const AdminEntityCatalogsModal = ({ catalog, onClose }) => {
  const { t } = useTranslation();

  if (!catalog) {
    return null;
  }

  return (
    <div>
      <SharedModal isOpen={true} onDismiss={onClose}>
        <SharedModal.Header>
          <SharedModal.Heading>{t('admin.catalogs.moreInfoTitle')}</SharedModal.Heading>
        </SharedModal.Header>
        <SharedModal.Body>
          <h3 className='admin-preview-modal-heading'>{t('common.fields.common.name')}</h3>
          <p data-testid='catalog-name'>{catalog.name}</p>
          <h3 className='admin-preview-modal-heading'>{t('common.fields.common.description')}</h3>
          <p
            //eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={cleanInjection(catalog.description)}
            data-testid='catalog-description'
          />
          <h3 className='admin-preview-modal-heading'>{t('admin.catalogs.tracks.label')}</h3>
          {catalog.tracks.map(({ id, name, units }) => (
            <div key={id} className='admin-entity__plans-modal__group'>
              <p className='mb-0 text-xs text-neutral-700'>{name}</p>
              <h4>{t('admin.tracks.units.label')}</h4>
              <ul data-testid='catalog-track'>
                {units.map(({ id, name }) => (
                  <li
                    key={id}
                    className='admin-entity__plans-modal__statement'
                    data-testid='track-unit'>
                    {name}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </SharedModal.Body>
        <SharedModal.Footer>
          <SharedModal.Button variant='primary' onClick={onClose}>
            {t('common.actions.close')}
          </SharedModal.Button>
        </SharedModal.Footer>
      </SharedModal>
    </div>
  );
};

AdminEntityCatalogsModal.propTypes = {
  catalog: PropTypes.shape({
    description: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string,
    tracks: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        units: PropTypes.arrayOf(
          PropTypes.shape({
            id: PropTypes.string,
            name: PropTypes.string,
          })
        ),
      })
    ),
  }),
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};
