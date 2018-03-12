import { CHANGE_DELETE_APPLICATIONS } from './types';

export const changeDeleteApplications = value => ({
    type: CHANGE_DELETE_APPLICATIONS,
    payload: value
});
