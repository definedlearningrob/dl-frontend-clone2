import { useEffect } from 'react';
import { useFormikContext } from 'formik';
import { isEmpty } from 'lodash-es';

export const TOP_OFFSET = 56;

function useScrollToInvalidFormElement() {
  const { submitCount, isValid, touched } = useFormikContext();

  useEffect(() => {
    if (!isValid && !isEmpty(touched)) {
      const [firstErroredElement] = document.querySelectorAll('.input-error-message');
      if (firstErroredElement) {
        const errorParentElement = firstErroredElement.parentElement;
        const input = errorParentElement!.getElementsByTagName('input')[0];

        const top = errorParentElement!.getBoundingClientRect().top + window.scrollY - TOP_OFFSET;
        window.scrollTo({
          top,
          behavior: 'smooth',
        });

        if (input) {
          input.focus({ preventScroll: true });
        }
      }
    }
  }, [submitCount, isValid]);
}

export default useScrollToInvalidFormElement;
