import { SET_ADMIN_CURRENCY } from './types';

export const setAdminCurrency = value => ({
    type: SET_ADMIN_CURRENCY,
    payload: value
});
