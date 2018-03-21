import * as T from 'actions/timer/types';

const INITIAL_STATE = {
    dateEnd: "apr,03,2018,08:00:00 GMT+0400",
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
        case T.CHANGE_TIMER_LEFT:
            const { payload:timeLeft } = action;
            return {
                ...state,
                timeLeft
            };
        case T.CHANGE_TIMER_END:
            const { payload: timeEnd } = action;
            return {
                ...state,
                timeEnd
            }
        default:
            return state;
    }
};