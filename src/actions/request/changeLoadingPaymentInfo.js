import { PAYMENT_INFO_IS_LOADING } from './types';

export const changeLoadingPaymentInfo = value => ({
    type: PAYMENT_INFO_IS_LOADING,
    payload: value
});
