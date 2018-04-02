import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { RESET_STATE } from 'actions/users/types';
import { RESET_ADMIN_STATE } from 'actions/admin/types';
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
            return appReducer(state = undefined, action);
        case RESET_ADMIN_STATE:
            return appReducer({ ...state, admin: undefined }, action);
        default:
            return appReducer(state, action);
    }
};

export default reducer;