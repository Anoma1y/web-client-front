import * as C from 'actions/timer/types';

const INITIAL_STATE = {
    dateEnd: "feb,16,2017,20:00:00",
    timeLeft: {
        day: 0,
        hour: 0,
        minutes: 0,
        seconds: 0,
    },
    timeEnd: false
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case C.CHANGE_TIMER_LEFT:
            const { payload:timeLeft } = action;
            return {...state, timeLeft};
        default:
            return state;
    }
}