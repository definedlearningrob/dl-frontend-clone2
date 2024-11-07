import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { UNIT } from '@dc/graphql/user/queries/unit';

import SharedDataLoader from '@shared/components/DataLoader/DataLoader';
import SharedImage from '@shared/components/Image/Image';
import SharedModal from '@shared/components/Modal/Modal';
import { cleanInjection } from '@shared/utils/cleanInjection';

AdminTracksFormUnitsModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  unitId: PropTypes.string,
};

function AdminTracksFormUnitsModal({ isOpen, onClose, unitId }) {
  const { t } = useTranslation();

  return (
    <SharedModal isOpen={isOpen} onDismiss={onClose}>
      <SharedModal.Header>
        <SharedModal.Heading>
          <span>{t('admin.units.detailsHeading')}</span>
        </SharedModal.Heading>
      </SharedModal.Header>
      <SharedDataLoader options={{ variables: { id: unitId } }} query={UNIT}>
        {({ unit }) => (
          <SharedModal.Body>
            <div className='courses__lesson__modal-image'>
              <SharedImage
                alt={t('admin.units.list.item.altImage')}
                fallbackSrc={unit.imageUrl}
                src={unit.thumbnailUrl}
              />
            </div>
            <h3 className='admin-preview-modal-heading'>{t('common.fields.common.name')}</h3>
            <p data-testid='modal-unit-name'>{unit.name}</p>
            <h3 className='admin-preview-modal-heading'>{t('common.fields.common.description')}</h3>
            {/* eslint-disable-next-line react/no-danger */}
            <span dangerouslySetInnerHTML={cleanInjection(unit.description)} />
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

export default AdminTracksFormUnitsModal;
