import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import createHistory from 'history/createBrowserHistory'
import reducers from 'reducers'

export const history = createHistory();

let middleware = [ thunk, routerMiddleware(history) ];
const enhancers = [];

if (process.env.NODE_ENV === 'development') {
    const reduxImmutableStateInvariant = require('redux-immutable-state-invariant').default();
    const logger = createLogger({ collapsed: true });
    middleware = [...middleware, reduxImmutableStateInvariant, logger];

    const devToolsExtension = window.devToolsExtension;
    if (typeof devToolsExtension === 'function') {
        enhancers.push(devToolsExtension())
    }
}

const composedEnhancers = compose(
    applyMiddleware(...middleware),
    ...enhancers
);

const store = createStore(reducers, {}, composedEnhancers);

export default store;