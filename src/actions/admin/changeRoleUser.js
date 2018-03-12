import { CHANGE_USER_ROLE } from './types';

export const changeRoleUser = value => ({
    type: CHANGE_USER_ROLE,
    payload: value
});
