import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import RequestsReducer from './RequestsReducer'
import CalculatorReducer from './CalculatorReducer'

export default combineReducers({
    routing: routerReducer,
    requests: RequestsReducer,
    calculator: CalculatorReducer
})