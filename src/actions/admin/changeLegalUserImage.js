import { CHANGE_LEGAL_USER_IMAGE } from './types';

export const changeLegalUserImage = value => ({
    type: CHANGE_LEGAL_USER_IMAGE,
    payload: value
});
