import { useTranslation } from 'react-i18next';

import '@dc/components/User/shared/DemoLabel/DemoLabel.sass';

function UserDemoLabel() {
  const { t } = useTranslation();

  return (
    <div className='demo-label' data-testid='demo-label'>
      <span className='demo-label__text'>{t('user.demoLabel')}</span>
    </div>
  );
}

export default UserDemoLabel;
