import { PAYMENT_MODAL_IS_OPEN } from './types';

export const changePaymentModal = value => ({
    type: PAYMENT_MODAL_IS_OPEN,
    payload: value
});
