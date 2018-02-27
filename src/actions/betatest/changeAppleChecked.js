import { CHECKED_APPLE } from './types';

export const changeAppleChecked = value => ({
    type: CHECKED_APPLE,
    payload: value
});
