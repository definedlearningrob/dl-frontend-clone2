import { combineReducers } from 'redux';

import session from '@dc/redux/session/reducer';

const rootReducer = combineReducers({
  session,
});

export type TRootState = ReturnType<typeof rootReducer>;

export default rootReducer;
