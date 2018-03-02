import { CHANGE_MODAL_OPEN } from './types';

export const changeModalOpen = value => ({
    type: CHANGE_MODAL_OPEN,
    payload: value
});
