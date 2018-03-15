import { CHANGE_SETTINGS_MODAL } from './types';

export const changeModalSettings = value => ({
    type: CHANGE_SETTINGS_MODAL,
    payload: value
});
