import { CHANGE_TRANSFER_DATA } from './types';

export const changeTransferData = value => ({
    type: CHANGE_TRANSFER_DATA,
    payload: value
});
