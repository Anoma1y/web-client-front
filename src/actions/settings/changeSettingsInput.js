import { CHANGE_SETTINGS_INPUT } from './types';

export const changeSettingsInput = value => ({
    type: CHANGE_SETTINGS_INPUT,
    payload: value
});