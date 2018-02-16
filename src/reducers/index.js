import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import RequestsReducer from './RequestsReducer'
import SettingsReducer from './SettingsReducer'

export default combineReducers({
    routing: routerReducer,
    requests: RequestsReducer,
    settings: SettingsReducer,
})