import { useTranslation } from 'react-i18next';

import catalogQuery, {
  type TCatalogData,
  type TCatalogVariables,
} from '@dc/graphql/user/queries/catalog';

import SharedDataLoader from '@shared/components/DataLoader/DataLoader';
import SharedImage from '@shared/components/Image/Image';
import SharedModal from '@shared/components/Modal/Modal';
import { cleanInjection } from '@shared/utils/cleanInjection';

type Props = {
  catalogId: string;
  isOpen: boolean;
  onClose: () => void;
};

function AdminCatalogsListItemDetailsModal({ catalogId, isOpen, onClose }: Props) {
  const { t } = useTranslation();

  return (
    <SharedModal isOpen={isOpen} onDismiss={onClose}>
      <SharedModal.Header>
        <SharedModal.Heading>{t('admin.catalogs.detailsHeading')}</SharedModal.Heading>
      </SharedModal.Header>
      <SharedModal.Body>
        <SharedDataLoader<TCatalogData, TCatalogVariables>
          options={{ variables: { id: catalogId } }}
          query={catalogQuery}>
          {({ catalog }) => (
            <>
              <div className='courses__lesson__modal-image'>
                <SharedImage
                  alt={t('admin.catalogs.list.item.altImage')}
                  fallbackSrc={catalog.imageUrl}
                  src={catalog.thumbnailUrl}
                />
              </div>
              <h3 className='admin-preview-modal-heading'>{t('common.fields.common.name')}</h3>
              <p data-testid='modal-track-name'>{catalog.name}</p>
              <h3 className='admin-preview-modal-heading'>
                {t('common.fields.common.displayName')}
              </h3>
              <p data-testid='modal-track-name'>{catalog.displayName}</p>
              <h3 className='admin-preview-modal-heading'>
                {t('common.fields.common.description')}
              </h3>
              {/* eslint-disable-next-line react/no-danger */}
              <p dangerouslySetInnerHTML={cleanInjection(catalog.description)} />
              <h3 className='admin-preview-modal-heading'>{t('admin.catalogs.tracks.label')}</h3>
              <ul>
                {catalog.tracks.map((track) => (
                  <li key={track.id}>{track.name}</li>
                ))}
              </ul>
            </>
          )}
        </SharedDataLoader>
      </SharedModal.Body>
      <SharedModal.Footer align='right'>
        <SharedModal.Button variant='primary-outlined' onClick={onClose}>
          {t('common.actions.close')}
        </SharedModal.Button>
      </SharedModal.Footer>
    </SharedModal>
  );
}

export default AdminCatalogsListItemDetailsModal;
