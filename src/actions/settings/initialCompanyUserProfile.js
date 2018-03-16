import { SETTINGS_INITIAL_COMPANY_USER_PROFILE } from './types';

export const initialCompanyUserProfile = value => ({
    type: SETTINGS_INITIAL_COMPANY_USER_PROFILE,
    payload: value
});
