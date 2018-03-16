import { SETTINGS_INITIAL_COMPANY_FILE } from './types';

export const initialCompanyFile = value => ({
    type: SETTINGS_INITIAL_COMPANY_FILE,
    payload: value
});
