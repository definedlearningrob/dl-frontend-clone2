import '@pbl/components/SignIn/LoginDivider/LoginDivider.sass';

function SharedLoginDivider() {
  return (
    <div className='login-divider' data-testid='login-divider'>
      <div className='login-divider__line' />
      <span className='login-divider__text'>or</span>
      <div className='login-divider__line' />
    </div>
  );
}

export default SharedLoginDivider;
