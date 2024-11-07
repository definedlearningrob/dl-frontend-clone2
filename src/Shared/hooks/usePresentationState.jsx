import PropTypes from 'prop-types';
import { createContext, useContext, useReducer } from 'react';

PresentationStateProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

const PresentationStateContext = createContext();

export function PresentationStateProvider(props) {
  const presentationReducer = (state, action) => {
    switch (action.type) {
      case 'SET_TASK_ID':
        return { ...state, taskId: action.payload };
      case 'SET_LIBRARY_SLIDE_ID':
        return { ...state, librarySlideId: action.payload };
      case 'SET_SHARED_SLIDE_VISITED':
        return { ...state, sharedSlideVisited: action.payload };
      case 'SET_IS_ON_SHARED_SLIDE':
        return { ...state, isOnSharedSlide: action.payload };
      case 'SET_SHOW_PRESENTATION_SETTINGS':
        return { ...state, showPresentationSettings: action.payload };
      case 'SET_IS_PRESENTATION_SAVING':
        return { ...state, isPresentationSaving: action.payload };
      case 'SET_PRESENTATION_FULLSCREEN_MODE':
        return { ...state, fullscreenMode: action.payload };
      case 'SET_PRESENTATION_HAS_PENDING_CHANGES':
        return { ...state, presentationHasPendingChanges: action.payload };
      case 'SET_PRESENTATION_PREVIEW_MODE':
        return { ...state, presentationPreviewMode: action.payload };

      default:
        return state;
    }
  };

  const [presentationState, presentationDispatch] = useReducer(presentationReducer, {
    taskId: null,
    librarySlideId: null,
    sharedSlideVisited: false,
    isOnSharedSlide: false,
    isPresentationSaving: false,
    showPresentationSettings: false,
    fullscreenMode: false,
  });

  return (
    <PresentationStateContext.Provider
      value={{
        presentationDispatch,
        presentationState,
      }}>
      {props.children}
    </PresentationStateContext.Provider>
  );
}

export const usePresentationState = () => {
  const { presentationDispatch, presentationState } = useContext(PresentationStateContext);

  return {
    presentationDispatch,
    presentationState,
  };
};
