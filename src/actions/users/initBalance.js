import { INIT_BALANCE } from './types';

export const initBalance = value => ({
    type: INIT_BALANCE,
    payload: value
});
