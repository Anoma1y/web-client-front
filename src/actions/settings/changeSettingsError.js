import { CHANGE_SETTINGS_ERROR } from './types';

export const changeSettingsError = value => ({
    type: CHANGE_SETTINGS_ERROR,
    payload: value
});
