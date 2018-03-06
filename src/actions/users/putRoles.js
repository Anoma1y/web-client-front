import { PUT_ROLES_USER } from './types';

export const putRoles = value => ({
    type: PUT_ROLES_USER,
    payload: value
});
