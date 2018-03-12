import { SET_ADMIN_TRANSFER_DATA } from './types';

export const changeAdminTransferData = value => ({
    type: SET_ADMIN_TRANSFER_DATA,
    payload: value
});
