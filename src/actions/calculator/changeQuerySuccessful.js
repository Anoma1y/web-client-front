import { CHANGE_QUERY_SUCCESSFUL } from './types';

export const changeQuerySuccessful = value => ({
    type: CHANGE_QUERY_SUCCESSFUL,
    payload: value
});
