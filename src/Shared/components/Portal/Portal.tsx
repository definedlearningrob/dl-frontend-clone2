import { useEffect, ReactNode } from 'react';
import { createPortal } from 'react-dom';

type Props = {
  children: ReactNode;
  className?: string;
  id?: string;
};

const Portal = ({ children, className, id }: Props) => {
  const element = document.createElement('div');

  useEffect(() => {
    const mount = document.getElementById('portal');

    if (element) {
      id && element.setAttribute('id', id);
      className && element.setAttribute('class', className);
    }

    mount?.appendChild(element);

    return () => {
      mount?.removeChild(element);
    };
  }, [element]);

  return createPortal(children, element);
};

export default Portal;
