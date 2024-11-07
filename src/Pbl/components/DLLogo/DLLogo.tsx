import cx from 'classnames';

import { ReactComponent as LogoType } from '@pbl/svg/Learning_logotype.svg';

import SharedIcon from '@shared/components/Icon/Icon';

import styles from './DLLogo.module.sass';

type Props = {
  className?: string;
};

export const DLLogo = ({ className }: Props) => {
  const logoClasses = cx(styles.logo, className);

  return <SharedIcon className={logoClasses} icon={<LogoType />} />;
};
