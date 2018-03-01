import { CHANGE_CURRENT_BONUS } from './types';

export const changeCurrentBonus = value => ({
    type: CHANGE_CURRENT_BONUS,
    payload: value
});
