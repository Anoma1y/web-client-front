import { IS_LOADING_PAYMENT_INFO } from './types';

export const isLoadingPaymentInfo = value => ({
    type: IS_LOADING_PAYMENT_INFO,
    payload: value
});
