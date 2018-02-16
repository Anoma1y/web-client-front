import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import RequestsReducer from './RequestsReducer'
import CalculatorReducer from './CalculatorReducer'
import RoadmapReducer from "./RoadmapReducer";
import TimerReducer from './TimerReducer'

export default combineReducers({
    routing: routerReducer,
    requests: RequestsReducer,
    calculator: CalculatorReducer,
    roadmap: RoadmapReducer,
    timer: TimerReducer
})