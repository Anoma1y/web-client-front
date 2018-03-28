import { CHANGE_SUM_VALUE } from './types';

export const changeSumValue = value => ({
    type: CHANGE_SUM_VALUE,
    payload: value
});

