import { INIT_KYC_TYPE } from './types';

export const initKycType = value => ({
    type: INIT_KYC_TYPE,
    payload: value
});
