import { SIGNUP_SET_ERROR } from './types'


export const setError = (e) => {
    return {
        type: SIGNUP_SET_ERROR,
        payload: e.target.value,
    }
};