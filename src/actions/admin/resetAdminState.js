import { RESET_ADMIN_STATE } from './types';

export const resetAdminState = value => ({
    type: RESET_ADMIN_STATE,
    payload: value
});
