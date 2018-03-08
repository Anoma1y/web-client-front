import { SET_ERROR } from './types'

export const setError = value => ({
    type: SET_ERROR,
    payload: value,
});