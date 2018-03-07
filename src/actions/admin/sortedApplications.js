import { SORTED_APPLICATIONS } from './types';

export const sortedApplications = value => ({
    type: SORTED_APPLICATIONS,
    payload: value
});
