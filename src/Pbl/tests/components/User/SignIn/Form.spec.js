import { Formik } from 'formik';

import UserSignInForm from '@pbl/components/User/SignIn/Form/Form';
import { renderWithRouterAndReduxProvider } from '@pbl/utils/test';

const initialState = { session: { loginError: 'error' } };
const props = {
  errors: {
    login: 'This field is required.',
    password: 'This field is required.',
  },
  touched: {
    login: true,
    password: true,
  },
};

const renderUserSignInForm = () => {
  const utils = renderWithRouterAndReduxProvider(
    <Formik>
      <UserSignInForm {...props} />
    </Formik>,
    { initialState }
  );
  const wrapper = utils.getByTestId(/user-signin-form/i);

  return { ...utils, wrapper };
};

describe('UserSignInForm', () => {
  it('renders correctly', () => {
    const { wrapper } = renderUserSignInForm();

    expect(wrapper).toBeInTheDocument();
  });
});
