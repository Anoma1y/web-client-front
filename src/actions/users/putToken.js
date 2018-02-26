import { PUT_TOKEN_USER } from './types';

export const putToken = value => ({
    type: PUT_TOKEN_USER,
    payload: value
});
