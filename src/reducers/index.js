import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import RequestsReducer from './RequestsReducer';
import CalculatorReducer from './CalculatorReducer';
import RoadmapReducer from "./RoadmapReducer";
import TimerReducer from './TimerReducer';
import SocialNetworkReducer from './SocialNetworkReducer';
import SettingsReducer from './SettingsReducer';
import LoginReducer from './LoginReducer';
import SignupReducer from './SignupReducer';
import ResetReducer from './ResetReducer';
import UserReducer from './UserReducer';
import BetaTestReducer from './BetaTestReducer';
import AdminReducer from './AdminReducer';

export default combineReducers({
    routing: routerReducer,
    requests: RequestsReducer,
    roadmap: RoadmapReducer,
    calculator: CalculatorReducer,
    timer: TimerReducer,
    betatest: BetaTestReducer,
    socialNetwork: SocialNetworkReducer,
    settings: SettingsReducer,
    login: LoginReducer,
    signup: SignupReducer,
    reset: ResetReducer,
    user: UserReducer,
    admin: AdminReducer
})