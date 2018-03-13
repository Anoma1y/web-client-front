import { CHANGE_BETATEST_ERROR } from './types';

export const changeBetaTestError = value => ({
    type: CHANGE_BETATEST_ERROR,
    payload: value
});
