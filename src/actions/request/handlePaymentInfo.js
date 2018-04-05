import {
    initialPayInfo,
    changeLoadingPaymentInfo
} from './';
import PayLib from 'libs/ApiLib/PayLib';

export const handlePaymentInfo = APPLICATION_ID => {
    return dispatch => {
        dispatch(changeLoadingPaymentInfo(true));
        PayLib.getPaymentData(APPLICATION_ID).then(data => {
            setTimeout(() => {
                dispatch(initialPayInfo(data));
                dispatch(changeLoadingPaymentInfo(false));
            }, 1500)
        }).catch(err => {
            dispatch(changeLoadingPaymentInfo(false));
        });
    }
};
