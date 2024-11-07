import { combineReducers } from 'redux';

import session from '@pbl/redux/session/reducer';

const rootReducer = combineReducers({
  session,
});

export type TRootState = ReturnType<typeof rootReducer>;

export default rootReducer;
