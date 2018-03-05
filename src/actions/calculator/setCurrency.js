import { SET_CURRENCY } from './types';

export const setCurrency = value => ({
    type: SET_CURRENCY,
    payload: value
});
