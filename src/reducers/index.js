import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import RequestsReducer from './RequestsReducer'

export default combineReducers({
    routing: routerReducer,
    requests: RequestsReducer,
})