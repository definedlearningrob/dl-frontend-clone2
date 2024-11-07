import { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';

export const ToastContext = createContext();

export const ToastContextProvider = ({ children }) => {
  const initialState = [];

  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'ADD_NOTIFICATION':
        return [
          ...state.filter((notification) => notification.id !== action.payload.id),
          action.payload,
        ];

      case 'DELETE_NOTIFICATION':
        return state.filter((notification) => notification.id !== action.payload);

      case 'DELETE_ALL_NOTIFICATIONS':
        return initialState;

      default:
        return state;
    }
  }, initialState);

  return <ToastContext.Provider value={{ state, dispatch }}>{children}</ToastContext.Provider>;
};

ToastContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
