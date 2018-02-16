import {
    CHANGE_TIMER_LEFT,
    CHANGE_TIMER_END
} from 'actions/timer/types';

const INITIAL_STATE = {
    dateEnd: "dec,31,2018,23:59:59",
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