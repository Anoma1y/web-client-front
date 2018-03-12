import { SET_ADMIN_CURRENTCURRENCY } from './types';

export const changeAdminCurrentCurrency = value => ({
    type: SET_ADMIN_CURRENTCURRENCY,
    payload: value
});