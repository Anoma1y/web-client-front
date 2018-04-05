import {
    initialPayInfo,
    changeLoadingPaymentInfo
} from './';
import PayLib from 'libs/ApiLib/PayLib';

export const handlePaymentInfo = APPLICATION_ID => {
    return dispatch => {
        dispatch(changeLoadingPaymentInfo(true));
        PayLib.getPaymentData(APPLICATION_ID).then(data => {
            dispatch(initialPayInfo({
                address: data.data.address,
                expected_balance: data.data.expected_balance
            }));
            dispatch(changeLoadingPaymentInfo(false));
        }).catch(() => {
            dispatch(changeLoadingPaymentInfo(false));
        });
    }
};
