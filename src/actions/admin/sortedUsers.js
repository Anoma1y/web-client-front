import { SORTED_USERS } from './types';

export const sortedUsers = value => ({
    type: SORTED_USERS,
    payload: value
});
