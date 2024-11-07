import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import usePresentationBuilder from '@dc/hooks/usePresentationBuilder';

import { TextInput } from '@shared/components/TextInput/TextInput';
import { usePresentationState } from '@shared/hooks/usePresentationState';

const SlideNameInput = () => {
  const { t } = useTranslation();
  const inputRef = useRef(null);
  const { currentSlide, handleUpdateSlide } = usePresentationBuilder();
  const { presentationDispatch, presentationState } = usePresentationState();
  const { presentationHasPendingChanges } = presentationState;
  const [slideName, setSlideName] = useState('');

  const setCurrentSlideName = () => setSlideName(currentSlide.name);

  useEffect(() => {
    currentSlide && currentSlide.name && setCurrentSlideName();
  }, [currentSlide?.name]);

  useEffect(() => {
    document.addEventListener('click', handleClickOutsideSlideNameInput, true);

    return () => {
      document.removeEventListener('click', handleClickOutsideSlideNameInput, true);
    };
  }, [currentSlide]);

  const handleClickOutsideSlideNameInput = (event) => {
    const newSlideName = inputRef.current.value;
    const updateSlideName =
      presentationHasPendingChanges &&
      currentSlide.name !== slideName &&
      inputRef.current &&
      !inputRef.current.contains(event.target);

    if (updateSlideName) {
      handleUpdateSlide(null, { name: newSlideName });
    }
  };

  const handleSlideNameChange = (event) => {
    presentationDispatch({ type: 'SET_PRESENTATION_HAS_PENDING_CHANGES', payload: true });
    setSlideName(event.target.value);
  };

  return (
    <TextInput
      forwardRef={inputRef}
      label={t('admin.tasks.presentation.slideName')}
      value={slideName}
      onChange={(event) => handleSlideNameChange(event)}
    />
  );
};

export default SlideNameInput;
