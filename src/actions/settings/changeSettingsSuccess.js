import { CHANGE_SETTINGS_SUCCESS } from './types';

export const changeSettingsSuccess = value => ({
    type: CHANGE_SETTINGS_SUCCESS,
    payload: value
});
