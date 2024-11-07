import { isEmpty } from 'lodash-es';

type Props = {
  errorMessage?: string;
};

export const ErrorMessage = ({ errorMessage }: Props) =>
  isEmpty(errorMessage) ? null : (
    <div className='input-error-message text-xxs text-danger-600'>{errorMessage}</div>
  );
