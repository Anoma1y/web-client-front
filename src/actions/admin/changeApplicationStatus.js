import { CHANGE_APPLICATION_STATUS } from './types';

export const changeApplicationStatus = value => ({
    type: CHANGE_APPLICATION_STATUS,
    payload: value
});
