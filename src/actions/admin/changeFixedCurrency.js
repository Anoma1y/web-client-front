import { CHANGE_FIXED_CURRENCY } from './types';

export const changeFixedCurrency = value => ({
    type: CHANGE_FIXED_CURRENCY,
    payload: value
});
