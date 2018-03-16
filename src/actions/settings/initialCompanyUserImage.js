import { SETTINGS_INITIAL_COMPANY_USER_IMAGE } from './types';

export const initialCompanyUserImage = value => ({
    type: SETTINGS_INITIAL_COMPANY_USER_IMAGE,
    payload: value
});
