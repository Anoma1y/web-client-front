import { SET_ERROR } from './types'


export const setError = value => {
    return {
        type: SET_ERROR,
        payload: value
    }
};