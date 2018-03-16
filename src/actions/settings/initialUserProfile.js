import { SETTINGS_INITIAL_USER_PROFILE } from './types';

export const initialUserProfile = value => ({
    type: SETTINGS_INITIAL_USER_PROFILE,
    payload: value
});
