import { ReactNode, useEffect } from 'react';

import Card from '@shared/components/Card/Card';
import { useNavigation } from '@shared/components/Sidebar/useNavigation';

type Props = {
  children: ReactNode;
  formTitle: string;
};

export const FormWrapper = ({ formTitle, children }: Props) => {
  const { setBackNavButton } = useNavigation();

  useEffect(() => {
    setBackNavButton(true);

    return () => setBackNavButton(false);
  }, []);

  return (
    <div className='flex justify-center'>
      <Card className='w-full xl:w-1/2'>
        <h1 className='font-bold mb-md text-base xxxl:text-lg'>{formTitle}</h1>
        {children}
      </Card>
    </div>
  );
};
