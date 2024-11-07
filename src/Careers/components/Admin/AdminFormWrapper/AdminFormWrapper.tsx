import { Form } from 'formik';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  title?: string;
  'data-testid'?: string;
  skipForm?: boolean;
};

export const AdminFormWrapper = ({ children, title, 'data-testid': dataTestId }: Props) => (
  <Form className='flex flex-col gap-base' data-testid={dataTestId}>
    {title && <h3 className='capitalize mb-0'>{title}</h3>}
    {children}
  </Form>
);
