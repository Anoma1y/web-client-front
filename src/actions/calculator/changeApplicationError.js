import { CHANGE_APPLICATION_ERROR } from './types';

export const changeApplicationError = value => ({
    type: CHANGE_APPLICATION_ERROR,
    payload: value
});
