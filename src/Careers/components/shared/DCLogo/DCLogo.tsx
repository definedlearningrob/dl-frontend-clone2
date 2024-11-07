import cx from 'classnames';

import { ReactComponent as LogoType } from '@dc/svg/logotype.svg';

import styles from '@pbl/components/DLLogo/DLLogo.module.sass';

import SharedIcon from '@shared/components/Icon/Icon';

type Props = {
  className?: string;
};

export const DCLogo = ({ className }: Props) => {
  const logoClasses = cx(styles.logo, className);

  return <SharedIcon className={logoClasses} icon={<LogoType />} />;
};
