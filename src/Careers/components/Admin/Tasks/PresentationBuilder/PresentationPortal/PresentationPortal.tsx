import { ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';

type Props = {
  children: ReactNode;
  className?: string;
  id?: string;
};

const PresentationPortal = ({ children, className, id }: Props) => {
  const element = document.createElement('div');

  useEffect(() => {
    const mount = document.getElementById('presentation-custom-container');

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

export default PresentationPortal;
