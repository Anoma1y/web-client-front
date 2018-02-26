import { ADD_REQUEST_ITEM } from './types';

export const addRequestItem = value => ({
    type: ADD_REQUEST_ITEM,
    payload: value
});
