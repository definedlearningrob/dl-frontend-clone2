import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { shapePlanGroup } from '@dc/resources/typeDefs';

import SharedModal from '@shared/components/Modal/Modal';
import { cleanInjection } from '@shared/utils/cleanInjection';

AdminEntityPlansModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  plan: PropTypes.shape({
    description: PropTypes.string,
    groups: PropTypes.arrayOf(shapePlanGroup),
    id: PropTypes.string,
    name: PropTypes.string,
  }),
};

function AdminEntityPlansModal({ plan, onClose }) {
  const { t } = useTranslation();

  return (
    <div>
      <SharedModal isOpen={true} onDismiss={onClose}>
        <SharedModal.Header>
          <SharedModal.Heading>{t('admin.plans.moreInfoTitle')}</SharedModal.Heading>
        </SharedModal.Header>
        <SharedModal.Body>
          <h3 className='admin-preview-modal-heading'>{t('common.fields.common.name')}</h3>
          <p data-testid='plan-name'>{plan.name}</p>
          <h3 className='admin-preview-modal-heading'>{t('common.fields.common.description')}</h3>
          <p
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={cleanInjection(plan.description)}
            data-testid='plan-description'
          />
          <h3 className='admin-preview-modal-heading'>{t('admin.plans.groups.label')}</h3>
          <ul>
            {plan.groups.map(({ id, name, statements }) => (
              <li key={id} className='admin-entity__plans-modal__group' data-testid='plan-group'>
                <p>{name}</p>
                <ul>
                  <h4>{t('admin.plans.statements')}</h4>
                  {statements.map(({ id, name }) => (
                    <li
                      key={id}
                      className='admin-entity__plans-modal__statement'
                      data-testid='group-statement'>
                      {name}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
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

export default AdminEntityPlansModal;
