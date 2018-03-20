import { INIT_ID } from './types';

export const initID = value => ({
    type: INIT_ID,
    payload: value
});
