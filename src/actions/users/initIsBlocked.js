import { INIT_IS_BLOCKED } from './types';

export const initIsBlocked = value => ({
        type: INIT_IS_BLOCKED,
        payload: value
});