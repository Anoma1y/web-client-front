import { INITIAL_PAY_INFO } from './types';

export const initialPayInfo = value => ({
    type: INITIAL_PAY_INFO,
    payload: value
});
