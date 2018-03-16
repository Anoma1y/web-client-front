import { SETTINGS_INITIAL_COMPANY_PROFILE } from './types';

export const initialCompanyProfile = value => ({
    type: SETTINGS_INITIAL_COMPANY_PROFILE,
    payload: value
});
