import cx from 'classnames';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '@pbl/components/SignIn/Support/Support.sass';

SignInSupport.propTypes = {
  className: PropTypes.string,
  externalLink: PropTypes.bool,
  linkText: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  plainText: PropTypes.string.isRequired,
};

function SignInSupport({ className, externalLink, linkText, path, plainText }) {
  const classes = cx('signin-support', className);

  return (
    <div className={classes} data-testid='support'>
      <span>{plainText}</span>
      {externalLink ? (
        <a className='signin-support__link' href={path} rel='noreferrer' target='_blank'>
          {linkText}
        </a>
      ) : (
        <Link className='signin-support__link' to={path}>
          {linkText}
        </Link>
      )}
    </div>
  );
}

export default SignInSupport;
