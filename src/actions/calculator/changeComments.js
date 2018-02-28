import { CHANGE_COMMENTS } from './types';

export const changeComments = value => ({
    type: CHANGE_COMMENTS,
    payload: value
});
