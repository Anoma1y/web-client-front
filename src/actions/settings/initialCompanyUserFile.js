import { SETTINGS_INITIAL_COMPANY_USER_FILE } from './types';

export const initialCompanyUserFile = value => ({
    type: SETTINGS_INITIAL_COMPANY_USER_FILE,
    payload: value
});
