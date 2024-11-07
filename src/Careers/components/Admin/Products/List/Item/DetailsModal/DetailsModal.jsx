import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { PRODUCT_QUERY } from '@dc/graphql/user/queries/product';

import SharedDataLoader from '@shared/components/DataLoader/DataLoader';
import SharedModal from '@shared/components/Modal/Modal';
import { cleanInjection } from '@shared/utils/cleanInjection';

AdminProductsListItemDetailsModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  productId: PropTypes.string,
};

function AdminProductsListItemDetailsModal({ isOpen, onClose, productId }) {
  const { t } = useTranslation();

  return (
    <SharedModal isOpen={isOpen} onDismiss={onClose}>
      <SharedModal.Header>
        <SharedModal.Heading>
          <span>{t('admin.products.detailsHeading')}</span>
        </SharedModal.Heading>
      </SharedModal.Header>
      <SharedDataLoader options={{ variables: { id: productId } }} query={PRODUCT_QUERY}>
        {({ product }) => (
          <SharedModal.Body>
            <h3 className='admin-preview-modal-heading'>{t('common.fields.product.rubricsUrl')}</h3>
            <p>
              <a href={product.rubricsUrl}>{product.rubricsUrl}</a>
            </p>
            <h3 className='admin-preview-modal-heading'>{t('common.fields.common.name')}</h3>
            <p>{product.name}</p>
            <h3 className='admin-preview-modal-heading'>{t('common.fields.common.displayName')}</h3>
            <p>{product.displayName}</p>
            {product.description && (
              <>
                <h3 className='admin-preview-modal-heading'>
                  {t('common.fields.common.description')}
                </h3>
                {/* eslint-disable-next-line react/no-danger */}
                <span dangerouslySetInnerHTML={cleanInjection(product.description)} />
              </>
            )}
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

export default AdminProductsListItemDetailsModal;
