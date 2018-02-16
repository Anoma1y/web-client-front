import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import RequestsReducer from './RequestsReducer';
import CalculatorReducer from './CalculatorReducer';
import RoadmapReducer from "./RoadmapReducer";
import TimerReducer from './TimerReducer';
import SocialNetworkReducer from './SocialNetworkReducer';
import SettingsReducer from './SettingsReducer'
import RequestsReducer from './RequestsReducer'

export default combineReducers({
    routing: routerReducer,
    requests: RequestsReducer,
    roadmap: RoadmapReducer,
    calculator: CalculatorReducer,
    timer: TimerReducer,
    socialNetwork: SocialNetworkReducer
    settings: SettingsReducer,
})