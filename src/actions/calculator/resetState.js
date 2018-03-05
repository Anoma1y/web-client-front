import { RESET_STATE } from './types';

export const resetState = value => ({
    type: RESET_STATE,
    payload: value
});
