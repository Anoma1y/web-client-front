import { INIT_EMAIL } from './types';

export const initEmail = value => ({
    type: INIT_EMAIL,
    payload: value
});
