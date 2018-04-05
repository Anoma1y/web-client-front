import {
    initialPayInfo,
    changeLoadingPaymentInfo,
    changePaymentModal
} from './';
import PayLib from 'libs/ApiLib/PayLib';

export const handlePaymentInfo = APPLICATION_ID => {
    return dispatch => {
        dispatch(changeLoadingPaymentInfo(true));
        dispatch(changePaymentModal(true));
        PayLib.getPaymentData(APPLICATION_ID).then(data => {
            dispatch(initialPayInfo(data));
            dispatch(changeLoadingPaymentInfo(false));
        }).catch(err => {
            dispatch(changeLoadingPaymentInfo(false));
            dispatch(changePaymentModal(false));
        });
    }
};
