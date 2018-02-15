import { CHANGE_CURRENT_CURRENCY } from './types';

export const changeCurrentCurrency = value => ({
    type: CHANGE_CURRENT_CURRENCY,
    payload: value
})
