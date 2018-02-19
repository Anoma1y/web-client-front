import { INITIALIZING_TKN } from './types';

export const initializingTKN = value => ({
    type: INITIALIZING_TKN,
    payload: value
});
