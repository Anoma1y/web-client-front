import { SETTINGS_INITIAL_USER_IMAGE } from './types';

export const initialUserImage = value => ({
    type: SETTINGS_INITIAL_USER_IMAGE,
    payload: value
});
