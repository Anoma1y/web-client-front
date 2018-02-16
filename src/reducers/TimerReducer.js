import {
    CHANGE_TIMER_LEFT,
    CHANGE_TIMER_END
} from 'actions/timer/types';

const INITIAL_STATE = {
    dateEnd: "feb,16,2018,15:50:40",
    timeLeft: {
        day: 0,
        hour: 0,
        minutes: 0,
        seconds: 0
    },
    timeEnd: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CHANGE_TIMER_LEFT:
            const { payload:timeLeft } = action;
            return {
                ...state,
                timeLeft
            };
        case CHANGE_TIMER_END:
            const { payload: timeEnd } = action;
            return {
                ...state,
                timeEnd
            }
        default:
            return state;
    }
};