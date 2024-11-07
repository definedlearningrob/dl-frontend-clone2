import cx from 'classnames';
import { useTranslation } from 'react-i18next';

import SharedSwitch from '@shared/components/Switch/Switch';

type Props = {
  className?: string;
  disabled: boolean;
  isChecked?: boolean;
  onChange: () => void;
};

export const AllowLogins = ({ className, disabled, isChecked, onChange }: Props) => {
  const { t } = useTranslation();

  return (
    <div className={cx('flex items-center', className)}>
      <span>{t('sharedLink.allowStudentLogins')}</span>
      <SharedSwitch
        className='ml-xs'
        data-testid='allow-logins'
        disabled={disabled}
        value={Boolean(isChecked)}
        onChange={onChange}
      />
    </div>
  );
};
