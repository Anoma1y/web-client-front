import { CHANGE_RATE_CURRENCY } from './types';

export const changeCurrency = value => ({
    type: CHANGE_RATE_CURRENCY,
    payload: value
});
