import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { RESET_STATE } from 'actions/users/types';
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
import CurrencyReducer from './CurrencyReducer';


const appReducer = combineReducers({
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
    rate: CurrencyReducer,
    admin: AdminReducer
});

const reducer = (state, action) => {
    switch(action.type) {
        case RESET_STATE:
            state = undefined;
            break;
        default:
            return appReducer(state, action);
    }
};

export default reducer;