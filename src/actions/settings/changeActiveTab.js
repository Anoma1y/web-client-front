import { SETTINGS_CHANGE_ACTIVE_TAB } from './types';

export const changeActiveTab = value => ({
    type: SETTINGS_CHANGE_ACTIVE_TAB,
    payload: value
});
