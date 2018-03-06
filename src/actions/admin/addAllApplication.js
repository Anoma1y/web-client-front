import { ADD_APPLICATION } from './types';

export const addAllApplication = value => ({
    type: ADD_APPLICATION,
    payload: value
});
