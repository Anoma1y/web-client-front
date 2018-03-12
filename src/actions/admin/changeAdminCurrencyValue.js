import { SET_ADMIN_CURRENCY_VALUE } from './types';

export const changeAdminCurrencyValue = value => ({
    type: SET_ADMIN_CURRENCY_VALUE,
    payload: value
});
