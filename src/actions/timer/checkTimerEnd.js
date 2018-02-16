import { CHECK_TIMER_END } from './types';

export const checkTimerEnd = value => ({
    type: CHECK_TIMER_END,
    payload: value
})

