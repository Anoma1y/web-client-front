import { CHANGE_APPLICATION_STATUS } from './types';

export const changeStatusApplication = value => ({
    type: CHANGE_APPLICATION_STATUS,
    payload: value
});
