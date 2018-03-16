import { SETTINGS_INITIAL_USER_FILE } from './types';

export const initialUserFile = value => ({
    type: SETTINGS_INITIAL_USER_FILE,
    payload: value
});
