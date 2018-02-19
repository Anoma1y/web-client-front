import { GET_CURRENCY } from './types';

export const getCurrency = value => ({
    type: GET_CURRENCY,
    payload: value
});
