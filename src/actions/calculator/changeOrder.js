import { CHANGE_ORDER } from './types';

export const changeOrder = value => ({
    type: CHANGE_ORDER,
    payload: value
});
