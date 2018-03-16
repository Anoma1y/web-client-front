import { SETTINGS_INITIAL_COMPANY_IMAGE } from './types';

export const initialCompanyImage = value => ({
    type: SETTINGS_INITIAL_COMPANY_IMAGE,
    payload: value
});
