import { useTranslation } from 'react-i18next';

import { UNIT } from '@dc/graphql/user/queries/unit';
import { ServiceItemList } from '@dc/components/Admin/Units/List/Item/DetailsModal/ServiceItemList';

import SharedDataLoader from '@shared/components/DataLoader/DataLoader';
import SharedImage from '@shared/components/Image/Image';
import SharedModal from '@shared/components/Modal/Modal';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  unitId: string;
};

function AdminUnitsListItemDetailsModal({ isOpen, onClose, unitId }: Props) {
  const { t } = useTranslation();

  return (
    <SharedModal isOpen={isOpen} onDismiss={onClose}>
      <SharedModal.Header>
        <SharedModal.Heading>
          <span>{t('admin.units.detailsHeading')}</span>
        </SharedModal.Heading>
      </SharedModal.Header>
      <SharedModal.Body>
        <SharedDataLoader options={{ variables: { id: unitId } }} query={UNIT}>
          {({ unit }) => (
            <>
              <div className='courses__lesson__modal-image'>
                <SharedImage
                  alt={t('admin.units.list.item.altImage')}
                  fallbackSrc={unit.imageUrl}
                  src={unit.thumbnailUrl}
                />
              </div>
              <h3 className='admin-preview-modal-heading'>{t('common.fields.common.name')}</h3>
              <p data-testid='modal-unit-name'>{unit.name}</p>
              <h3 className='admin-preview-modal-heading'>
                {t('common.fields.common.displayName')}
              </h3>
              <p data-testid='modal-unit-name'>{unit.displayName}</p>
              <ServiceItemList unit={unit} />
            </>
          )}
        </SharedDataLoader>
      </SharedModal.Body>
      <SharedModal.Footer>
        <SharedModal.Button variant='primary' onClick={onClose}>
          {t('common.actions.close')}
        </SharedModal.Button>
      </SharedModal.Footer>
    </SharedModal>
  );
}

export default AdminUnitsListItemDetailsModal;
