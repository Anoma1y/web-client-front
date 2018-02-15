import * as C from './types';

export const changeCurrentCurrency = value => ({
    type: C.CHANGE_CURRENT_CURRENCY,
    payload: value
})
