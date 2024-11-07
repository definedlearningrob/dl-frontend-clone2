import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import rootReducer from '@pbl/redux/reducers';

export default createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
