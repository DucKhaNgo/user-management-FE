import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import auth from './auth';
import thunk from 'redux-thunk';

const reducer = combineReducers({
  auth,
});

let middleware = [thunk];

const composeEnhancers = composeWithDevTools({
  // options like actionSanitizer, stateSanitizer
});
const reduxStore = createStore(
  reducer,
  composeEnhancers(applyMiddleware(...middleware)),
);

export default reduxStore;
