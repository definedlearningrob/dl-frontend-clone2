import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import cx from 'classnames';

import Icon from '@shared/components/Icon/Icon';
import { ReactComponent as ArrowBackward } from '@shared/svg/arrow_backward.svg';

SharedBackwardButton.propTypes = {
  link: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  text: PropTypes.string,
};

type Props = {
  link: string;
  onClick?: () => void;
  text?: string;
  className?: string;
  iconSize?: 'xxs' | 'xs' | 'sm' | 'md' | 'lg';
};

function SharedBackwardButton({ link, onClick, text, className, iconSize = 'sm' }: Props) {
  const { t } = useTranslation();

  const linkClassname = cx('button -text-icon flex items-center gap-xs', className);

  return (
    <Link className={linkClassname} data-testid='backward-button' to={link} onClick={onClick}>
      <Icon icon={<ArrowBackward />} size={iconSize} />
      <span className='button -text-icon__text'>{text || t('navigation.back')}</span>
    </Link>
  );
}

export default SharedBackwardButton;
